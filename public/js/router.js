/**
 * Vue Router конфигурация
 * Компоненты-страницы (логика без HTML — шаблоны в index.html)
 */
(function () {
  const store = window.AppStore;

  // ==================== КОМПОНЕНТЫ (только логика) ====================

  // --- Страница авторизации ---
  const LoginPage = {
    template: '#template-login',
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
          admin:   { username: 'admin',   password: 'admin123' },
          manager: { username: 'manager', password: 'manager123' },
          user:    { username: 'user',    password: 'user123' }
        };
        this.form = { ...demos[role] };
      }
    }
  };

  // --- Главная страница ---
  const HomePage = {
    template: '#template-home',
    data() {
      return {
        stats: [
          { value: '24',  label: 'Пользователей', icon: 'users',                 color: 'primary' },
          { value: '156', label: 'Задач',          icon: 'chart-line',            color: 'success' },
          { value: '12',  label: 'В ожидании',     icon: 'clock',                 color: 'warning' },
          { value: '3',   label: 'Ошибки',         icon: 'exclamation-triangle',  color: 'danger' },
        ]
      };
    },
    computed: {
      user()        { return store.getters.currentUser.value || {}; },
      permissions() { return store.getters.userPermissions.value || []; }
    }
  };

  // --- Панель управления ---
  const DashboardPage = {
    template: '#template-dashboard',
    data() {
      return {
        activities: [
          { title: 'Новый пользователь зарегистрирован', time: '5 мин назад',  icon: 'user-plus',             color: 'success', status: 'Новый',   statusColor: 'success' },
          { title: 'Отчёт за Q1 сформирован',            time: '1 час назад',  icon: 'file-alt',              color: 'primary', status: 'Готово',  statusColor: 'primary' },
          { title: 'Обновление безопасности',            time: '3 часа назад', icon: 'shield-alt',            color: 'warning', status: 'Важно',   statusColor: 'warning' },
          { title: 'Резервная копия создана',            time: '5 часов назад',icon: 'database',              color: 'info',    status: 'OK',      statusColor: 'info' },
          { title: 'Ошибка при импорте данных',          time: '1 день назад', icon: 'exclamation-circle',    color: 'danger',  status: 'Ошибка', statusColor: 'danger' },
        ]
      };
    },
    computed: {
      user() { return store.getters.currentUser.value || {}; }
    }
  };

  // --- Пользователи ---
  const UsersPage = {
    template: '#template-users',
    data() {
      return { users: [] };
    },
    async mounted() {
      this.users = await store.mockApi.getUsers();
    },
    methods: {
      roleBadge(role) {
        const map = { admin: 'bg-danger', manager: 'bg-warning text-dark', user: 'bg-info', guest: 'bg-secondary' };
        return map[role] || 'bg-secondary';
      }
    }
  };

  // --- Отчёты ---
  const ReportsPage = {
    template: '#template-reports',
    data() {
      return { reports: [] };
    },
    async mounted() {
      this.reports = await store.mockApi.getReports();
    },
    methods: {
      statusBadge(s) {
        return { completed: 'bg-success', in_progress: 'bg-warning text-dark', pending: 'bg-secondary' }[s];
      },
      statusText(s) {
        return { completed: 'Завершён', in_progress: 'В процессе', pending: 'Ожидание' }[s];
      }
    }
  };

  // --- Настройки ---
  const SettingsPage = {
    template: '#template-settings',
    computed: {
      user() { return store.getters.currentUser.value || {}; }
    }
  };

  // --- Пример директив ---
  const ExamplePage = {
    template: '#template-example',
    computed: {
      user()        { return store.getters.currentUser.value || {}; },
      permissions() { return store.getters.userPermissions.value || []; }
    }
  };

  // --- 404 ---
  const NotFoundPage = {
    template: '#template-404'
  };

  // --- 403 ---
  const ForbiddenPage = {
    template: '#template-403'
  };

  // --- 500 ---
  const ServerErrorPage = {
    template: '#template-500'
  };

  // ==================== ROUTER ====================

  const routes = [
    { path: '/login',     name: 'Login',       component: LoginPage,      meta: { guest: true } },
    { path: '/',          name: 'Home',         component: HomePage,       meta: { requiresAuth: true } },
    { path: '/dashboard', name: 'Dashboard',    component: DashboardPage,  meta: { requiresAuth: true } },
    { path: '/users',     name: 'Users',        component: UsersPage,      meta: { requiresAuth: true, permissions: ['users.view'] } },
    { path: '/reports',   name: 'Reports',      component: ReportsPage,    meta: { requiresAuth: true, permissions: ['reports.view'] } },
    { path: '/settings',  name: 'Settings',     component: SettingsPage,   meta: { requiresAuth: true, permissions: ['settings.view'] } },
    { path: '/example',   name: 'Example',      component: ExamplePage,    meta: { requiresAuth: true } },
    { path: '/403',       name: 'Forbidden',    component: ForbiddenPage },
    { path: '/500',       name: 'ServerError',  component: ServerErrorPage },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
  ];

  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  });

  // ==================== ROUTE GUARDS ====================

  router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated.value;

    // Требуется авторизация
    if (to.meta.requiresAuth && !isAuthenticated) {
      return next({ name: 'Login', query: { redirect: to.fullPath } });
    }

    // Только для гостей (login)
    if (to.meta.guest && isAuthenticated) {
      return next({ name: 'Home' });
    }

    // Проверка прав доступа
    if (to.meta.permissions && to.meta.permissions.length > 0) {
      if (!store.actions.hasAnyPermission(to.meta.permissions)) {
        return next({ name: 'Forbidden' });
      }
    }

    next();
  });

  window.AppRouter = router;
})();
