# Vue.js SPA — Система управления доступом

Полноценное SPA-приложение на Vue.js 3 с Single File Components (.vue).

## 🚀 Технологии

- **Frontend:** Vue.js 3 + Vue Router 4
- **State Management:** Собственный store (reactive + computed)
- **CSS Framework:** Bootstrap 5.3
- **Icons:** Font Awesome 6
- **Build Tool:** Vite
- **Backend:** Django REST Framework (имитация через mock API)

## 📁 Структура проекта

```
├── index.html                    # Точка входа
├── vite.config.js                # Конфигурация Vite + Vue
├── package.json                  # Зависимости
├── src/
│   ├── main.js                   # Инициализация Vue приложения
│   ├── App.vue                   # Корневой компонент (navbar + router-view)
│   ├── assets/
│   │   └── styles.css            # Глобальные стили
│   ├── store/
│   │   └── index.js              # Собственный store (state, getters, actions)
│   ├── plugins/
│   │   └── permission.js         # Плагин директив управления доступом
│   ├── router/
│   │   └── index.js              # Vue Router конфигурация + guards
│   └── views/                    # Компоненты страниц (.vue)
│       ├── LoginPage.vue         # Авторизация
│       ├── HomePage.vue          # Главная
│       ├── DashboardPage.vue     # Панель управления
│       ├── UsersPage.vue         # Пользователи
│       ├── ReportsPage.vue       # Отчёты
│       ├── SettingsPage.vue      # Настройки
│       ├── ExamplePage.vue       # Пример использования директив
│       ├── NotFoundPage.vue      # 404
│       ├── ForbiddenPage.vue     # 403
│       └── ServerErrorPage.vue   # 500
└── dist/                         # Сборка для production
```

## 🔐 Система управления доступом

### Директивы

#### `v-permission` — показать/скрыть элемент
```vue
<!-- Одно право -->
<button v-permission="'users.edit'">Редактировать</button>

<!-- Любое из (массив) -->
<button v-permission="['users.view', 'users.edit']">Просмотр/Редактирование</button>

<!-- Все из (объект) -->
<button v-permission="{ all: ['users.view', 'users.edit'] }">Требуются оба</button>
```

#### `v-permission-disable` — блокировка элемента
```vue
<button v-permission-disable="'users.delete'">Удалить</button>
<input v-permission-disable="'settings.edit'" type="text">
```

### Глобальные методы
```vue
<!-- Проверка одного права -->
<span v-if="$can('users.view')">Видимо для пользователей с users.view</span>

<!-- Проверка любого из -->
<span v-if="$canAny(['reports.view', 'reports.create'])">Отчёты</span>

<!-- Проверка всех -->
<span v-if="$canAll(['users.view', 'users.edit'])">Полный доступ</span>
```

### Защита маршрутов
```javascript
// В router/index.js
{
  path: '/users',
  component: UsersPage,
  meta: { 
    requiresAuth: true, 
    permissions: ['users.view'] // Проверка через beforeEach guard
  }
}
```

## 👤 Демо-аккаунты

| Логин    | Пароль      | Роль      | Права                                    |
|----------|-------------|-----------|------------------------------------------|
| admin    | admin123    | admin     | `*` (все права)                          |
| manager  | manager123  | manager   | users.view, users.edit, reports.*, dashboard.view |
| user     | user123     | user      | dashboard.view                           |

## 🛠 Запуск

```bash
# Установка зависимостей
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 📦 Store (собственный, без Pinia)

```javascript
// Структура store
export const useStore = () => ({
  state: reactive({
    token, user, permissions, loading, notifications
  }),
  getters: {
    isAuthenticated, currentUser, userPermissions, isLoading
  },
  actions: {
    login(), logout(),
    hasPermission(), hasAnyPermission(), hasAllPermissions(),
    addNotification(), removeNotification()
  },
  mockApi: {
    login(), getUsers(), getReports()
  }
});
```

## 🎯 Django DRF Backend (рекомендуемая структура)

### Модели
```python
# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    role = models.CharField(max_length=20, choices=[
        ('admin', 'Администратор'),
        ('manager', 'Менеджер'),
        ('user', 'Пользователь'),
    ])

class Permission(models.Model):
    codename = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=200)
    
class RolePermission(models.Model):
    role = models.CharField(max_length=20)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
```

### Views
```python
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    permission_classes = []
    
    def post(self, request):
        user = authenticate(**request.data)
        if user:
            refresh = RefreshToken.for_user(user)
            permissions = get_user_permissions(user)
            return Response({
                'token': str(refresh.access_token),
                'user': UserSerializer(user).data,
                'permissions': permissions
            })
        return Response({'error': 'Invalid credentials'}, status=401)
```

### URLs
```python
# urls.py
from django.urls import path
from .views import LoginView, UserListView

urlpatterns = [
    path('api/auth/login/', LoginView.as_view()),
    path('api/auth/refresh/', TokenRefreshView.as_view()),
    path('api/users/', UserListView.as_view()),
    path('api/reports/', ReportListView.as_view()),
]
```

## 📝 Лицензия

MIT
