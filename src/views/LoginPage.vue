<template>
  <div class="min-vh-100 d-flex align-items-center login-bg">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5 col-lg-4">
          <div class="card shadow-lg border-0 rounded-4">
            <div class="card-body p-5">
              <div class="text-center mb-4">
                <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:70px;height:70px">
                  <i class="fas fa-shield-alt fa-2x text-primary"></i>
                </div>
                <h3 class="fw-bold">Вход в систему</h3>
                <p class="text-muted small">Vue.js + Django DRF | Система контроля доступа</p>
              </div>
              <div v-if="error" class="alert alert-danger alert-dismissible fade show py-2" role="alert">
                <small><i class="fas fa-exclamation-circle me-1"></i>{{ error }}</small>
                <button type="button" class="btn-close btn-close-sm" @click="error = ''"></button>
              </div>
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label class="form-label fw-semibold small">Логин</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light"><i class="fas fa-user text-muted"></i></span>
                    <input type="text" class="form-control" v-model="form.username" placeholder="Введите логин" :disabled="loading" required>
                  </div>
                </div>
                <div class="mb-4">
                  <label class="form-label fw-semibold small">Пароль</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light"><i class="fas fa-lock text-muted"></i></span>
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="form.password" placeholder="Введите пароль" :disabled="loading" required>
                    <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary btn-lg w-100 rounded-3" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="fas fa-sign-in-alt me-2"></i>
                  {{ loading ? 'Вход...' : 'Войти' }}
                </button>
              </form>
              <hr class="my-4">
              <div class="text-center">
                <p class="text-muted small mb-2">Демо-аккаунты:</p>
                <div class="d-flex justify-content-center gap-2">
                  <button class="btn btn-sm btn-outline-danger" @click="fillDemo('admin')"><i class="fas fa-crown me-1"></i>Admin</button>
                  <button class="btn btn-sm btn-outline-warning" @click="fillDemo('manager')"><i class="fas fa-briefcase me-1"></i>Manager</button>
                  <button class="btn btn-sm btn-outline-info" @click="fillDemo('user')"><i class="fas fa-user me-1"></i>User</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '../store';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: { username: '', password: '' },
      error: '',
      loading: false,
      showPassword: false
    };
  },
  methods: {
    async handleLogin() {
      const store = useStore();
      this.error = '';
      this.loading = true;
      const result = await store.actions.login(this.form);
      if (result.success) {
        this.$router.push(this.$route.query.redirect || '/');
      } else {
        this.error = result.error;
      }
      this.loading = false;
    },
    fillDemo(role) {
      const demos = {
        admin: { username: 'admin', password: 'admin123' },
        manager: { username: 'manager', password: 'manager123' },
        user: { username: 'user', password: 'user123' }
      };
      this.form = { ...demos[role] };
    }
  }
}
</script>
