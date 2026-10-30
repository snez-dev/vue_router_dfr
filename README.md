# Vue.js SPA — Система управления доступом

Полноценное SPA-приложение на Vue.js 3 с Single File Components (.vue).

## 🚀 Технологии

- **Frontend:** Vue.js 3 + Vue Router 4
- **State Management:** Pinia (официальный store для Vue.js)
- **CSS Framework:** Bootstrap 5.3 (с встроенной поддержкой тем через data-bs-theme)
- **Icons:** Font Awesome 6
- **Build Tool:** Vite
- **Backend:** Django REST Framework (имитация через mock API)

## 📁 Структура проекта

```
├── index.html                    # Точка входа
├── vite.config.js                # Конфигурация Vite + Vue
├── package.json                  # Зависимости (pinia -> file:./local_data/pinia)
├── scripts/
│   └── copy-pinia.js             # Скрипт копирования Pinia в local_data
├── local_data/                   # Локальная копия Pinia
│   ├── pinia/                    # Pinia (используется npm)
│   └── README.md                 # Документация local_data
├── src/
│   ├── main.js                   # Инициализация Vue приложения + Pinia
│   ├── App.vue                   # Корневой компонент (navbar + router-view)
│   ├── assets/
│   │   └── styles.css            # Глобальные стили
│   ├── stores/                   # Pinia stores
│   │   ├── auth.js               # Auth store (авторизация, права)
│   │   └── theme.js              # Theme store (тема, цветовая схема)
│   ├── plugins/
│   │   └── permission.js         # Плагин директив управления доступом
│   ├── router/
│   │   └── index.js              # Vue Router конфигурация + guards
│   ├── components/
│   │   └── ThemeSwitcher.vue     # Переключатель темы
│   └── views/                    # Компоненты страниц (.vue)
│       ├── LoginPage.vue         # Авторизация
│       ├── HomePage.vue          # Главная
│       ├── DashboardPage.vue     # Панель управления
│       ├── UsersPage.vue         # Пользователи
│       ├── UserDetailPage.vue    # Детали пользователя (динамический ID)
│       ├── ReportsPage.vue       # Отчёты
│       ├── SettingsPage.vue      # Настройки
│       ├── ProfilePage.vue       # Профиль (родительский компонент)
│       ├── profile/              # Вложенные маршруты
│       │   ├── ProfileOverview.vue
│       │   ├── ProfileSettings.vue
│       │   ├── ProfileActivity.vue
│       │   └── ProfileSecurity.vue
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
# 1. Установка зависимостей
npm install

# 2. Development server
npm run dev

# 3. Production build
npm run build

# 4. Preview production build
npm run preview
```

## 📦 Локальное хранение Pinia (local_data)

Проект настроен для использования локальной копии Pinia из папки `local_data/pinia/`.

### Первоначальная настройка

```bash
# 1. Установить зависимости из npm registry
npm install

# 2. Скопировать Pinia в local_data
npm run copy-pinia
```

### Как это работает

1. Скрипт `scripts/copy-pinia.js` копирует Pinia из `node_modules/pinia` в `local_data/pinia`
2. Обновляет `package.json`: `"pinia": "file:./local_data/pinia"`
3. Переустанавливает зависимости — npm создаёт symlink

### Проверка

```bash
npm list pinia
# Должно показать: pinia@4.1.0 -> ./local_data/pinia
```

### Обновление Pinia

```bash
# Установить новую версию из npm
npm install pinia@latest

# Скопировать в local_data
npm run copy-pinia
```

### Откат к стандартной установке

Если нужно убрать локальное хранение:

```bash
# Удалить local_data/pinia
rm -rf local_data/pinia

# Переустановить из npm registry
npm install pinia@4.1.0
```

Подробнее см. [local_data/README.md](./local_data/README.md)

## 📦 Pinia Store

### Auth Store (`src/stores/auth.js`)

```javascript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // State (reactive refs)
  const token = ref(localStorage.getItem('auth_token') || null);
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'));
  const permissions = ref(JSON.parse(localStorage.getItem('auth_permissions') || '[]'));
  const loading = ref(false);

  // Getters (computed)
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const currentUser = computed(() => user.value || {});
  const userPermissions = computed(() => permissions.value || []);

  // Actions (functions)
  async function login(credentials) {
    loading.value = true;
    try {
      const response = await mockApi.login(credentials);
      if (response.success) {
        token.value = response.token;
        user.value = response.user;
        permissions.value = response.permissions;
        // Сохраняем в localStorage
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        localStorage.setItem('auth_permissions', JSON.stringify(response.permissions));
        return { success: true };
      }
      return { success: false, error: response.error };
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    permissions.value = [];
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_permissions');
  }

  function hasPermission(permission) {
    if (!permissions.value || permissions.value.length === 0) return false;
    if (permissions.value.includes('*')) return true;
    return permissions.value.includes(permission);
  }

  function hasAnyPermission(perms) {
    return perms.some(p => hasPermission(p));
  }

  function hasAllPermissions(perms) {
    return perms.every(p => hasPermission(p));
  }

  return {
    // State
    token, user, permissions, loading,
    // Getters
    isAuthenticated, currentUser, userPermissions,
    // Actions
    login, logout, hasPermission, hasAnyPermission, hasAllPermissions,
    // Mock API
    mockApi
  };
});
```

### Использование в компонентах

