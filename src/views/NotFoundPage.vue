<template>
  <div class="min-vh-100 d-flex align-items-center bg-light">
    <div class="container text-center">
      <i class="fas fa-exclamation-triangle fa-5x text-warning mb-4"></i>
      <h1 class="display-1 fw-bold text-muted">404</h1>
      <h2 class="mb-3">Страница не найдена</h2>
      <p class="lead text-muted mb-4">Запрашиваемая страница не существует.</p>
      <div class="d-flex justify-content-center gap-3">
        <router-link to="/" class="btn btn-primary btn-lg"><i class="fas fa-home me-2"></i>На главную</router-link>
        <button class="btn btn-outline-secondary btn-lg" @click="$router.back()"><i class="fas fa-arrow-left me-2"></i>Назад</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>
