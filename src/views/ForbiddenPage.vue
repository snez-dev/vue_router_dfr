<template>
  <div class="min-vh-100 d-flex align-items-center bg-light">
    <div class="container text-center">
      <i class="fas fa-lock fa-5x text-danger mb-4"></i>
      <h1 class="display-1 fw-bold text-muted">403</h1>
      <h2 class="mb-3">Доступ запрещён</h2>
      <p class="lead text-muted mb-4">У вас недостаточно прав для просмотра этой страницы.</p>
      <div class="d-flex justify-content-center gap-3">
        <router-link to="/" class="btn btn-primary btn-lg"><i class="fas fa-home me-2"></i>На главную</router-link>
        <button class="btn btn-outline-secondary btn-lg" @click="$router.back()"><i class="fas fa-arrow-left me-2"></i>Назад</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForbiddenPage'
}
</script>
