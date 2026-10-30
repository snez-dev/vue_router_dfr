import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Импорт компонентов страниц
import LoginPage from '../views/LoginPage.vue';
import HomePage from '../views/HomePage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import UsersPage from '../views/UsersPage.vue';
import UserDetailPage from '../views/UserDetailPage.vue';
import ReportsPage from '../views/ReportsPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import ExamplePage from '../views/ExamplePage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import ProfileOverview from '../views/profile/ProfileOverview.vue';
import ProfileSettings from '../views/profile/ProfileSettings.vue';
import ProfileActivity from '../views/profile/ProfileActivity.vue';
import ProfileSecurity from '../views/profile/ProfileSecurity.vue';
import NotFoundPage from '../views/NotFoundPage.vue';
import ForbiddenPage from '../views/ForbiddenPage.vue';
import ServerErrorPage from '../views/ServerErrorPage.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginPage, meta: { guest: true } },
  { path: '/', name: 'Home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/users', name: 'Users', component: UsersPage, meta: { requiresAuth: true, permissions: ['users.view'] } },
  { path: '/users/:id', name: 'UserDetail', component: UserDetailPage, meta: { requiresAuth: true, permissions: ['users.view'] } },
  { path: '/reports', name: 'Reports', component: ReportsPage, meta: { requiresAuth: true, permissions: ['reports.view'] } },
  { path: '/settings', name: 'Settings', component: SettingsPage, meta: { requiresAuth: true, permissions: ['settings.view'] } },
  { path: '/example', name: 'Example', component: ExamplePage, meta: { requiresAuth: true } },
  {
    path: '/profile',
    component: ProfilePage,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'ProfileOverview', component: ProfileOverview },
      { path: 'settings', name: 'ProfileSettings', component: ProfileSettings },
      { path: 'activity', name: 'ProfileActivity', component: ProfileActivity },
      { path: 'security', name: 'ProfileSecurity', component: ProfileSecurity }
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
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

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
    if (!authStore.hasAnyPermission(to.meta.permissions)) {
      return next({ name: 'Forbidden' });
    }
  }

  next();
});

export default router;
