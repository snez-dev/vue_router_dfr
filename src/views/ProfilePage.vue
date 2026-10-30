<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4">
      <i class="fas fa-user-circle me-2 text-primary"></i>Профиль
    </h2>

    <div class="row">
      <!-- Sidebar с навигацией -->
      <div class="col-md-3 mb-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-0">
            <div class="text-center p-4 border-bottom">
              <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:80px;height:80px">
                <i class="fas fa-user fa-2x text-primary"></i>
              </div>
              <h5 class="mb-1">{{ user.full_name }}</h5>
              <p class="text-muted small mb-2">{{ user.email }}</p>
              <span class="badge bg-info">{{ user.role }}</span>
            </div>
            <nav class="nav flex-column p-2">
              <router-link 
                :to="{ name: 'ProfileOverview' }" 
                class="nav-link"
                active-class="active"
              >
                <i class="fas fa-home me-2"></i>Обзор
              </router-link>
              <router-link 
                :to="{ name: 'ProfileSettings' }" 
                class="nav-link"
                active-class="active"
              >
                <i class="fas fa-cog me-2"></i>Настройки
              </router-link>
              <router-link 
                :to="{ name: 'ProfileActivity' }" 
                class="nav-link"
                active-class="active"
              >
                <i class="fas fa-history me-2"></i>Активность
              </router-link>
              <router-link 
                :to="{ name: 'ProfileSecurity' }" 
                class="nav-link"
                active-class="active"
              >
                <i class="fas fa-shield-alt me-2"></i>Безопасность
              </router-link>
            </nav>
          </div>
        </div>
      </div>

      <!-- Content area с router-view для дочерних маршрутов -->
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '../store';

export default {
  name: 'ProfilePage',
  computed: {
    user() {
      const store = useStore();
      return store.getters.currentUser.value || {};
    }
  }
}
</script>

<style scoped>
.nav-link {
  color: var(--bs-body-color);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.25rem;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: var(--bs-tertiary-bg);
}

.nav-link.active {
  background-color: var(--bs-primary);
  color: white;
}
</style>
