import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// Mock API (имитация Django DRF)
const mockApi = {
  users: {
    admin: {
      username: 'admin', password: 'admin123',
      user: { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', full_name: 'Администратор' },
      permissions: ['*']
    },
    manager: {
      username: 'manager', password: 'manager123',
      user: { id: 2, username: 'manager', email: 'manager@example.com', role: 'manager', full_name: 'Менеджер' },
      permissions: ['users.view', 'users.edit', 'reports.view', 'reports.create', 'dashboard.view']
    },
    user: {
      username: 'user', password: 'user123',
      user: { id: 3, username: 'user', email: 'user@example.com', role: 'user', full_name: 'Пользователь' },
      permissions: ['dashboard.view']
    }
  },
  async login(credentials) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const userData = this.users[credentials.username];
    if (userData && userData.password === credentials.password) {
      return { success: true, token: 'mock-jwt-' + credentials.username + '-' + Date.now(), user: userData.user, permissions: userData.permissions };
    }
    return { success: false, error: 'Неверное имя пользователя или пароль' };
  },
  async getUsers() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', is_active: true },
      { id: 2, username: 'manager', email: 'manager@example.com', role: 'manager', is_active: true },
      { id: 3, username: 'user', email: 'user@example.com', role: 'user', is_active: true },
      { id: 4, username: 'guest', email: 'guest@example.com', role: 'guest', is_active: false },
    ];
  },
  async getReports() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, title: 'Отчёт за Q1 2024', date: '2024-03-31', status: 'completed' },
      { id: 2, title: 'Отчёт за Q2 2024', date: '2024-06-30', status: 'in_progress' },
      { id: 3, title: 'Годовой отчёт 2024', date: '2024-12-31', status: 'pending' },
    ];
  }
};

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(localStorage.getItem('auth_token') || null);
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'));
  const permissions = ref(JSON.parse(localStorage.getItem('auth_permissions') || '[]'));
  const loading = ref(false);
  const notifications = ref([]);

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const currentUser = computed(() => user.value || {});
  const userPermissions = computed(() => permissions.value || []);
  const isLoading = computed(() => loading.value);

  // Actions
  async function login(credentials) {
    loading.value = true;
    try {
      const response = await mockApi.login(credentials);
      if (response.success) {
        token.value = response.token;
        user.value = response.user;
        permissions.value = response.permissions;
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        localStorage.setItem('auth_permissions', JSON.stringify(response.permissions));
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Ошибка сервера' };
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

  function addNotification(message, type = 'info') {
    const id = Date.now();
    notifications.value.push({ id, message, type });
    setTimeout(() => {
      notifications.value = notifications.value.filter(n => n.id !== id);
    }, 5000);
  }

  function removeNotification(id) {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }

  return {
    // State
    token,
    user,
    permissions,
    loading,
    notifications,
    // Getters
    isAuthenticated,
    currentUser,
    userPermissions,
    isLoading,
    // Actions
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    addNotification,
    removeNotification,
    // Mock API
    mockApi
  };
});
