# Local Data Directory

Эта папка содержит локальные копии npm пакетов, которые используются вместо стандартных node_modules.

## 📦 Структура

```
local_data/
├── pinia/                    # Pinia - store для Vue.js
│   ├── dist/
│   │   ├── pinia.js          # Основная библиотека
│   │   ├── pinia.d.ts        # TypeScript типы
│   │   └── ...               # Другие форматы
│   ├── package.json
│   └── README.md
├── nostics/                  # Зависимость Pinia
│   ├── dist/
│   └── package.json
├── @vue/
│   └── devtools-api/         # Зависимость Pinia
├── .pinia-backup/            # Backup оригинальной Pinia
└── README.md                 # Этот файл
```

## 🚀 Как использовать

### 1. Первоначальная настройка

```bash
# Установите зависимости из npm registry
npm install

# Скопируйте Pinia в local_data
node scripts/copy-pinia.js
```

### 2. Повторная установка

```bash
# npm автоматически берёт Pinia из local_data/pinia/
npm install
```

## 🔧 Как это работает

1. **package.json** содержит `"pinia": "file:./local_data/pinia"`
2. При `npm install` npm создаёт symlink: `node_modules/pinia → local_data/pinia`
3. Все импорты `import { ... } from 'pinia'` работают как обычно
4. Физически файлы находятся в `local_data/pinia/`

## 📝 Ручное обновление Pinia

Если нужно обновить Pinia до новой версии:

```bash
# 1. Установите новую версию из npm
npm install pinia@latest

# 2. Скопируйте в local_data
node scripts/copy-pinia.js
```

## 🗑️ Очистка

```bash
# Удалить локальные копии
rm -rf local_data/pinia local_data/nostics local_data/@vue

# Переустановить из npm
npm install
```

## ✅ Преимущества

- ✅ **Контроль версий** — Pinia хранится в проекте
- ✅ **Оффлайн работа** — не нужен интернет для установки
- ✅ **Быстрая установка** — npm берёт из локальной копии
- ✅ **Изоляция** — изменения в local_data не влияют на другие проекты
- ✅ **Бэкап** — оригинальная версия сохраняется в `.pinia-backup/`

## 🔍 Проверка

Чтобы убедиться что npm использует локальную Pinia:

```bash
npm list pinia
```

Должно показать: `pinia@4.1.0 -> ./local_data/pinia`

## 📚 Документация

- [Pinia Official Docs](https://pinia.vuejs.org/)
- [npm file: protocol](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#local-paths)
