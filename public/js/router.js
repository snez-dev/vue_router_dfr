/**
 * Vue Router конфигурация + все компоненты-страницы
 */
(function () {
  const store = window.AppStore;

  // ==================== СТРАНИЦЫ ====================

  // --- Страница авторизации ---
  const LoginPage = {
    template: `
      <div class="min-vh-100 d-flex align-items-center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
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
    `,
    data() { return { form: { username: '', password: '' }, error: '', loading: false, showPassword: false }; },
    methods: {
      async handleLogin() {
        this.error = '';
        this.loading = true;
        const result = await store.actions.login(this.form);
        if (result.success) { this.$router.push(this.$route.query.redirect || '/'); }
        else { this.error = result.error; }
        this.loading = false;
      },
      fillDemo(role) {
        const demos = { admin: { username: 'admin', password: 'admin123' }, manager: { username: 'manager', password: 'manager123' }, user: { username: 'user', password: 'user123' } };
        this.form = { ...demos[role] };
      }
    }
  };

  // --- Главная страница ---
  const HomePage = {
    template: `
      <div class="container py-5">
        <div class="row mb-4">
          <div class="col-12">
            <h1 class="display-6 fw-bold"><i class="fas fa-home text-primary me-3"></i>Добро пожаловать, {{ user.full_name }}!</h1>
            <p class="lead text-muted">Панель управления с системой контроля доступа на Vue.js + Django DRF</p>
          </div>
        </div>
        <div class="row g-4 mb-5">
          <div class="col-md-3 col-6" v-for="stat in stats" :key="stat.label">
            <div class="card border-0 shadow-sm card-hover h-100">
              <div class="card-body text-center p-4">
                <div :class="'bg-' + stat.color + ' bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3'" style="width:55px;height:55px">
                  <i :class="'fas fa-' + stat.icon + ' fa-lg text-' + stat.color"></i>
                </div>
                <h3 class="fw-bold mb-1">{{ stat.value }}</h3>
                <p class="text-muted small mb-0">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-key me-2 text-primary"></i>Ваши права доступа</h5></div>
              <div class="card-body">
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="perm in permissions" :key="perm" class="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                    <i class="fas fa-check-circle me-1"></i>{{ perm }}
                  </span>
                  <span v-if="permissions.length === 0" class="text-muted">Нет назначенных прав</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-info-circle me-2 text-info"></i>О системе</h5></div>
              <div class="card-body">
                <table class="table table-borderless table-sm mb-0">
                  <tr><td class="text-muted">Frontend:</td><td><strong>Vue.js 3</strong></td></tr>
                  <tr><td class="text-muted">Backend:</td><td><strong>Django REST Framework</strong></td></tr>
                  <tr><td class="text-muted">CSS:</td><td><strong>Bootstrap 5.3</strong></td></tr>
                  <tr><td class="text-muted">Router:</td><td><strong>Vue Router 4</strong></td></tr>
                  <tr><td class="text-muted">State:</td><td><strong>Custom Store</strong></td></tr>
                  <tr><td class="text-muted">Роль:</td><td><span class="badge bg-info">{{ user.role }}</span></td></tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-4 mt-3">
          <div class="col-12">
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-bolt me-2 text-warning"></i>Быстрые действия</h5></div>
              <div class="card-body">
                <div class="d-flex flex-wrap gap-2">
                  <router-link to="/dashboard" class="btn btn-outline-primary"><i class="fas fa-tachometer-alt me-1"></i>Панель</router-link>
                  <router-link to="/users" v-permission="'users.view'" class="btn btn-outline-success"><i class="fas fa-users me-1"></i>Пользователи</router-link>
                  <router-link to="/reports" v-permission="'reports.view'" class="btn btn-outline-warning"><i class="fas fa-chart-bar me-1"></i>Отчёты</router-link>
                  <router-link to="/settings" v-permission="'settings.view'" class="btn btn-outline-secondary"><i class="fas fa-cog me-1"></i>Настройки</router-link>
                  <router-link to="/example" class="btn btn-outline-info"><i class="fas fa-code me-1"></i>Пример директив</router-link>
                  <router-link to="/403" class="btn btn-outline-danger"><i class="fas fa-lock me-1"></i>Тест 403</router-link>
                  <router-link to="/500" class="btn btn-outline-dark"><i class="fas fa-server me-1"></i>Тест 500</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        stats: [
          { value: '24', label: 'Пользователей', icon: 'users', color: 'primary' },
          { value: '156', label: 'Задач', icon: 'chart-line', color: 'success' },
          { value: '12', label: 'В ожидании', icon: 'clock', color: 'warning' },
          { value: '3', label: 'Ошибки', icon: 'exclamation-triangle', color: 'danger' },
        ]
      };
    },
    computed: {
      user() { return store.getters.currentUser.value || {}; },
      permissions() { return store.getters.userPermissions.value || []; }
    }
  };

  // --- Dashboard ---
  const DashboardPage = {
    template: `
      <div class="container py-5">
        <h2 class="fw-bold mb-4"><i class="fas fa-tachometer-alt me-2 text-primary"></i>Панель управления</h2>
        <div class="row g-4">
          <div class="col-md-8">
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-white"><h5 class="mb-0">Последняя активность</h5></div>
              <div class="card-body">
                <div class="list-group list-group-flush">
                  <div class="list-group-item d-flex align-items-center px-0 border-0 mb-2" v-for="(item, idx) in activities" :key="idx">
                    <div :class="'bg-' + item.color + ' bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0'" style="width:40px;height:40px">
                      <i :class="'fas fa-' + item.icon + ' text-' + item.color"></i>
                    </div>
                    <div class="flex-grow-1">
                      <p class="mb-0 fw-semibold small">{{ item.title }}</p>
                      <small class="text-muted">{{ item.time }}</small>
                    </div>
                    <span :class="'badge bg-' + item.statusColor">{{ item.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-body text-center">
                <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width:70px;height:70px">
                  <i class="fas fa-user fa-2x text-primary"></i>
                </div>
                <h5 class="mb-1">{{ user.full_name }}</h5>
                <p class="text-muted small mb-2">{{ user.email }}</p>
                <span class="badge bg-info fs-6">{{ user.role }}</span>
              </div>
            </div>
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-white"><h5 class="mb-0">Прогресс</h5></div>
              <div class="card-body">
                <div class="d-flex justify-content-between mb-1 small"><span>Задачи</span><strong>12/15</strong></div>
                <div class="progress mb-3" style="height:6px"><div class="progress-bar bg-success" style="width:80%"></div></div>
                <div class="d-flex justify-content-between mb-1 small"><span>Проекты</span><strong>3/5</strong></div>
                <div class="progress" style="height:6px"><div class="progress-bar bg-primary" style="width:60%"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        activities: [
          { title: 'Новый пользователь зарегистрирован', time: '5 мин назад', icon: 'user-plus', color: 'success', status: 'Новый', statusColor: 'success' },
          { title: 'Отчёт за Q1 сформирован', time: '1 час назад', icon: 'file-alt', color: 'primary', status: 'Готово', statusColor: 'primary' },
          { title: 'Обновление безопасности', time: '3 часа назад', icon: 'shield-alt', color: 'warning', status: 'Важно', statusColor: 'warning' },
          { title: 'Резервная копия создана', time: '5 часов назад', icon: 'database', color: 'info', status: 'OK', statusColor: 'info' },
          { title: 'Ошибка при импорте данных', time: '1 день назад', icon: 'exclamation-circle', color: 'danger', status: 'Ошибка', statusColor: 'danger' },
        ]
      };
    },
    computed: { user() { return store.getters.currentUser.value || {}; } }
  };

  // --- Пользователи ---
  const UsersPage = {
    template: `
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
                    <td><i class="fas fa-user me-2 text-muted"></i>{{ u.username }}</td>
                    <td>{{ u.email }}</td>
                    <td><span class="badge" :class="roleBadge(u.role)">{{ u.role }}</span></td>
                    <td><span class="badge" :class="u.is_active ? 'bg-success' : 'bg-secondary'">{{ u.is_active ? 'Активен' : 'Неактивен' }}</span></td>
                    <td v-permission="'users.edit'">
                      <button class="btn btn-sm btn-outline-primary me-1" v-permission="'users.edit'"><i class="fas fa-edit"></i></button>
                      <button class="btn btn-sm btn-outline-danger" v-permission="'users.delete'"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `,
    data() { return { users: [] }; },
    async mounted() { this.users = await store.mockApi.getUsers(); },
    methods: { roleBadge(role) { return { admin: 'bg-danger', manager: 'bg-warning text-dark', user: 'bg-info', guest: 'bg-secondary' }[role] || 'bg-secondary'; } }
  };

  // --- Отчёты ---
  const ReportsPage = {
    template: `
      <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold mb-0"><i class="fas fa-chart-bar me-2 text-primary"></i>Отчёты</h2>
          <button class="btn btn-primary" v-permission="'reports.create'"><i class="fas fa-plus me-1"></i>Создать</button>
        </div>
        <div class="row g-4">
          <div class="col-md-4" v-for="report in reports" :key="report.id">
            <div class="card border-0 shadow-sm card-hover h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <i class="fas fa-file-alt fa-2x text-primary"></i>
                  <span class="badge" :class="statusBadge(report.status)">{{ statusText(report.status) }}</span>
                </div>
                <h5>{{ report.title }}</h5>
                <p class="text-muted small"><i class="fas fa-calendar me-1"></i>{{ report.date }}</p>
              </div>
              <div class="card-footer bg-white border-0 pt-0">
                <button class="btn btn-sm btn-outline-primary me-1" v-permission="'reports.view'"><i class="fas fa-eye me-1"></i>Просмотр</button>
                <button class="btn btn-sm btn-outline-success" v-permission="'reports.download'"><i class="fas fa-download me-1"></i>Скачать</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    data() { return { reports: [] }; },
    async mounted() { this.reports = await store.mockApi.getReports(); },
    methods: {
      statusBadge(s) { return { completed: 'bg-success', in_progress: 'bg-warning text-dark', pending: 'bg-secondary' }[s]; },
      statusText(s) { return { completed: 'Завершён', in_progress: 'В процессе', pending: 'Ожидание' }[s]; }
    }
  };

  // --- Настройки ---
  const SettingsPage = {
    template: `
      <div class="container py-5">
        <h2 class="fw-bold mb-4"><i class="fas fa-cog me-2 text-primary"></i>Настройки</h2>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-user-edit me-2"></i>Профиль</h5></div>
              <div class="card-body">
                <div class="mb-3"><label class="form-label small">Имя</label><input type="text" class="form-control" :value="user.full_name"></div>
                <div class="mb-3"><label class="form-label small">Email</label><input type="email" class="form-control" :value="user.email"></div>
                <button class="btn btn-primary" v-permission="'settings.edit'"><i class="fas fa-save me-1"></i>Сохранить</button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-white"><h5 class="mb-0"><i class="fas fa-bell me-2"></i>Уведомления</h5></div>
              <div class="card-body">
                <div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">Email уведомления</label></div>
                <div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox"><label class="form-check-label">Push уведомления</label></div>
                <div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" checked><label class="form-check-label">Безопасность</label></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    computed: { user() { return store.getters.currentUser.value || {}; } }
  };

  // --- Пример директив ---
  const ExamplePage = {
    template: `
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
      </div>
    `,
    computed: {
      user() { return store.getters.currentUser.value || {}; },
      permissions() { return store.getters.userPermissions.value || []; }
    }
  };

  // --- 404 ---
  const NotFoundPage = {
    template: `
      <div class="min-vh-100 d-flex align-items-center bg-light">
        <div class="container text-center">
          <i class="fas fa-exclamation-triangle fa-5x text-warning mb-4"></i>
          <h1 class="display-1 fw-bold text-muted">404</h1>
          <h2 class="mb-3">Страница не найдена</h2>
          <p class="lead text-muted mb-4">Запрашиваемая страница не существует.</p>
          <div class="d-flex justify-content-center gap-3">
            <router-link to="/" class="btn btn-primary btn-lg"><i class="fas fa-home me-2"></i>На главную</router-link>
            <button class="btn btn-outline-secondary btn-lg" @click="$router.back()"><i class="fas fa-arrow-left me-2"></i>Назад</button>
          </div>
        </div>
      </div>
    `
  };

  // --- 403 ---
  const ForbiddenPage = {
    template: `
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
    `
  };

  // --- 500 ---
  const ServerErrorPage = {
    template: `
      <div class="min-vh-100 d-flex align-items-center bg-light">
        <div class="container text-center">
          <i class="fas fa-server fa-5x text-danger mb-4"></i>
          <h1 class="display-1 fw-bold text-muted">500</h1>
          <h2 class="mb-3">Ошибка сервера</h2>
          <p class="lead text-muted mb-4">Произошла внутренняя ошибка сервера. Попробуйте позже.</p>
          <div class="d-flex justify-content-center gap-3">
            <router-link to="/" class="btn btn-primary btn-lg"><i class="fas fa-home me-2"></i>На главную</router-link>
            <button class="btn btn-outline-secondary btn-lg" onclick="location.reload()"><i class="fas fa-redo me-2"></i>Обновить</button>
          </div>
        </div>
      </div>
    `
  };

  // ==================== ROUTER ====================
  const routes = [
    { path: '/login', name: 'Login', component: LoginPage, meta: { guest: true } },
    { path: '/', name: 'Home', component: HomePage, meta: { requiresAuth: true } },
    { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true } },
    { path: '/users', name: 'Users', component: UsersPage, meta: { requiresAuth: true, permissions: ['users.view'] } },
    { path: '/reports', name: 'Reports', component: ReportsPage, meta: { requiresAuth: true, permissions: ['reports.view'] } },
    { path: '/settings', name: 'Settings', component: SettingsPage, meta: { requiresAuth: true, permissions: ['settings.view'] } },
    { path: '/example', name: 'Example', component: ExamplePage, meta: { requiresAuth: true } },
    { path: '/403', name: 'Forbidden', component: ForbiddenPage },
    { path: '/500', name: 'ServerError', component: ServerErrorPage },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
  ];

  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  });

  // Route Guards
  router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated.value;
    if (to.meta.requiresAuth && !isAuthenticated) return next({ name: 'Login', query: { redirect: to.fullPath } });
    if (to.meta.guest && isAuthenticated) return next({ name: 'Home' });
    if (to.meta.permissions && to.meta.permissions.length > 0) {
      if (!store.actions.hasAnyPermission(to.meta.permissions)) return next({ name: 'Forbidden' });
    }
    next();
  });

  window.AppRouter = router;
})();
