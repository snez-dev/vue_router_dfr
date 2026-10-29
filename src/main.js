import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { PermissionPlugin } from './plugins/permission';
import './assets/styles.css';

const app = createApp(App);

app.use(router);
app.use(PermissionPlugin);

app.mount('#app');
