<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4"><i class="fas fa-users me-2 text-primary"></i>Пользователи</h2>
    <div class="alert alert-info">
      <i class="fas fa-info-circle me-2"></i>
      Нажмите на пользователя, чтобы увидеть динамический роутинг с <code>:id</code>
    </div>
    <div class="row g-4">
      <div class="col-md-4" v-for="user in users" :key="user.id">
        <div class="card border-0 shadow-sm card-hover h-100">
          <div class="card-body text-center">
            <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:70px;height:70px">
              <i class="fas fa-user fa-2x text-primary"></i>
            </div>
            <h5 class="card-title">{{ user.name }}</h5>
            <p class="text-muted small mb-3">{{ user.email }}</p>
            <router-link :to="`/router-demo/users/${user.id}`" class="btn btn-primary">
              <i class="fas fa-eye me-1"></i>Подробнее
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersListDemo',
  data() {
    return {
      users: [
        { id: 1, name: 'Иван Петров', email: 'ivan@example.com' },
        { id: 2, name: 'Мария Сидорова', email: 'maria@example.com' },
        { id: 3, name: 'Алексей Иванов', email: 'alexey@example.com' },
        { id: 4, name: 'Елена Козлова', email: 'elena@example.com' },
        { id: 5, name: 'Дмитрий Смирнов', email: 'dmitry@example.com' },
        { id: 6, name: 'Ольга Новикова', email: 'olga@example.com' },
      ]
    };
  }
}
</script>
