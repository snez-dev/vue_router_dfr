<template>
  <div class="theme-switcher">
    <button class="theme-switcher-btn" @click="togglePanel">
      <i :class="themeIcon" class="fs-4"></i>
    </button>
    
    <div class="theme-switcher-panel" :class="{ show: panelOpen }">
      <h6 class="mb-3"><i class="fas fa-palette me-2"></i>Тема оформления</h6>
      
      <!-- Theme selection -->
      <div class="mb-3">
        <small class="text-muted d-block mb-2">Режим</small>
        <div class="theme-option" :class="{ active: theme === 'light' }" @click="setTheme('light')">
          <i class="fas fa-sun me-2 text-warning"></i>
          <span>Светлая</span>
        </div>
        <div class="theme-option" :class="{ active: theme === 'dark' }" @click="setTheme('dark')">
          <i class="fas fa-moon me-2 text-info"></i>
          <span>Тёмная</span>
        </div>
        <div class="theme-option" :class="{ active: theme === 'auto' }" @click="setTheme('auto')">
          <i class="fas fa-desktop me-2 text-secondary"></i>
          <span>Автоматически</span>
        </div>
      </div>
      
      <!-- Color scheme selection -->
      <div>
        <small class="text-muted d-block mb-2">Цветовая схема</small>
        <div class="d-flex flex-wrap">
          <div 
            v-for="scheme in colorSchemes" 
            :key="scheme.value"
            class="color-scheme-option"
            :class="{ active: colorScheme === scheme.value }"
            :style="{ backgroundColor: scheme.color }"
            :title="scheme.label"
            @click="setColorScheme(scheme.value)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useThemeStore } from '../store/theme';

export default {
  name: 'ThemeSwitcher',
  data() {
    return {
      panelOpen: false,
      colorSchemes: [
        { value: 'primary', color: '#0d6efd', label: 'Синий' },
        { value: 'success', color: '#198754', label: 'Зелёный' },
        { value: 'danger', color: '#dc3545', label: 'Красный' },
        { value: 'warning', color: '#ffc107', label: 'Жёлтый' },
        { value: 'purple', color: '#6f42c1', label: 'Фиолетовый' },
        { value: 'teal', color: '#20c997', label: 'Бирюзовый' },
      ]
    };
  },
  computed: {
    theme() {
      const store = useThemeStore();
      return store.getters.theme.value;
    },
    colorScheme() {
      const store = useThemeStore();
      return store.getters.colorScheme.value;
    },
    themeIcon() {
      const currentTheme = useThemeStore().getters.currentTheme.value;
      return currentTheme === 'dark' ? 'fas fa-moon text-info' : 'fas fa-sun text-warning';
    }
  },
  methods: {
    setTheme(theme) {
      const store = useThemeStore();
      store.actions.setTheme(theme);
    },
    setColorScheme(scheme) {
      const store = useThemeStore();
      store.actions.setColorScheme(scheme);
    },
    togglePanel() {
      this.panelOpen = !this.panelOpen;
    },
    closePanel(event) {
      if (!this.$el.contains(event.target)) {
        this.panelOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.closePanel);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closePanel);
  }
}
</script>
