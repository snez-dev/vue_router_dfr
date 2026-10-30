import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Импорт компонентов страниц
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import UsersPage from '../views/UsersPage.vue';
import ReportsPage from '../views/ReportsPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import ExamplePage from '../views/ExamplePage.vue';
import RouterExamplePage from '../views/RouterExamplePage.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import ForbiddenPage from '../views/ForbiddenPage.vue';
import ServerErrorPage from '../views/ServerErrorPage.vue';

// Демо компоненты для Vue Router
import UsersListDemo from '../views/demo/UsersListDemo.vue';
import UserDetailDemo from '../views/demo/UserDetailDemo.vue';
import NestedRoutesDemo from '../views/demo/NestedRoutesDemo.vue';
import NestedOverview from '../views/demo/nested/Overview.vue';
import NestedProfile from '../views/demo/nested/Profile.vue';
import NestedSettings from '../views/demo/nested/Settings.vue';
import NestedActivity from '../views/demo/nested/Activity.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginPage, meta: { guest: true } },
  { path: '/', name: 'Home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/users', name: 'Users', component: UsersPage, meta: { requiresAuth: true, permissions: ['users.view'] } },
  { path: '/reports', name: 'Reports', component: ReportsPage, meta: { requiresAuth: true, permissions: ['reports.view'] } },
  { path: '/settings', name: 'Settings', component: SettingsPage, meta: { requiresAuth: true, permissions: ['settings.view'] } },
  { path: '/example', name: 'Example', component: ExamplePage, meta: { requiresAuth: true } },
  
  // Vue Router Demo - Динамические параметры
  { path: '/router-demo', name: 'RouterDemo', component: RouterExamplePage, meta: { requiresAuth: true } },
  { path: '/router-demo/users', name: 'UsersListDemo', component: UsersListDemo, meta: { requiresAuth: true } },
  { path: '/router-demo/users/:id', name: 'UserDetailDemo', component: UserDetailDemo, meta: { requiresAuth: true } },
  
  // Vue Router Demo - Вложенные маршруты
  { 
    path: '/router-demo/nested', 
    name: 'NestedRoutesDemo', 
    component: NestedRoutesDemo, 
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'NestedOverview', component: NestedOverview },
      { path: 'profile', name: 'NestedProfile', component: NestedProfile },
      { path: 'settings', name: 'NestedSettings', component: NestedSettings },
      { path: 'activity', name: 'NestedActivity', component: NestedActivity }
    ]
  },
  
  { path: '/403', name: 'Forbidden', component: ForbiddenPage },
  { path: '/500', name: 'ServerError', component: ServerErrorPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Route Guards
router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  const isAuthenticated = store.isAuthenticated;

  // Требуется авторизация
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } });
  }

  // Только для гостей (login)
  if (to.meta.guest && isAuthenticated) {
    return next({ name: 'Home' });
  }

  // Проверка прав доступа
  if (to.meta.permissions && to.meta.permissions.length > 0) {
    if (!store.hasAnyPermission(to.meta.permissions)) {
      return next({ name: 'Forbidden' });
    }
  }

  next();
});

export default router;
