# Vue.js — Система управления доступом

## Описание

Полноценное SPA-приложение на Vue.js 3 с системой контроля доступа, использующее:
- **Frontend:** Vue.js 3 + Vue Router 4 + Bootstrap 5
- **Backend:** Django REST Framework (DRF)
- **State Management:** Собственный store (без Pinia)
- **Access Control:** Кастомный плагин с директивами

## Структура проекта

```
├── index.html              # Точка входа с CDN подключением
├── public/js/
│   ├── store.js           # Собственный реактивный store (замена Pinia)
│   ├── permission.js      # Плагин директив для управления доступом
│   ├── router.js          # Vue Router + все компоненты-страницы
│   └── app.js             # Инициализация Vue приложения
└── README.md
```

## Страницы

| Маршрут    | Страница          | Защита                    |
|------------|-------------------|---------------------------|
| `/login`   | Авторизация       | Только для гостей         |
| `/`        | Главная           | requiresAuth              |
| `/dashboard` | Панель управления | requiresAuth             |
| `/users`   | Пользователи      | requiresAuth + users.view |
| `/reports` | Отчёты            | requiresAuth + reports.view |
| `/settings`| Настройки         | requiresAuth + settings.view |
| `/example` | Пример директив   | requiresAuth              |
| `/403`     | Доступ запрещён   | —                         |
| `/500`     | Ошибка сервера    | —                         |
| `*`        | 404 Не найдено    | —                         |

## Демо-аккаунты

| Логин    | Пароль      | Роль      | Права                                    |
|----------|-------------|-----------|------------------------------------------|
| admin    | admin123    | admin     | `*` (все права)                          |
| manager  | manager123  | manager   | users.view, users.edit, reports.*, dashboard.view |
| user     | user123     | user      | dashboard.view                           |

## Система управления доступом

### Директивы

#### `v-permission` — показать/скрыть элемент
```html
<!-- Одно право -->
<button v-permission="'users.edit'">Редактировать</button>

<!-- Любое из (массив) -->
<button v-permission="['users.view', 'users.edit']">Просмотр/Редактирование</button>

<!-- Все из (объект) -->
<button v-permission="{ all: ['users.view', 'users.edit'] }">Требуются оба</button>

<!-- Удалить из DOM (модификатор) -->
<div v-permission.remove="'admin.only'">Только для админов</div>
```

#### `v-permission-disable` — блокировка элемента
```html
<button v-permission-disable="'users.delete'">Удалить</button>
<input v-permission-disable="'settings.edit'" type="text">
```

#### `v-permission-class` — CSS класс при отсутствии прав
```html
<div v-permission-class="{ permission: 'users.edit', class: 'opacity-50' }">
  Контент
</div>
```

### Глобальные методы
```html
<!-- Проверка одного права -->
<span v-if="$can('users.view')">Видимо для пользователей с users.view</span>

<!-- Проверка любого из -->
<span v-if="$canAny(['reports.view', 'reports.create'])">Отчёты</span>

<!-- Проверка всех -->
<span v-if="$canAll(['users.view', 'users.edit'])">Полный доступ</span>
```

### Защита маршрутов (Route Guards)
```javascript
// В router.js
{
  path: '/users',
  component: UsersPage,
  meta: { 
    requiresAuth: true, 
    permissions: ['users.view'] // Проверка через beforeEach guard
  }
}
```

## Django DRF Backend (рекомендуемая структура)

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

### Serializers
```python
# serializers.py
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'full_name', 'permissions']
    
    def get_permissions(self, obj):
        return list(obj.role_permissions.values_list('permission__codename', flat=True))

class TokenSerializer(serializers.Serializer):
    token = serializers.CharField()
    user = UserSerializer()
    permissions = serializers.ListField(child=serializers.CharField())
```

### Views
```python
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    permission_classes = []
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(**serializer.validated_data)
        if user:
            refresh = RefreshToken.for_user(user)
            permissions = get_user_permissions(user)
            return Response({
                'token': str(refresh.access_token),
                'user': UserSerializer(user).data,
                'permissions': permissions
            })
        return Response({'error': 'Invalid credentials'}, status=401)

class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        return [IsAuthenticated(), HasPermission('users.view')]

class HasPermission(BasePermission):
    def __init__(self, permission_codename):
        self.permission_codename = permission_codename
    
    def has_permission(self, request, view):
        return request.user.has_permission(self.permission_codename)
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

## Store (собственный, без Pinia)

```javascript
// Структура store
window.AppStore = {
  state: reactive({
    token, user, permissions, loading, notifications
  }),
  getters: {
    isAuthenticated, currentUser, userPermissions, isLoading
  },
  actions: {
    login(), logout(), refreshToken(),
    hasPermission(), hasAnyPermission(), hasAllPermissions(),
    addNotification(), removeNotification()
  }
}
```

## Запуск

```bash
# Development
npm run dev

# Production build
npm run build
```

## Технологии

- **Vue.js 3** — реактивный фреймворк
- **Vue Router 4** — маршрутизация с guards
- **Bootstrap 5.3** — UI компоненты
- **Font Awesome 6** — иконки
- **Django DRF** — REST API backend
- **JWT** — аутентификация
