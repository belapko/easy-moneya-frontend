import '@/app/styles/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/app/routes.ts';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.use(router);

app.mount('#app');
