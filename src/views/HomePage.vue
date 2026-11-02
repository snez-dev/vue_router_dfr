<template>
  <div class="container py-5">
    <div class="row mb-4">
      <div class="col-12">
        <h1 class="display-6 fw-bold"><i class="fas fa-home text-primary me-3"></i>Добро пожаловать, {{ user.full_name }}!</h1>
        <p class="lead text-muted">Панель управления с системой контроля доступа на Vue.js + Django DRF</p>
      </div>
    </div>
    <div class="row g-4 mb-5">
      <div class="col-md-3 col-6" v-for="stat in stats" :key="stat.label">
        <div class="card border-0 shadow-sm card-hover h-100">
          <div class="card-body text-center p-4">
            <div :class="'bg-' + stat.color + ' bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3'" style="width:55px;height:55px">
              <i :class="'fas fa-' + stat.icon + ' fa-lg text-' + stat.color"></i>
            </div>
            <h3 class="fw-bold mb-1">{{ stat.value }}</h3>
            <p class="text-muted small mb-0">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-key me-2 text-primary"></i>Ваши права доступа</h5></div>
          <div class="card-body">
            <div class="d-flex flex-wrap gap-2">
              <span v-for="perm in permissions" :key="perm" class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                <i class="fas fa-check-circle me-1"></i>{{ perm }}
              </span>
              <span v-if="permissions.length === 0" class="text-muted">Нет назначенных прав</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-info-circle me-2 text-info"></i>О системе</h5></div>
          <div class="card-body">
            <table class="table table-borderless table-sm mb-0">
              <tr><td class="text-muted">Frontend:</td><td><strong>Vue.js 3</strong></td></tr>
              <tr><td class="text-muted">Backend:</td><td><strong>Django REST Framework</strong></td></tr>
              <tr><td class="text-muted">CSS:</td><td><strong>Bootstrap 5.3</strong></td></tr>
              <tr><td class="text-muted">Router:</td><td><strong>Vue Router 4</strong></td></tr>
              <tr><td class="text-muted">State:</td><td><strong>Custom Store</strong></td></tr>
              <tr><td class="text-muted">Роль:</td><td><span class="badge bg-info">{{ user.role }}</span></td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-4 mt-3">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-bolt me-2 text-warning"></i>Быстрые действия</h5></div>
          <div class="card-body">
                <div class="d-flex flex-wrap gap-2">
                  <router-link to="/dashboard" class="btn btn-outline-primary"><i class="fas fa-tachometer-alt me-1"></i>Панель</router-link>
                  <router-link to="/users" v-permission="'users.view'" class="btn btn-outline-success"><i class="fas fa-users me-1"></i>Пользователи</router-link>
                  <router-link to="/users/1" v-permission="'users.view'" class="btn btn-outline-success"><i class="fas fa-user me-1"></i>Пользователь #1</router-link>
                  <router-link to="/reports" v-permission="'reports.view'" class="btn btn-outline-warning"><i class="fas fa-chart-bar me-1"></i>Отчёты</router-link>
                  <router-link to="/profile" class="btn btn-outline-info"><i class="fas fa-user-circle me-1"></i>Профиль (вложенные)</router-link>
                  <router-link to="/settings" v-permission="'settings.view'" class="btn btn-outline-secondary"><i class="fas fa-cog me-1"></i>Настройки</router-link>
                  <router-link to="/example" class="btn btn-outline-info"><i class="fas fa-code me-1"></i>Пример директив</router-link>
                  <router-link to="/router-demo" class="btn btn-outline-dark"><i class="fas fa-route me-1"></i>Пример Router</router-link>
                  <router-link to="/403" class="btn btn-outline-danger"><i class="fas fa-lock me-1"></i>Тест 403</router-link>
                  <router-link to="/500" class="btn btn-outline-dark"><i class="fas fa-server me-1"></i>Тест 500</router-link>
                </div>          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  name: 'HomePage',
  data() {
    return {
      stats: [
        { value: '24', label: 'Пользователей', icon: 'users', color: 'primary' },
        { value: '156', label: 'Задач', icon: 'chart-line', color: 'success' },
        { value: '12', label: 'В ожидании', icon: 'clock', color: 'warning' },
        { value: '3', label: 'Ошибки', icon: 'exclamation-triangle', color: 'danger' },
      ]
    };
  },
  computed: {
    user() {
      const authStore = useAuthStore();
      return authStore.currentUser;
    },
    permissions() {
      const authStore = useAuthStore();
      return authStore.userPermissions;
    }
  }
}
</script>
