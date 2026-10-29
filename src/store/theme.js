import { reactive, computed } from 'vue';

// Состояние темы
const state = reactive({
  theme: localStorage.getItem('app_theme') || 'light', // light, dark, auto
  colorScheme: localStorage.getItem('app_color_scheme') || 'primary', // primary, success, danger, warning, purple, teal
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
    
    // Применяем тему
    html.setAttribute('data-bs-theme', currentTheme);
    html.setAttribute('data-theme', currentTheme);
    
    // Применяем цветовую схему
    html.setAttribute('data-color-scheme', state.colorScheme);
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
