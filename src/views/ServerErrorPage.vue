<template>
  <div class="min-vh-100 d-flex align-items-center bg-light">
    <div class="container text-center">
      <i class="fas fa-server fa-5x text-danger mb-4"></i>
      <h1 class="display-1 fw-bold text-muted">500</h1>
      <h2 class="mb-3">Ошибка сервера</h2>
      <p class="lead text-muted mb-4">Произошла внутренняя ошибка сервера. Попробуйте позже.</p>
      <div class="d-flex justify-content-center gap-3">
        <router-link to="/" class="btn btn-primary btn-lg"><i class="fas fa-home me-2"></i>На главную</router-link>
        <button class="btn btn-outline-secondary btn-lg" onclick="location.reload()"><i class="fas fa-redo me-2"></i>Обновить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerErrorPage'
}
</script>
