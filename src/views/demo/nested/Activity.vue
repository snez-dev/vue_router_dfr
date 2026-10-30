<template>
  <div>
    <h4><i class="fas fa-history me-2 text-primary"></i>Активность</h4>
    <p class="text-muted">История действий пользователя.</p>
    
    <div class="mt-3">
      <div class="list-group">
        <div class="list-group-item" v-for="(item, idx) in activities" :key="idx">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">
              <i :class="item.icon" class="me-2"></i>
              {{ item.title }}
            </h6>
            <small class="text-muted">{{ item.time }}</small>
          </div>
          <p class="mb-1 text-muted small">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <div class="alert alert-secondary mt-4">
      <i class="fas fa-code me-2"></i>
      <strong>Текущий маршрут:</strong> <code>{{ $route.path }}</code>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestedActivity',
  data() {
    return {
      activities: [
        { icon: 'fas fa-sign-in-alt text-success', title: 'Вход в систему', time: '5 минут назад', description: 'Успешная авторизация' },
        { icon: 'fas fa-edit text-primary', title: 'Редактирование профиля', time: '1 час назад', description: 'Обновлён номер телефона' },
        { icon: 'fas fa-file-alt text-info', title: 'Создание отчёта', time: '3 часа назад', description: 'Создан отчёт за Q1 2024' },
        { icon: 'fas fa-cog text-secondary', title: 'Изменение настроек', time: '1 день назад', description: 'Включены email уведомления' },
        { icon: 'fas fa-user-plus text-warning', title: 'Добавление пользователя', time: '2 дня назад', description: 'Добавлен новый пользователь' },
      ]
    };
  }
}
</script>
