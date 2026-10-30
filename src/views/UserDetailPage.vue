<template>
  <div class="container py-5">
    <div class="mb-4">
      <router-link to="/users" class="btn btn-outline-primary">
        <i class="fas fa-arrow-left me-2"></i>Назад к списку
      </router-link>
    </div>

    <div v-if="user" class="row">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body text-center p-4">
            <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:100px;height:100px">
              <i class="fas fa-user fa-3x text-primary"></i>
            </div>
            <h4 class="fw-bold">{{ user.username }}</h4>
            <p class="text-muted">{{ user.email }}</p>
            <span class="badge" :class="roleBadge(user.role)">{{ user.role }}</span>
            <div class="mt-3">
              <span class="badge" :class="user.is_active ? 'bg-success' : 'bg-secondary'">
                {{ user.is_active ? 'Активен' : 'Неактивен' }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">Информация о пользователе</h5>
          </div>
          <div class="card-body">
            <table class="table table-borderless">
              <tr>
                <td class="text-muted" style="width: 200px">ID:</td>
                <td><strong>{{ user.id }}</strong></td>
              </tr>
              <tr>
                <td class="text-muted">Имя пользователя:</td>
                <td><strong>{{ user.username }}</strong></td>
              </tr>
              <tr>
                <td class="text-muted">Email:</td>
                <td><strong>{{ user.email }}</strong></td>
              </tr>
              <tr>
                <td class="text-muted">Роль:</td>
                <td><span class="badge" :class="roleBadge(user.role)">{{ user.role }}</span></td>
              </tr>
              <tr>
                <td class="text-muted">Статус:</td>
                <td>
                  <span class="badge" :class="user.is_active ? 'bg-success' : 'bg-secondary'">
                    {{ user.is_active ? 'Активен' : 'Неактивен' }}
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div class="card border-0 shadow-sm mt-4">
          <div class="card-header bg-white">
            <h5 class="mb-0">Пример динамического маршрута</h5>
          </div>
          <div class="card-body">
            <p class="text-muted small mb-3">
              Эта страница демонстрирует динамический параметр в маршруте:
            </p>
            <div class="alert alert-info">
              <code>path: '/users/:id'</code>
            </div>
            <p class="mb-2">Текущий ID из маршрута:</p>
            <div class="bg-light p-3 rounded">
              <code>$route.params.id = <strong>{{ $route.params.id }}</strong></code>
            </div>
            <hr>
            <p class="text-muted small mb-2">Попробуйте другие ID:</p>
            <div class="d-flex gap-2">
              <router-link to="/users/1" class="btn btn-sm btn-outline-primary">ID: 1</router-link>
              <router-link to="/users/2" class="btn btn-sm btn-outline-primary">ID: 2</router-link>
              <router-link to="/users/3" class="btn btn-sm btn-outline-primary">ID: 3</router-link>
              <router-link to="/users/4" class="btn btn-sm btn-outline-primary">ID: 4</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning">
      <i class="fas fa-exclamation-triangle me-2"></i>
      Пользователь с ID {{ $route.params.id }} не найден
    </div>
  </div>
</template>

<script>
import { useStore } from '../store';

export default {
  name: 'UserDetailPage',
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    await this.loadUser();
  },
  watch: {
    '$route.params.id'() {
      this.loadUser();
    }
  },
  methods: {
    async loadUser() {
      const store = useStore();
      const users = await store.mockApi.getUsers();
      const userId = parseInt(this.$route.params.id);
      this.user = users.find(u => u.id === userId) || null;
    },
    roleBadge(role) {
      const map = { admin: 'bg-danger', manager: 'bg-warning text-dark', user: 'bg-info', guest: 'bg-secondary' };
      return map[role] || 'bg-secondary';
    }
  }
}
</script>
