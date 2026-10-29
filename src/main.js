import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { PermissionPlugin } from './plugins/permission';
import { useThemeStore } from './store/theme';
import './assets/styles.css';

const app = createApp(App);

app.use(router);
app.use(PermissionPlugin);

// Инициализируем тему при старте
const themeStore = useThemeStore();
themeStore.actions.init();

app.mount('#app');
