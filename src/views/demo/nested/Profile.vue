<template>
  <div>
    <h4><i class="fas fa-user me-2 text-primary"></i>Профиль</h4>
    <p class="text-muted">Раздел профиля пользователя.</p>
    
    <div class="row mt-3">
      <div class="col-md-4 text-center">
        <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:100px;height:100px">
          <i class="fas fa-user fa-3x text-primary"></i>
        </div>
        <h5>Иван Петров</h5>
        <p class="text-muted">Разработчик</p>
      </div>
      <div class="col-md-8">
        <table class="table">
          <tr>
            <td class="fw-bold">Email:</td>
            <td>ivan@example.com</td>
          </tr>
          <tr>
            <td class="fw-bold">Телефон:</td>
            <td>+7 (999) 123-45-67</td>
          </tr>
          <tr>
            <td class="fw-bold">Отдел:</td>
            <td>Разработка</td>
          </tr>
          <tr>
            <td class="fw-bold">Дата регистрации:</td>
            <td>2023-01-15</td>
          </tr>
        </table>
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
  name: 'NestedProfile'
}
</script>
