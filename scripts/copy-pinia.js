#!/usr/bin/env node

/**
 * Скрипт для полного копирования Pinia из node_modules в local_data
 * 
 * Использование:
 *   node scripts/copy-pinia.js
 * 
 * Этот скрипт:
 * 1. Копирует все файлы pinia из node_modules в local_data/pinia
 * 2. Обновляет package.json для использования локальной копии
 * 3. Переустанавливает зависимости
 */

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('📦 Копирование Pinia в local_data...\n');

const localDataDir = join(rootDir, 'local_data');
const piniaSrc = join(rootDir, 'node_modules', 'pinia');
const piniaDest = join(localDataDir, 'pinia');

// Проверяем наличие исходной pinia
if (!existsSync(piniaSrc)) {
  console.error('❌ pinia не найдена в node_modules.');
  console.error('💡 Сначала установите pinia: npm install pinia@4.1.0');
  process.exit(1);
}

// Создаём local_data если нет
if (!existsSync(localDataDir)) {
  mkdirSync(localDataDir, { recursive: true });
}

// Удаляем старую копию
if (existsSync(piniaDest)) {
  console.log('🗑️  Удаление старой копии...');
  rmSync(piniaDest, { recursive: true, force: true });
}

// Копируем pinia
console.log('📋 Копирование pinia из node_modules...');
cpSync(piniaSrc, piniaDest, { recursive: true });
console.log('✅ pinia скопирована в local_data/pinia/\n');

// Обновляем package.json
const packageJsonPath = join(rootDir, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

if (packageJson.dependencies) {
  packageJson.dependencies.pinia = 'file:./local_data/pinia';
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✅ package.json обновлён: pinia -> file:./local_data/pinia\n');
}

// Переустанавливаем зависимости
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
console.log('  └── pinia/    ← Полная копия Pinia');
console.log('\n💡 Теперь npm берёт Pinia из local_data/pinia/');
console.log('\n✅ Проект готов к работе: npm run build');
