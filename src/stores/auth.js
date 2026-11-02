import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authAPI } from '../api/client';

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(localStorage.getItem('auth_token') || null);
  const refreshToken = ref(localStorage.getItem('auth_refresh_token') || null);
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
      const response = await authAPI.login(credentials);
      
      if (response.success) {
        token.value = response.token;
        refreshToken.value = response.refresh_token;
        user.value = response.user;
        permissions.value = response.permissions;
        
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_refresh_token', response.refresh_token);
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        localStorage.setItem('auth_permissions', JSON.stringify(response.permissions));
        
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Ошибка входа' };
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сервера' };
    } finally {
      loading.value = false;
    }
  }

  async function register(userData) {
    loading.value = true;
    try {
      const response = await authAPI.register(userData);
      
      if (response.success) {
        token.value = response.token;
        refreshToken.value = response.refresh_token;
        user.value = response.user;
        permissions.value = response.permissions;
        
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('auth_refresh_token', response.refresh_token);
        localStorage.setItem('auth_user', JSON.stringify(response.user));
        localStorage.setItem('auth_permissions', JSON.stringify(response.permissions));
        
        return { success: true };
      }
      
      return { success: false, error: response.error || 'Ошибка регистрации' };
    } catch (error) {
      return { success: false, error: error.message || 'Ошибка сервера' };
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      if (refreshToken.value) {
        await authAPI.logout(refreshToken.value);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      token.value = null;
      refreshToken.value = null;
      user.value = null;
      permissions.value = [];
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_refresh_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_permissions');
    }
  }

  async function refreshTokenFn() {
    if (!refreshToken.value) {
      logout();
      return;
    }
    
    try {
      const response = await authAPI.refreshToken(refreshToken.value);
      token.value = response.access;
      localStorage.setItem('auth_token', response.access);
    } catch (error) {
      logout();
    }
  }

  async function getProfile() {
    try {
      const response = await authAPI.getProfile();
      user.value = response;
      localStorage.setItem('auth_user', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  async function updateProfile(data) {
    try {
      const response = await authAPI.updateProfile(data);
      user.value = response;
      localStorage.setItem('auth_user', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  async function changePassword(data) {
    try {
      const response = await authAPI.changePassword(data);
      return response;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
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
    refreshToken,
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
    register,
    logout,
    refreshToken: refreshTokenFn,
    getProfile,
    updateProfile,
    changePassword,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    addNotification,
    removeNotification,
  };
});
