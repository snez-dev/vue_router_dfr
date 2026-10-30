<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold mb-0"><i class="fas fa-users me-2 text-primary"></i>Пользователи</h2>
      <button class="btn btn-primary" v-permission="'users.create'"><i class="fas fa-plus me-1"></i>Добавить</button>
    </div>
    <div class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr><th>#</th><th>Имя</th><th>Email</th><th>Роль</th><th>Статус</th><th v-permission="'users.edit'">Действия</th></tr>
            </thead>
            <tbody>
              <tr v-for="u in users" :key="u.id">
                <td>{{ u.id }}</td>
                <td>
                  <router-link :to="`/users/${u.id}`" class="text-decoration-none">
                    <i class="fas fa-user me-2 text-muted"></i>{{ u.username }}
                  </router-link>
                </td>
                <td>{{ u.email }}</td>
                <td><span class="badge" :class="roleBadge(u.role)">{{ u.role }}</span></td>
                <td><span class="badge" :class="u.is_active ? 'bg-success' : 'bg-secondary'">{{ u.is_active ? 'Активен' : 'Неактивен' }}</span></td>
                <td v-permission="'users.edit'">
                  <router-link :to="`/users/${u.id}`" class="btn btn-sm btn-outline-primary me-1">
                    <i class="fas fa-eye"></i>
                  </router-link>
                  <button class="btn btn-sm btn-outline-warning me-1" v-permission="'users.edit'">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" v-permission="'users.delete'">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '../store';

export default {
  name: 'UsersPage',
  data() {
    return { users: [] };
  },
  async mounted() {
    const store = useStore();
    this.users = await store.mockApi.getUsers();
  },
  methods: {
    roleBadge(role) {
      const map = { admin: 'bg-danger', manager: 'bg-warning text-dark', user: 'bg-info', guest: 'bg-secondary' };
      return map[role] || 'bg-secondary';
    }
  }
}
</script>
