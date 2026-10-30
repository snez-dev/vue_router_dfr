<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4"><i class="fas fa-code me-2 text-primary"></i>Пример: Управление доступом</h2>
    <div class="alert alert-info">
      <i class="fas fa-info-circle me-2"></i>
      <strong>Роль:</strong> {{ user.role }} | <strong>Права:</strong> {{ permissions.join(', ') || 'нет' }}
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-header bg-white"><h5 class="mb-0">1. <code>v-permission</code> — строка (одно право)</h5></div>
      <div class="card-body">
        <p class="text-muted small">Показывает/скрывает элемент в зависимости от наличия права</p>
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary" v-permission="'users.view'"><i class="fas fa-eye me-1"></i>users.view</button>
          <button class="btn btn-danger" v-permission="'users.delete'"><i class="fas fa-trash me-1"></i>users.delete</button>
          <button class="btn btn-success" v-permission="'reports.create'"><i class="fas fa-plus me-1"></i>reports.create</button>
          <button class="btn btn-warning" v-permission="'settings.view'"><i class="fas fa-cog me-1"></i>settings.view</button>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-header bg-white"><h5 class="mb-0">2. <code>v-permission</code> — массив (ЛЮБОЕ из)</h5></div>
      <div class="card-body">
        <p class="text-muted small">Показывает если есть хотя бы одно из перечисленных прав</p>
        <button class="btn btn-info" v-permission="['reports.view', 'reports.create', 'reports.delete']">
          <i class="fas fa-chart-bar me-1"></i>Любое из: reports.view, reports.create, reports.delete
        </button>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-header bg-white"><h5 class="mb-0">3. <code>v-permission</code> — объект { all: [...] } (ВСЕ права)</h5></div>
      <div class="card-body">
        <p class="text-muted small">Показывает только если есть ВСЕ перечисленные права</p>
        <button class="btn btn-secondary" v-permission="{ all: ['users.view', 'users.edit'] }">
          <i class="fas fa-users-cog me-1"></i>Все: users.view И users.edit
        </button>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-header bg-white"><h5 class="mb-0">4. <code>v-permission-disable</code> — блокировка</h5></div>
      <div class="card-body">
        <p class="text-muted small">Блокирует элемент (disabled) если нет прав</p>
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <button class="btn btn-primary" v-permission-disable="'users.edit'"><i class="fas fa-edit me-1"></i>Редактировать (users.edit)</button>
          <button class="btn btn-danger" v-permission-disable="'users.delete'"><i class="fas fa-trash me-1"></i>Удалить (users.delete)</button>
          <input type="text" class="form-control w-auto" placeholder="Поле" v-permission-disable="'settings.edit'">
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4">
      <div class="card-header bg-white"><h5 class="mb-0">5. <code>$can()</code> — метод в шаблоне</h5></div>
      <div class="card-body">
        <p class="text-muted small">Глобальный метод для условного рендеринга</p>
        <div class="d-flex flex-wrap gap-2">
          <span v-if="$can('users.view')" class="badge bg-success fs-6"><i class="fas fa-check me-1"></i>Есть users.view</span>
          <span v-if="!$can('users.view')" class="badge bg-danger fs-6"><i class="fas fa-times me-1"></i>Нет users.view</span>
          <span v-if="$can('settings.view')" class="badge bg-success fs-6"><i class="fas fa-check me-1"></i>Есть settings.view</span>
          <span v-if="!$can('settings.view')" class="badge bg-danger fs-6"><i class="fas fa-times me-1"></i>Нет settings.view</span>
          <span v-if="$canAny(['reports.view', 'reports.create'])" class="badge bg-success fs-6"><i class="fas fa-check me-1"></i>$canAny reports</span>
          <span v-if="!$canAny(['reports.view', 'reports.create'])" class="badge bg-danger fs-6"><i class="fas fa-times me-1"></i>Нет reports</span>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white"><h5 class="mb-0">6. Таблица с действиями (комбинированный пример)</h5></div>
      <div class="card-body">
        <table class="table table-hover">
          <thead class="table-light"><tr><th>Элемент</th><th>Директива</th><th>Действие</th></tr></thead>
          <tbody>
            <tr><td>Просмотр</td><td><code>v-permission="'users.view'"</code></td><td><button class="btn btn-sm btn-outline-primary" v-permission="'users.view'"><i class="fas fa-eye me-1"></i>Просмотр</button></td></tr>
            <tr><td>Редактирование</td><td><code>v-permission="'users.edit'"</code></td><td><button class="btn btn-sm btn-outline-warning" v-permission="'users.edit'"><i class="fas fa-edit me-1"></i>Редактировать</button></td></tr>
            <tr><td>Удаление</td><td><code>v-permission="'users.delete'"</code></td><td><button class="btn btn-sm btn-outline-danger" v-permission="'users.delete'"><i class="fas fa-trash me-1"></i>Удалить</button></td></tr>
            <tr><td>Экспорт</td><td><code>v-permission-disable="'reports.download'"</code></td><td><button class="btn btn-sm btn-outline-success" v-permission-disable="'reports.download'"><i class="fas fa-download me-1"></i>Экспорт</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Vue Router примеры -->
    <div class="card border-0 shadow-sm mt-4">
      <div class="card-header bg-white">
        <h5 class="mb-0">7. Vue Router — динамические параметры</h5>
      </div>
      <div class="card-body">
        <p class="text-muted small">Пример маршрута с динамическим параметром ID: <code>/users/:id</code></p>
        <div class="d-flex flex-wrap gap-2">
          <router-link to="/users/1" class="btn btn-outline-primary">
            <i class="fas fa-user me-1"></i>Пользователь #1
          </router-link>
          <router-link to="/users/2" class="btn btn-outline-primary">
            <i class="fas fa-user me-1"></i>Пользователь #2
          </router-link>
          <router-link to="/users/3" class="btn btn-outline-primary">
            <i class="fas fa-user me-1"></i>Пользователь #3
          </router-link>
          <router-link to="/users/999" class="btn btn-outline-danger">
            <i class="fas fa-user-slash me-1"></i>Пользователь #999 (не существует)
          </router-link>
        </div>
        <div class="alert alert-info mt-3 mb-0">
          <i class="fas fa-info-circle me-2"></i>
          Текущий маршрут: <code>{{ $route.fullPath }}</code>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm mt-4">
      <div class="card-header bg-white">
        <h5 class="mb-0">8. Vue Router — вложенные маршруты</h5>
      </div>
      <div class="card-body">
        <p class="text-muted small">Пример вложенных маршрутов: <code>/profile</code> с дочерними маршрутами</p>
        <div class="d-flex flex-wrap gap-2">
          <router-link to="/profile" class="btn btn-outline-info">
            <i class="fas fa-home me-1"></i>Обзор
          </router-link>
          <router-link to="/profile/settings" class="btn btn-outline-info">
            <i class="fas fa-cog me-1"></i>Настройки
          </router-link>
          <router-link to="/profile/activity" class="btn btn-outline-info">
            <i class="fas fa-history me-1"></i>Активность
          </router-link>
          <router-link to="/profile/security" class="btn btn-outline-info">
            <i class="fas fa-shield-alt me-1"></i>Безопасность
          </router-link>
        </div>
        <div class="alert alert-info mt-3 mb-0">
          <i class="fas fa-info-circle me-2"></i>
          Вложенные маршруты позволяют создавать структуру с общим layout (sidebar) и разным контентом
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  name: 'ExamplePage',
  computed: {
    user() {
      const authStore = useAuthStore();
      return authStore.currentUser;
    },
    permissions() {
      const authStore = useAuthStore();
      return authStore.userPermissions;
    }
  }
}
</script>
