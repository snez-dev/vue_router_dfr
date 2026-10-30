<template>
  <div>
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">История активности</h5>
      </div>
      <div class="card-body">
        <div class="timeline">
          <div v-for="(activity, index) in activities" :key="index" class="timeline-item mb-4">
            <div class="d-flex">
              <div class="timeline-icon me-3">
                <div :class="`bg-${activity.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center`" style="width:40px;height:40px">
                  <i :class="`fas fa-${activity.icon} text-${activity.color}`"></i>
                </div>
              </div>
              <div class="flex-grow-1">
                <h6 class="mb-1">{{ activity.title }}</h6>
                <p class="text-muted small mb-1">{{ activity.description }}</p>
                <small class="text-muted">
                  <i class="fas fa-clock me-1"></i>{{ activity.time }}
                </small>
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
export default {
  name: 'ProfileActivity',
  data() {
    return {
      activities: [
        {
          title: 'Вход в систему',
          description: 'Успешная авторизация с IP 192.168.1.100',
          time: '2 часа назад',
          icon: 'sign-in-alt',
          color: 'success'
        },
        {
          title: 'Изменение пароля',
          description: 'Пароль успешно обновлён',
          time: '1 день назад',
          icon: 'key',
          color: 'warning'
        },
        {
          title: 'Создание отчёта',
          description: 'Создан отчёт "Квартальный анализ"',
          time: '3 дня назад',
          icon: 'file-alt',
          color: 'primary'
        },
        {
          title: 'Обновление профиля',
          description: 'Изменены настройки профиля',
          time: '1 неделю назад',
          icon: 'user-edit',
          color: 'info'
        },
        {
          title: 'Неудачная попытка входа',
          description: 'Попытка входа с неверным паролем',
          time: '2 недели назад',
          icon: 'exclamation-triangle',
          color: 'danger'
        }
      ]
    };
  }
}
</script>

<style scoped>
.timeline-item {
  position: relative;
  padding-left: 20px;
  border-left: 2px solid var(--bs-border-color);
}

.timeline-item:last-child {
  border-left: 2px solid transparent;
}

.timeline-icon {
  position: relative;
  left: -30px;
  margin-bottom: -40px;
}
</style>
