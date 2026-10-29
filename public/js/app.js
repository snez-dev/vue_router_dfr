/**
 * Инициализация Vue.js приложения
 */
(function () {
  const { createApp } = Vue;

  const App = {
    data() { return {}; },
    computed: {
      isAuthenticated() { return window.AppStore.getters.isAuthenticated.value; },
      currentUser() { return window.AppStore.getters.currentUser.value || {}; }
    },
    methods: {
      logout() {
        window.AppStore.actions.logout();
        this.$router.push('/login');
      },
      initDropdowns() {
        this.$nextTick(() => {
          const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
          dropdowns.forEach(el => {
            if (!el._bsDropdown) {
              try { el._bsDropdown = new bootstrap.Dropdown(el); } catch(e) {}
            }
          });
        });
      }
    },
    mounted() { this.initDropdowns(); },
    updated() { this.initDropdowns(); }
  };

  const app = createApp(App);
  app.use(window.AppRouter);
  app.use(window.PermissionPlugin, { store: window.AppStore });
  app.mount('#app');

  window.__app = app;
})();
