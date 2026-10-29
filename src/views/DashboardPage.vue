<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4"><i class="fas fa-tachometer-alt me-2 text-primary"></i>Панель управления</h2>
    <div class="row g-4">
      <div class="col-md-8">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white"><h5 class="mb-0">Последняя активность</h5></div>
          <div class="card-body">
            <div class="list-group list-group-flush">
              <div class="list-group-item d-flex align-items-center px-0 border-0 mb-2" v-for="(item, idx) in activities" :key="idx">
                <div :class="'bg-' + item.color + ' bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0'" style="width:40px;height:40px">
                  <i :class="'fas fa-' + item.icon + ' text-' + item.color"></i>
                </div>
                <div class="flex-grow-1">
                  <p class="mb-0 fw-semibold small">{{ item.title }}</p>
                  <small class="text-muted">{{ item.time }}</small>
                </div>
                <span :class="'badge bg-' + item.statusColor">{{ item.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body text-center">
            <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:70px;height:70px">
              <i class="fas fa-user fa-2x text-primary"></i>
            </div>
            <h5 class="mb-1">{{ user.full_name }}</h5>
            <p class="text-muted small mb-2">{{ user.email }}</p>
            <span class="badge bg-info fs-6">{{ user.role }}</span>
          </div>
        </div>
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white"><h5 class="mb-0">Прогресс</h5></div>
          <div class="card-body">
            <div class="d-flex justify-content-between mb-1 small"><span>Задачи</span><strong>12/15</strong></div>
            <div class="progress mb-3" style="height:6px"><div class="progress-bar bg-success" style="width:80%"></div></div>
            <div class="d-flex justify-content-between mb-1 small"><span>Проекты</span><strong>3/5</strong></div>
            <div class="progress" style="height:6px"><div class="progress-bar bg-primary" style="width:60%"></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '../store';

export default {
  name: 'DashboardPage',
  data() {
    return {
      activities: [
        { title: 'Новый пользователь зарегистрирован', time: '5 мин назад', icon: 'user-plus', color: 'success', status: 'Новый', statusColor: 'success' },
        { title: 'Отчёт за Q1 сформирован', time: '1 час назад', icon: 'file-alt', color: 'primary', status: 'Готово', statusColor: 'primary' },
        { title: 'Обновление безопасности', time: '3 часа назад', icon: 'shield-alt', color: 'warning', status: 'Важно', statusColor: 'warning' },
        { title: 'Резервная копия создана', time: '5 часов назад', icon: 'database', color: 'info', status: 'OK', statusColor: 'info' },
        { title: 'Ошибка при импорте данных', time: '1 день назад', icon: 'exclamation-circle', color: 'danger', status: 'Ошибка', statusColor: 'danger' },
      ]
    };
  },
  computed: {
    user() {
      const store = useStore();
      return store.getters.currentUser.value || {};
    }
  }
}
</script>
