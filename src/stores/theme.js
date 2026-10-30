import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // State
  const theme = ref(localStorage.getItem('app_theme') || 'light');
  const colorScheme = ref(localStorage.getItem('app_color_scheme') || 'primary');

  // Getters
  const currentTheme = computed(() => {
    if (theme.value === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme.value;
  });

  // Actions
  function setTheme(newTheme) {
    theme.value = newTheme;
    localStorage.setItem('app_theme', newTheme);
    applyTheme();
  }

  function setColorScheme(scheme) {
    colorScheme.value = scheme;
    localStorage.setItem('app_color_scheme', scheme);
    applyTheme();
  }

  function applyTheme() {
    const html = document.documentElement;
    const current = currentTheme.value;
    
    // Применяем Bootstrap тему через data-bs-theme
    html.setAttribute('data-bs-theme', current);
    
    // Применяем цветовую схему к navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const colorClasses = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-dark', 'bg-secondary'];
      colorClasses.forEach(cls => navbar.classList.remove(cls));
      navbar.classList.add(`bg-${colorScheme.value}`);
    }
  }

  function init() {
    applyTheme();
    
    // Слушаем изменения системной темы
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'auto') {
        applyTheme();
      }
    });
  }

  return {
    // State
    theme,
    colorScheme,
    // Getters
    currentTheme,
    // Actions
    setTheme,
    setColorScheme,
    applyTheme,
    init
  };
});
