import '@/app/styles/main.css';

import { createPinia } from 'pinia';
import { createApp, markRaw } from 'vue';
import App from './App.vue';
import { router } from '@/app/routes.ts';
import { setupAuthGuard } from '@/middlewares/authGuard.ts';

const pinia = createPinia();
const app = createApp(App);

pinia.use(() => ({ router: markRaw(router) }));

setupAuthGuard(router, pinia);

app.use(pinia);

app.use(router);

app.mount('#app');
