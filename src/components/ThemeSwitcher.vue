<template>
  <div class="theme-switcher">
    <button class="btn btn-primary rounded-circle shadow-lg theme-switcher-btn" @click="togglePanel">
      <i :class="themeIcon"></i>
    </button>
    
    <div class="card shadow-lg theme-switcher-panel" :class="{ show: panelOpen }">
      <div class="card-body p-3">
        <h6 class="card-title mb-3">
          <i class="fas fa-palette me-2"></i>Оформление
        </h6>
        
        <!-- Theme selection -->
        <div class="mb-3">
          <small class="text-muted d-block mb-2">Тема</small>
          <div class="btn-group w-100" role="group">
            <button 
              type="button" 
              class="btn btn-sm"
              :class="theme === 'light' ? 'btn-primary' : 'btn-outline-secondary'"
              @click="setTheme('light')"
            >
              <i class="fas fa-sun me-1"></i>Светлая
            </button>
            <button 
              type="button" 
              class="btn btn-sm"
              :class="theme === 'dark' ? 'btn-primary' : 'btn-outline-secondary'"
              @click="setTheme('dark')"
            >
              <i class="fas fa-moon me-1"></i>Тёмная
            </button>
            <button 
              type="button" 
              class="btn btn-sm"
              :class="theme === 'auto' ? 'btn-primary' : 'btn-outline-secondary'"
              @click="setTheme('auto')"
            >
              <i class="fas fa-desktop me-1"></i>Авто
            </button>
          </div>
        </div>
        
        <!-- Color scheme selection -->
        <div>
          <small class="text-muted d-block mb-2">Цвет</small>
          <div class="d-flex flex-wrap gap-2">
            <button 
              v-for="scheme in colorSchemes" 
              :key="scheme.value"
              class="btn btn-sm rounded-circle color-btn"
              :class="[
                `bg-${scheme.value}`,
                colorScheme === scheme.value ? 'border border-3 border-dark shadow' : ''
              ]"
              :title="scheme.label"
              @click="setColorScheme(scheme.value)"
              style="width: 32px; height: 32px; padding: 0;"
            >
              <i v-if="colorScheme === scheme.value" class="fas fa-check text-white"></i>
            </button>
          </div>
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
        { value: 'primary', label: 'Синий' },
        { value: 'success', label: 'Зелёный' },
        { value: 'danger', label: 'Красный' },
        { value: 'warning', label: 'Жёлтый' },
        { value: 'info', label: 'Голубой' },
        { value: 'dark', label: 'Тёмный' },
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
