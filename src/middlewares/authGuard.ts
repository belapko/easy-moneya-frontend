import type { Pinia } from 'pinia';
import type { Router } from 'vue-router';
import { RouteMeta } from '@/constants/RouteMeta.ts';
import { RouteName } from '@/constants/RouteName.ts';
import { useUserStore } from '@/stores/user.ts';

export const setupAuthGuard = (router: Router, pinia: Pinia) => {
  router.beforeEach(async (to) => {
    const userStore = useUserStore(pinia);

    await userStore.fetchUser();

    if (to.name === RouteName.AUTH && userStore.isAuthorized) {
      return { name: RouteName.TRANSACTIONS };
    }

    if (to.meta[RouteMeta.ONLY_AUTHORIZED] && !userStore.isAuthorized) {
      return { name: RouteName.AUTH };
    }

    return true;
  });
};
