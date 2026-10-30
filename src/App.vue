<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark" :class="navbarColorClass" v-if="isAuthenticated">
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
              <li class="nav-item">
                <router-link class="nav-link" to="/profile"><i class="fas fa-user-circle me-1"></i>Профиль</router-link>
              </li>
              <li class="nav-item" v-permission="'settings.view'">
                <router-link class="nav-link" to="/settings"><i class="fas fa-cog me-1"></i>Настройки</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/example"><i class="fas fa-code me-1"></i>Пример</router-link>
              </li>
            </ul>          <ul class="navbar-nav">
            <li class="nav-item dropdown" ref="dropdownRef">
              <a class="nav-link dropdown-toggle" href="#" role="button" @click.prevent="toggleDropdown">
                <i class="fas fa-user-circle me-1"></i>{{ currentUser.username }}
                <span class="badge bg-light text-primary ms-1">{{ currentUser.role }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" :class="{ show: dropdownOpen }">
                <li><button type="button" class="dropdown-item" @click="logout"><i class="fas fa-sign-out-alt me-2"></i>Выход</button></li>
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

    <!-- Theme Switcher -->
    <ThemeSwitcher />
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth';
import { useThemeStore } from './stores/theme';
import ThemeSwitcher from './components/ThemeSwitcher.vue';

export default {
  name: 'App',
  components: {
    ThemeSwitcher
  },
  data() {
    return {
      dropdownOpen: false
    };
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuthenticated;
    },
    currentUser() {
      const authStore = useAuthStore();
      return authStore.currentUser;
    },
    navbarColorClass() {
      const themeStore = useThemeStore();
      return `bg-${themeStore.colorScheme}`;
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.dropdownOpen = false;
      this.$router.push('/login');
    },
    closeDropdown(event) {
      if (this.$refs.dropdownRef && !this.$refs.dropdownRef.contains(event.target)) {
        this.dropdownOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }
}
</script>
