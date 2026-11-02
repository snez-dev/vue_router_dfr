<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card border-0 shadow">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">
              <i class="fas fa-user-circle me-2"></i>
              Профиль пользователя #{{ userId }}
            </h4>
          </div>
          <div class="card-body">
            <div class="text-center mb-4">
              <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:100px;height:100px">
                <i class="fas fa-user fa-3x text-primary"></i>
              </div>
              <h3>{{ user.name }}</h3>
              <p class="text-muted">{{ user.email }}</p>
            </div>

            <div class="alert alert-info">
              <i class="fas fa-info-circle me-2"></i>
              <strong>Динамический параметр:</strong> ID пользователя = <code>{{ userId }}</code>
              <br>
              <small class="text-muted">Этот ID получен из URL через <code>$route.params.id</code></small>
            </div>

            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <div class="card bg-light">
                  <div class="card-body">
                    <h6><i class="fas fa-id-badge me-2"></i>ID</h6>
                    <p class="mb-0 fw-bold">{{ user.id }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-light">
                  <div class="card-body">
                    <h6><i class="fas fa-briefcase me-2"></i>Должность</h6>
                    <p class="mb-0 fw-bold">{{ user.position }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-light">
                  <div class="card-body">
                    <h6><i class="fas fa-phone me-2"></i>Телефон</h6>
                    <p class="mb-0 fw-bold">{{ user.phone }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-light">
                  <div class="card-body">
                    <h6><i class="fas fa-calendar me-2"></i>Дата регистрации</h6>
                    <p class="mb-0 fw-bold">{{ user.registered }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex gap-2">
              <router-link to="/router-demo/users" class="btn btn-secondary">
                <i class="fas fa-arrow-left me-1"></i>Назад к списку
              </router-link>
              <router-link :to="`/router-demo/users/${Number(userId) - 1}`" 
                           class="btn btn-outline-primary"
                           :disabled="Number(userId) <= 1">
                <i class="fas fa-chevron-left me-1"></i>Предыдущий
              </router-link>
              <router-link :to="`/router-demo/users/${Number(userId) + 1}`" 
                           class="btn btn-outline-primary"
                           :disabled="Number(userId) >= 6">
                Следующий<i class="fas fa-chevron-right ms-1"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDetailDemo',
  computed: {
    userId() {
      return this.$route.params.id;
    },
    user() {
      const users = {
        1: { id: 1, name: 'Иван Петров', email: 'ivan@example.com', position: 'Разработчик', phone: '+7 (999) 123-45-67', registered: '2023-01-15' },
        2: { id: 2, name: 'Мария Сидорова', email: 'maria@example.com', position: 'Дизайнер', phone: '+7 (999) 234-56-78', registered: '2023-02-20' },
        3: { id: 3, name: 'Алексей Иванов', email: 'alexey@example.com', position: 'Менеджер', phone: '+7 (999) 345-67-89', registered: '2023-03-10' },
        4: { id: 4, name: 'Елена Козлова', email: 'elena@example.com', position: 'Аналитик', phone: '+7 (999) 456-78-90', registered: '2023-04-05' },
        5: { id: 5, name: 'Дмитрий Смирнов', email: 'dmitry@example.com', position: 'Тестировщик', phone: '+7 (999) 567-89-01', registered: '2023-05-12' },
        6: { id: 6, name: 'Ольга Новикова', email: 'olga@example.com', position: 'HR', phone: '+7 (999) 678-90-12', registered: '2023-06-18' },
      };
      return users[this.userId] || { id: this.userId, name: 'Неизвестный', email: 'unknown@example.com', position: 'Не указана', phone: 'Не указан', registered: 'Не указана' };
    }
  }
}
</script>