```vue
<script>
import { useAuthStore } from '../stores/auth';

export default {
  computed: {
    user() {
      const authStore = useAuthStore();
      return authStore.currentUser;
    },
    permissions() {
      const authStore = useAuthStore();
      return authStore.userPermissions;
    }
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore();
      const result = await authStore.login(this.form);
      if (result.success) {
        this.$router.push('/');
      }
    }
  }
}
</script>
```

### Theme Store (`src/stores/theme.js`)

```javascript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('app_theme') || 'light');
  const colorScheme = ref(localStorage.getItem('app_color_scheme') || 'primary');

  const currentTheme = computed(() => {
    if (theme.value === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme.value;
  });

  function setTheme(newTheme) {
    theme.value = newTheme;
    localStorage.setItem('app_theme', newTheme);
    applyTheme();
  }

  function setColorScheme(scheme) {
    colorScheme.value = scheme;
    localStorage.setItem('app_color_scheme', scheme);
    applyTheme();
  }

  return {
    theme, colorScheme, currentTheme,
    setTheme, setColorScheme
  };
});
```

## 🛣️ Vue Router — примеры

### Динамические параметры (ID)

Маршрут с динамическим параметром для отображения деталей пользователя:

```javascript
// router/index.js
{
  path: '/users/:id',
  name: 'UserDetail',
  component: UserDetailPage,
  meta: { requiresAuth: true, permissions: ['users.view'] }
}
```

Использование в компоненте:

```vue
<!-- Переход по ссылке -->
<router-link :to="`/users/${user.id}`">Просмотр</router-link>

<!-- Получение параметра в компоненте -->
<script>
export default {
  mounted() {
    const userId = this.$route.params.id;
    this.loadUser(userId);
  },
  watch: {
    '$route.params.id'() {
      // Реагируем на изменение ID
      this.loadUser(this.$route.params.id);
    }
  }
}
</script>
```

### Вложенные маршруты

Структура с общим layout и дочерними маршрутами:

```javascript
// router/index.js
{
  path: '/profile',
  component: ProfilePage, // Родительский компонент с sidebar
  meta: { requiresAuth: true },
  children: [
    { path: '', name: 'ProfileOverview', component: ProfileOverview },
    { path: 'settings', name: 'ProfileSettings', component: ProfileSettings },
    { path: 'activity', name: 'ProfileActivity', component: ProfileActivity },
    { path: 'security', name: 'ProfileSecurity', component: ProfileSecurity }
  ]
}
```

Родительский компонент с `<router-view>`:

```vue
<!-- ProfilePage.vue -->
<template>
  <div class="container">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-md-3">
        <nav class="nav flex-column">
          <router-link to="/profile">Обзор</router-link>
          <router-link to="/profile/settings">Настройки</router-link>
          <router-link to="/profile/activity">Активность</router-link>
          <router-link to="/profile/security">Безопасность</router-link>
        </nav>
      </div>
      
      <!-- Content area -->
      <div class="col-md-9">
        <router-view></router-view> <!-- Дочерние маршруты рендерятся здесь -->
      </div>
    </div>
  </div>
</template>
```

### Route Guards (защита маршрутов)

```javascript
router.beforeEach((to, from, next) => {
  const store = useStore();
  const isAuthenticated = store.getters.isAuthenticated.value;

  // Проверка авторизации
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } });
  }

  // Проверка прав доступа
  if (to.meta.permissions && to.meta.permissions.length > 0) {
    if (!store.actions.hasAnyPermission(to.meta.permissions)) {
      return next({ name: 'Forbidden' });
    }
  }

  next();
});
```

## 🎨 Система тем и оформления

### Темы (Bootstrap data-bs-theme)
- **Светлая** — классическая светлая тема
- **Тёмная** — тёмная тема для комфортной работы ночью
- **Автоматически** — следует системным настройкам ОС

### Цветовые схемы (Bootstrap color classes)
- **Синий** (primary) — стандартная схема Bootstrap
- **Зелёный** (success) — природная, успокаивающая
- **Красный** (danger) — яркая, привлекающая внимание
- **Жёлтый** (warning) — тёплая, энергичная
- **Голубой** (info) — свежая, технологичная
- **Тёмный** (dark) — строгая, профессиональная

### Использование

Переключатель темы находится в правом нижнем углу экрана (плавающая кнопка).

#### Программное управление темой
```javascript
import { useThemeStore } from './store/theme';

const themeStore = useThemeStore();

// Установить тему
themeStore.actions.setTheme('dark'); // 'light' | 'dark' | 'auto'

// Установить цветовую схему
themeStore.actions.setColorScheme('info'); // 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'dark'

// Получить текущую тему
const currentTheme = themeStore.getters.currentTheme.value;
```

#### Bootstrap классы
```vue
<!-- Используйте Bootstrap классы в компонентах -->
<div class="card bg-body text-body">
  <h5 class="text-primary">Заголовок</h5>
  <p class="text-body-secondary">Текст</p>
</div>
```

## 🗄️ Pinia vs Собственный Store

### Преимущества Pinia:
- ✅ Официальный store для Vue.js (рекомендуется командой Vue)
- ✅ Полная поддержка TypeScript
- ✅ DevTools интеграция (отладка состояния)
- ✅ Модульная архитектура (можно создавать несколько stores)
- ✅ Автоматическая реактивность
- ✅ Поддержка SSR (Server-Side Rendering)
- ✅ Плагины и middleware

### Когда использовать собственный store:
- Простые приложения без сложного состояния
- Нет необходимости в DevTools
- Минимальный размер бандла критичен
- Нет потребности в TypeScript

### Инициализация Pinia

```javascript
// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
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
