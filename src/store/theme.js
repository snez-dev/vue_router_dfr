import { reactive, computed } from 'vue';

// Состояние темы
const state = reactive({
  theme: localStorage.getItem('app_theme') || 'light', // light, dark, auto
  colorScheme: localStorage.getItem('app_color_scheme') || 'primary', // primary, success, danger, warning, info, dark
});

// Геттеры
const getters = {
  currentTheme: computed(() => {
    if (state.theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return state.theme;
  }),
  theme: computed(() => state.theme),
  colorScheme: computed(() => state.colorScheme),
};

// Действия
const actions = {
  setTheme(theme) {
    state.theme = theme;
    localStorage.setItem('app_theme', theme);
    actions.applyTheme();
  },
  setColorScheme(scheme) {
    state.colorScheme = scheme;
    localStorage.setItem('app_color_scheme', scheme);
    actions.applyTheme();
  },
  applyTheme() {
    const html = document.documentElement;
    const currentTheme = getters.currentTheme.value;
    
    // Применяем Bootstrap тему через data-bs-theme
    html.setAttribute('data-bs-theme', currentTheme);
    
    // Применяем цветовую схему к navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      // Убираем все Bootstrap цветовые классы
      const colorClasses = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-dark', 'bg-secondary'];
      colorClasses.forEach(cls => navbar.classList.remove(cls));
      
      // Добавляем выбранный цвет
      navbar.classList.add(`bg-${state.colorScheme}`);
    }
  },
  init() {
    // Применяем тему при инициализации
    actions.applyTheme();
    
    // Слушаем изменения системной темы
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (state.theme === 'auto') {
        actions.applyTheme();
      }
    });
  }
};

export const useThemeStore = () => ({
  state,
  getters,
  actions,
});
