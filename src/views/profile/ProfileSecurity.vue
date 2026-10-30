<template>
  <div>
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">Безопасность</h5>
      </div>
      <div class="card-body">
        <div class="mb-4">
          <h6 class="mb-3">Изменение пароля</h6>
          <form @submit.prevent="changePassword">
            <div class="row g-3">
              <div class="col-12">
                <label class="form-label">Текущий пароль</label>
                <input type="password" class="form-control" v-model="passwordForm.current">
              </div>
              <div class="col-md-6">
                <label class="form-label">Новый пароль</label>
                <input type="password" class="form-control" v-model="passwordForm.new">
              </div>
              <div class="col-md-6">
                <label class="form-label">Подтвердите новый пароль</label>
                <input type="password" class="form-control" v-model="passwordForm.confirm">
              </div>
            </div>
            <div class="mt-3">
              <button type="submit" class="btn btn-warning">
                <i class="fas fa-key me-2"></i>Изменить пароль
              </button>
            </div>
          </form>
        </div>

        <hr>

        <div class="mt-4">
          <h6 class="mb-3">Двухфакторная аутентификация</h6>
          <div class="d-flex justify-content-between align-items-center p-3 border rounded">
            <div>
              <strong>Статус:</strong> 
              <span class="badge bg-danger ms-2">Отключено</span>
            </div>
            <button class="btn btn-outline-primary btn-sm">
              <i class="fas fa-shield-alt me-2"></i>Включить 2FA
            </button>
          </div>
        </div>

        <div class="mt-4">
          <h6 class="mb-3">Активные сессии</h6>
          <div class="list-group">
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i class="fas fa-desktop me-2 text-primary"></i>
                <strong>Chrome на Windows</strong>
                <small class="text-muted d-block">192.168.1.100 • Текущая сессия</small>
              </div>
              <span class="badge bg-success">Активна</span>
            </div>
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <i class="fas fa-mobile-alt me-2 text-info"></i>
                <strong>Safari на iPhone</strong>
                <small class="text-muted d-block">192.168.1.105 • 2 часа назад</small>
              </div>
              <button class="btn btn-outline-danger btn-sm">
                <i class="fas fa-times me-1"></i>Завершить
              </button>
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
export default {
  name: 'ProfileSecurity',
  data() {
    return {
      passwordForm: {
        current: '',
        new: '',
        confirm: ''
      }
    };
  },
  methods: {
    changePassword() {
      if (this.passwordForm.new !== this.passwordForm.confirm) {
        alert('Пароли не совпадают!');
        return;
      }
      alert('Пароль изменён (демо)');
      this.passwordForm = { current: '', new: '', confirm: '' };
    }
  }
}
</script>
