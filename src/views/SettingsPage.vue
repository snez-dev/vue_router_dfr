<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4"><i class="fas fa-cog me-2 text-primary"></i>Настройки</h2>
    <div class="row g-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-user-edit me-2"></i>Профиль</h5></div>
          <div class="card-body">
            <div class="mb-3"><label class="form-label small">Имя</label><input type="text" class="form-control" :value="user.full_name"></div>
            <div class="mb-3"><label class="form-label small">Email</label><input type="email" class="form-control" :value="user.email"></div>
            <button class="btn btn-primary" v-permission="'settings.edit'"><i class="fas fa-save me-1"></i>Сохранить</button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-bell me-2"></i>Уведомления</h5></div>
          <div class="card-body">
            <div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">Email уведомления</label></div>
            <div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox"><label class="form-check-label">Push уведомления</label></div>
            <div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">Безопасность</label></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '../store';

export default {
  name: 'SettingsPage',
  computed: {
    user() {
      const store = useStore();
      return store.getters.currentUser.value || {};
    }
  }
}
</script>
