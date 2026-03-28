import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AuthPage from '@/pages/AuthPage.vue';
import Transactions from '@/pages/Transactions.vue';
import Categories from '@/pages/Categories.vue';
import Profile from '@/pages/Profile.vue';
import { RouteName } from '@/constants/RouteName.ts';
import { RouteMeta } from '@/constants/RouteMeta.ts';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: RouteName.TRANSACTIONS },
  },
  {
    path: '/auth',
    name: RouteName.AUTH,
    component: AuthPage,
  },
  {
    path: '/transactions',
    name: RouteName.TRANSACTIONS,
    component: Transactions,
    meta: {
      [RouteMeta.ONLY_AUTHORIZED]: true,
    },
  },
  {
    path: '/categories',
    name: RouteName.CATEGORIES,
    component: Categories,
    meta: {
      [RouteMeta.ONLY_AUTHORIZED]: true,
    },
  },
  {
    path: '/profile',
    name: RouteName.PROFILE,
    component: Profile,
    meta: {
      [RouteMeta.ONLY_AUTHORIZED]: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
