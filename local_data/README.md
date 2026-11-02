# Local Data — Pinia

Эта папка содержит локальную копию **Pinia** — официального store для Vue.js.

## 📦 Структура

```
local_data/
└── pinia/                  # Pinia (копия из node_modules)
    ├── dist/
    │   ├── pinia.js
    │   └── pinia.d.ts
    ├── package.json
    └── README.md
```

## 🚀 Использование

### Первоначальная настройка

```bash
# 1. Установить зависимости
npm install

# 2. Скопировать Pinia в local_data
npm run copy-pinia
```

### Как это работает

1. Скрипт копирует Pinia из `node_modules/pinia` в `local_data/pinia`
2. Обновляет `package.json`: `"pinia": "file:./local_data/pinia"`
3. npm создаёт symlink: `node_modules/pinia → local_data/pinia`

## 📝 Обновление Pinia

```bash
# Установить новую версию
npm install pinia@latest

# Скопировать в local_data
npm run copy-pinia
```

## ✅ Преимущества

- ✅ **Контроль версий** — Pinia хранится в проекте
- ✅ **Изоляция** — изменения не влияют на другие проекты
- ✅ **Прозрачность** — видно какая версия используется

## 🔍 Проверка

```bash
npm list pinia
# Должно показать: pinia@4.1.0 -> ./local_data/pinia
```

## 📚 Документация

- [Pinia Official Docs](https://pinia.vuejs.org/)
- [npm file: protocol](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#local-paths)
