import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AuthPage from '@/pages/AuthPage.vue';
import TransactionsPage from '@/pages/TransactionsPage.vue';
import CategoriesPage from '@/pages/CategoriesPage.vue';
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
    component: TransactionsPage,
    meta: {
      [RouteMeta.ONLY_AUTHORIZED]: true,
    },
  },
  {
    path: '/categories',
    name: RouteName.CATEGORIES,
    component: CategoriesPage,
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
