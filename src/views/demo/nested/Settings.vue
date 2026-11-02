<template>
  <div>
    <h4><i class="fas fa-cog me-2 text-primary"></i>Настройки</h4>
    <p class="text-muted">Раздел настроек приложения.</p>
    
    <div class="mt-3">
      <div class="mb-3">
        <label class="form-label fw-bold">Уведомления</label>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="emailNotif" checked>
          <label class="form-check-label" for="emailNotif">Email уведомления</label>
        </div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="pushNotif">
          <label class="form-check-label" for="pushNotif">Push уведомления</label>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Язык</label>
        <select class="form-select">
          <option>Русский</option>
          <option>English</option>
          <option>Deutsch</option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label fw-bold">Часовой пояс</label>
        <select class="form-select">
          <option>UTC+3 (Москва)</option>
          <option>UTC+5 (Екатеринбург)</option>
          <option>UTC+7 (Красноярск)</option>
        </select>
      </div>

      <button class="btn btn-primary">
        <i class="fas fa-save me-1"></i>Сохранить
      </button>
    </div>

    <div class="alert alert-secondary mt-4">
      <i class="fas fa-code me-2"></i>
      <strong>Текущий маршрут:</strong> <code>{{ $route.path }}</code>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestedSettings'
}
</script>
