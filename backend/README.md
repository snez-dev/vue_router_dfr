# Django REST Framework Backend

Бэкенд для Vue.js приложения на Django REST Framework с JWT аутентификацией.

## 🚀 Возможности

- ✅ JWT аутентификация (SimpleJWT)
- ✅ Role-based access control (RBAC)
- ✅ CORS настройка для Vue frontend
- ✅ Пользователи с ролями (admin, manager, user, guest)
- ✅ Система прав доступа
- ✅ CRUD для пользователей и отчётов
- ✅ Загрузка файлов
- ✅ Пагинация

## 📁 Структура проекта

```
backend/
├── config/                 # Настройки проекта
│   ├── settings.py         # Основные настройки
│   ├── urls.py             # Корневые URL
│   └── wsgi.py             # WSGI конфигурация
├── apps/
│   ├── users/              # Приложение пользователей
│   │   ├── models.py       # Модели User, Permission, RolePermission
│   │   ├── serializers.py  # Сериализаторы
│   │   ├── views.py        # API views
│   │   ├── permissions.py  # Кастомные permissions
│   │   ├── urls.py         # URL для users
│   │   └── urls_auth.py    # URL для аутентификации
│   └── reports/            # Приложение отчётов
│       ├── models.py       # Модель Report
│       ├── serializers.py  # Сериализаторы
│       ├── views.py        # API views
│       ├── permissions.py  # Кастомные permissions
│       └── urls.py         # URL для reports
├── manage.py               # Django management script
├── requirements.txt        # Python зависимости
└── .env                    # Переменные окружения
```

## 🛠 Установка

### Автоматическая установка (Linux/Mac)

```bash
chmod +x setup-backend.sh
./setup-backend.sh
```

### Ручная установка

```bash
# Перейти в директорию backend
cd backend

# Создать виртуальное окружение
python3 -m venv venv

# Активировать виртуальное окружение
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Установить зависимости
pip install -r requirements.txt

# Выполнить миграции
python manage.py migrate

# Создать суперпользователя
python manage.py createsuperuser

# Запустить сервер
python manage.py runserver
```

## 🔑 Демо аккаунты

После запуска `setup-backend.sh` будут созданы следующие пользователи:

| Логин    | Пароль      | Роль      | Права                                    |
|----------|-------------|-----------|------------------------------------------|
| admin    | admin123    | admin     | `*` (все права)                          |
| manager  | manager123  | manager   | users.view, users.edit, reports.*, dashboard.view |
| user     | user123     | user      | dashboard.view                           |

## 📡 API Endpoints

### Аутентификация

```
POST /api/auth/login/           # Вход
POST /api/auth/register/        # Регистрация
POST /api/auth/logout/          # Выход
POST /api/auth/refresh/         # Обновление токена
GET  /api/auth/profile/         # Получить профиль
PATCH /api/auth/profile/        # Обновить профиль
POST /api/auth/change-password/ # Изменить пароль
```

### Пользователи

```
GET    /api/users/              # Список пользователей
GET    /api/users/{id}/         # Детали пользователя
POST   /api/users/create/       # Создать пользователя (admin)
PUT    /api/users/{id}/update/  # Обновить пользователя
DELETE /api/users/{id}/delete/  # Удалить пользователя (admin)
```

### Отчёты

```
GET    /api/reports/              # Список отчётов
GET    /api/reports/{id}/         # Детали отчёта
POST   /api/reports/create/       # Создать отчёт
PUT    /api/reports/{id}/update/  # Обновить отчёт
DELETE /api/reports/{id}/delete/  # Удалить отчёт
```

## 🔐 Система прав доступа

### Роли

- **admin** - полный доступ ко всем функциям
- **manager** - управление пользователями и отчётами
- **user** - базовый доступ (dashboard)
- **guest** - только просмотр

### Права

```python
# Права по ролям
role_permissions = {
    'admin': ['*'],  # Все права
    'manager': [
        'users.view', 'users.edit',
        'reports.view', 'reports.create',
        'dashboard.view'
    ],
    'user': ['dashboard.view'],
    'guest': [],
}
```

## 🌐 CORS настройка

CORS настроен для следующих origins:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

## 🗄️ Модели

### User

```python
class User(AbstractUser):
    role = CharField(choices=[admin, manager, user, guest])
    full_name = CharField()
    phone = CharField()
    bio = TextField()
    avatar = ImageField()
    is_active = BooleanField()
```

### Report

```python
class Report(Model):
    title = CharField()
    description = TextField()
    status = CharField(choices=[pending, in_progress, completed, cancelled])
    author = ForeignKey(User)
    file = FileField()
```

## 🚀 Запуск

```bash
# Активировать виртуальное окружение
cd backend
source venv/bin/activate

# Запустить сервер разработки
python manage.py runserver

# Сервер будет доступен на http://localhost:8000
```

## 🧪 Тестирование API

### Вход

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Получить список пользователей

```bash
curl -X GET http://localhost:8000/api/users/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📝 Переменные окружения

Создайте файл `.env` в директории `backend/`:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 🔧 Разработка

### Создание нового приложения

```bash
python manage.py startapp app_name apps/app_name
```

### Создание миграций

```bash
python manage.py makemigrations
python manage.py migrate
```

### Создание суперпользователя

```bash
python manage.py createsuperuser
```

## 📚 Документация

- [Django REST Framework](https://www.django-rest-framework.org/)
- [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/)
- [Django CORS Headers](https://github.com/adamchainz/django-cors-headers)

## 📄 Лицензия

MIT
