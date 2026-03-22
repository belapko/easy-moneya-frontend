import { createRouter, createWebHistory } from 'vue-router';
import Auth from '@/pages/Auth.vue';
import Transactions from '@/pages/Transactions.vue';
import Categories from '@/pages/Categories.vue';
import Profile from '@/pages/Profile.vue';
import { RouteName } from '@/constants/RouteName';

const routes = [
  { path: '/', redirect: { name: RouteName.Transactions } },
  { path: '/auth', name: RouteName.Auth, component: Auth },
  { path: '/transactions', name: RouteName.Transactions, component: Transactions },
  { path: '/categories', name: RouteName.Categories, component: Categories },
  { path: '/profile', name: RouteName.Profile, component: Profile },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
