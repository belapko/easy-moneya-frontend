import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@/pages/AuthPage.vue';
import Transactions from '@/pages/Transactions.vue';
import Categories from '@/pages/Categories.vue';
import Profile from '@/pages/Profile.vue';
import { RouteName } from '@/constants/RouteName';

const routes = [
  { path: '/', redirect: { name: RouteName.TRANSACTIONS } },
  { path: '/auth', name: RouteName.AUTH, component: AuthPage },
  { path: '/transactions', name: RouteName.TRANSACTIONS, component: Transactions },
  { path: '/categories', name: RouteName.CATEGORIES, component: Categories },
  { path: '/profile', name: RouteName.PROFILE, component: Profile },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
