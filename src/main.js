import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { PermissionPlugin } from './plugins/permission';
import { useThemeStore } from './stores/theme';
import './assets/styles.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PermissionPlugin);

// Инициализируем тему при старте
const themeStore = useThemeStore();
themeStore.init();

app.mount('#app');
