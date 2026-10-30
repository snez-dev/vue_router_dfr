#!/usr/bin/env node

/**
 * Скрипт для полного копирования Pinia из node_modules в local_data
 * 
 * Использование:
 *   node scripts/copy-pinia.js
 * 
 * Этот скрипт:
 * 1. Создаёт backup оригинальной pinia
 * 2. Копирует pinia из node_modules/pinia в local_data/pinia
 * 3. Копирует зависимости (nostics, @vue/devtools-api)
 * 4. Обновляет package.json для использования локальной pinia
 * 5. Переустанавливает зависимости
 */

import { cpSync, existsSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('📦 Копирование Pinia в local_data...\n');

// Создаём директорию local_data если её нет
const localDataDir = join(rootDir, 'local_data');
if (!existsSync(localDataDir)) {
  mkdirSync(localDataDir, { recursive: true });
}

// Создаём backup оригинальной pinia
const piniaSrc = join(rootDir, 'node_modules', 'pinia');
const piniaBackup = join(rootDir, 'local_data', '.pinia-backup');

if (existsSync(piniaSrc) && !existsSync(piniaBackup)) {
  console.log('💾 Создание backup оригинальной pinia...');
  cpSync(piniaSrc, piniaBackup, { recursive: true });
  console.log('✅ Backup создан в local_data/.pinia-backup/\n');
}

// Удаляем старую локальную pinia если есть
const piniaDest = join(localDataDir, 'pinia');
if (existsSync(piniaDest)) {
  console.log('🗑️  Удаление старой локальной pinia...');
  rmSync(piniaDest, { recursive: true, force: true });
}

// Копируем pinia из backup или node_modules
const sourceDir = existsSync(piniaBackup) ? piniaBackup : piniaSrc;

if (existsSync(sourceDir)) {
  console.log('📋 Копирование pinia...');
  cpSync(sourceDir, piniaDest, { recursive: true });
  console.log('✅ pinia скопирована в local_data/pinia/\n');
} else {
  console.error('❌ pinia не найдена. Сначала выполните: npm install pinia');
  process.exit(1);
}

// Копируем зависимости pinia
const deps = ['nostics', '@vue/devtools-api'];
for (const dep of deps) {
  const depSrc = join(rootDir, 'node_modules', dep);
  const depDest = join(localDataDir, dep);
  
  if (existsSync(depSrc)) {
    console.log(`📋 Копирование ${dep}...`);
    if (existsSync(depDest)) {
      rmSync(depDest, { recursive: true, force: true });
    }
    cpSync(depSrc, depDest, { recursive: true });
    console.log(`✅ ${dep} скопирован в local_data/${dep}/\n`);
  } else {
    console.log(`⚠️  ${dep} не найден, пропускаем\n`);
  }
}

// Обновляем package.json проекта
const packageJsonPath = join(rootDir, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

// Меняем pinia на file:./local_data/pinia
if (packageJson.dependencies) {
  packageJson.dependencies.pinia = 'file:./local_data/pinia';
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ package.json обновлён: pinia -> file:./local_data/pinia\n');
}

console.log('🔄 Переустановка зависимостей...');
try {
  execSync('npm install', { cwd: rootDir, stdio: 'inherit' });
  console.log('\n✅ Зависимости переустановлены\n');
} catch (error) {
  console.error('❌ Ошибка при переустановке зависимостей');
  process.exit(1);
}

console.log('🎉 Готово!');
console.log('\n📁 Структура:');
console.log('  local_data/');
console.log('  ├── pinia/              ← Pinia (используется npm)');
console.log('  ├── nostics/            ← Зависимость Pinia');
console.log('  ├── @vue/devtools-api/  ← Зависимость Pinia');
console.log('  └── .pinia-backup/      ← Backup оригинала');
console.log('\n💡 Теперь npm берёт Pinia из local_data/pinia/');
