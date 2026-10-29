/**
 * Собственный Store (замена Pinia)
 * Реактивное хранилище состояния приложения
 */
(function () {
  const { reactive, computed } = Vue;

  // Состояние приложения
  const state = reactive({
    token: localStorage.getItem('auth_token') || null,
    user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
    permissions: JSON.parse(localStorage.getItem('auth_permissions') || '[]'),
    loading: false,
    sidebarCollapsed: false,
    notifications: [],
  });

  // Геттеры (computed)
  const getters = {
    isAuthenticated: computed(() => !!state.token && !!state.user),
    currentUser: computed(() => state.user),
    userPermissions: computed(() => state.permissions),
    isLoading: computed(() => state.loading),
  };

  // Mock API (имитация Django DRF backend)
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
    async refreshToken(token) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true, token: 'refreshed-' + token };
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

  // Действия
  const actions = {
    async login(credentials) {
      state.loading = true;
      try {
        const response = await mockApi.login(credentials);
        if (response.success) {
          state.token = response.token;
          state.user = response.user;
          state.permissions = response.permissions;
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('auth_user', JSON.stringify(response.user));
          localStorage.setItem('auth_permissions', JSON.stringify(response.permissions));
          return { success: true };
        }
        return { success: false, error: response.error };
      } catch (error) {
        return { success: false, error: 'Ошибка сервера' };
      } finally {
        state.loading = false;
      }
    },
    logout() {
      state.token = null;
      state.user = null;
      state.permissions = [];
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_permissions');
    },
    hasPermission(permission) {
      if (!state.permissions || state.permissions.length === 0) return false;
      if (state.permissions.includes('*')) return true;
      return state.permissions.includes(permission);
    },
    hasAnyPermission(permissions) {
      return permissions.some(p => actions.hasPermission(p));
    },
    hasAllPermissions(permissions) {
      return permissions.every(p => actions.hasPermission(p));
    },
    addNotification(message, type = 'info') {
      const id = Date.now();
      state.notifications.push({ id, message, type });
      setTimeout(() => { state.notifications = state.notifications.filter(n => n.id !== id); }, 5000);
    },
    removeNotification(id) {
      state.notifications = state.notifications.filter(n => n.id !== id);
    },
    setLoading(value) { state.loading = value; }
  };

  window.AppStore = { state, getters, actions, mockApi };
})();
