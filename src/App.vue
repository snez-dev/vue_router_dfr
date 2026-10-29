<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" v-if="isAuthenticated">
      <div class="container-fluid">
        <router-link class="navbar-brand fw-bold" to="/">
          <i class="fas fa-shield-alt me-2"></i>Vue Access
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/"><i class="fas fa-home me-1"></i>Главная</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/dashboard"><i class="fas fa-tachometer-alt me-1"></i>Панель</router-link>
            </li>
            <li class="nav-item" v-permission="'users.view'">
              <router-link class="nav-link" to="/users"><i class="fas fa-users me-1"></i>Пользователи</router-link>
            </li>
            <li class="nav-item" v-permission="'reports.view'">
              <router-link class="nav-link" to="/reports"><i class="fas fa-chart-bar me-1"></i>Отчёты</router-link>
            </li>
            <li class="nav-item" v-permission="'settings.view'">
              <router-link class="nav-link" to="/settings"><i class="fas fa-cog me-1"></i>Настройки</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/example"><i class="fas fa-code me-1"></i>Пример</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-user-circle me-1"></i>{{ currentUser.username }}
                <span class="badge bg-light text-primary ms-1">{{ currentUser.role }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#" @click.prevent="logout"><i class="fas fa-sign-out-alt me-2"></i>Выход</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { useStore } from './store';

export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      const store = useStore();
      return store.getters.isAuthenticated.value;
    },
    currentUser() {
      const store = useStore();
      return store.getters.currentUser.value || {};
    }
  },
  methods: {
    logout() {
      const store = useStore();
      store.actions.logout();
      this.$router.push('/login');
    }
  }
}
</script>
