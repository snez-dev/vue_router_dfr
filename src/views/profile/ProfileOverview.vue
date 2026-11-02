<template>
  <div>
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">Обзор профиля</h5>
      </div>
      <div class="card-body">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="border rounded p-3">
              <h6 class="text-muted mb-3">Основная информация</h6>
              <table class="table table-borderless table-sm mb-0">
                <tr>
                  <td class="text-muted" style="width: 120px">Имя:</td>
                  <td><strong>{{ user.full_name }}</strong></td>
                </tr>
                <tr>
                  <td class="text-muted">Email:</td>
                  <td><strong>{{ user.email }}</strong></td>
                </tr>
                <tr>
                  <td class="text-muted">Роль:</td>
                  <td><span class="badge bg-info">{{ user.role }}</span></td>
                </tr>
                <tr>
                  <td class="text-muted">ID пользователя:</td>
                  <td><code>{{ user.id }}</code></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="col-md-6">
            <div class="border rounded p-3">
              <h6 class="text-muted mb-3">Права доступа</h6>
              <div class="d-flex flex-wrap gap-2">
                <span 
                  v-for="perm in permissions" 
                  :key="perm" 
                  class="badge bg-primary bg-opacity-10 text-primary"
                >
                  {{ perm }}
                </span>
                <span v-if="permissions.length === 0" class="text-muted">
                  Нет назначенных прав
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <div class="alert alert-info mb-0">
            <i class="fas fa-info-circle me-2"></i>
            Это пример <strong>вложенного маршрута</strong>. Текущий путь: 
            <code>{{ $route.fullPath }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../../stores/auth';

export default {
  name: 'ProfileOverview',
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
