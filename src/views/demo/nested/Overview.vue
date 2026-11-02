<template>
  <div>
    <h4><i class="fas fa-home me-2 text-primary"></i>Обзор</h4>
    <p class="text-muted">Это главная вкладка вложенного маршрута.</p>
    
    <div class="row g-3 mt-3">
      <div class="col-md-4">
        <div class="card bg-primary text-white">
          <div class="card-body text-center">
            <i class="fas fa-users fa-2x mb-2"></i>
            <h3>24</h3>
            <p class="mb-0">Пользователей</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-success text-white">
          <div class="card-body text-center">
            <i class="fas fa-tasks fa-2x mb-2"></i>
            <h3>156</h3>
            <p class="mb-0">Задач</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-warning text-dark">
          <div class="card-body text-center">
            <i class="fas fa-chart-line fa-2x mb-2"></i>
            <h3>89%</h3>
            <p class="mb-0">Прогресс</p>
          </div>
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
  name: 'NestedOverview'
}
</script>
