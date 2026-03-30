import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Router } from 'vue-router';
import { ApiError } from '@/api/http.ts';
import { getMe } from '@/api/user.ts';
import type { User } from '@/types/user.ts';
import { IS_USER_REQUESTED } from '@/constants/SessionStorageKey.ts';
import { postLogin, postLogout, postRegister } from '@/api/auth.ts';
import { AuthFormTypes } from '@/constants/AuthForm.ts';
import { RouteName } from '@/constants/RouteName.ts';
import { RouteMeta } from '@/constants/RouteMeta.ts';

type AuthCredentials = {
  email: string;
  password: string;
};

type StoreWithRouter = {
  router: Router;
};

export const useUserStore = defineStore('user', () => {
  const isLoading = ref(false);
  const isUserFetched = ref(false);

  const user = ref<User | undefined>();
  let fetchUserPromise: Promise<void> | null = null;

  const clearUser = () => {
    user.value = undefined;
    isUserFetched.value = true;
    sessionStorage.setItem(IS_USER_REQUESTED, 'true');
  };

  const redirectToAuthIfNeeded = async (router: Router) => {
    if (!router.currentRoute.value.meta[RouteMeta.ONLY_AUTHORIZED]) {
      return;
    }

    if (router.currentRoute.value.name === RouteName.AUTH) {
      return;
    }

    await router.push({ name: RouteName.AUTH });
  };

  const isAuthorized = computed(() => Boolean(user.value));
  const email = computed(() => user.value?.email);
  const name = computed(() => user.value?.name);

  const fetchUser = async () => {
    if (isUserFetched.value) {
      return;
    }

    if (fetchUserPromise) {
      return fetchUserPromise;
    }

    fetchUserPromise = (async () => {
      const isUserRequested = sessionStorage.getItem(IS_USER_REQUESTED) === 'true';

      if (isUserRequested) {
        user.value = undefined;
        isUserFetched.value = true;
        return;
      }

      isLoading.value = true;

      try {
        user.value = await getMe();
        sessionStorage.removeItem(IS_USER_REQUESTED);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          user.value = undefined;
          sessionStorage.setItem(IS_USER_REQUESTED, 'true');
          return;
        }

        console.log(error);
      } finally {
        isLoading.value = false;
        isUserFetched.value = true;
      }
    })();

    try {
      await fetchUserPromise;
    } finally {
      fetchUserPromise = null;
    }
  };

  const fetchAuth = async function(this: StoreWithRouter, type: AuthFormTypes, { email, password }: AuthCredentials) {
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;

    try {
      user.value = type === AuthFormTypes.LOGIN
        ? await postLogin({ email, password })
        : await postRegister({ email, password });
      isUserFetched.value = true;
      sessionStorage.removeItem(IS_USER_REQUESTED);

      await this.router.push({ name: RouteName.TRANSACTIONS });
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.code, error.message);
        return;
      }

      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchLogout = async function(this: StoreWithRouter) {
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;

    try {
      await postLogout();
      clearUser();
      await redirectToAuthIfNeeded(this.router);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearUser();
        await redirectToAuthIfNeeded(this.router);
        return;
      }

      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    isAuthorized,
    email,
    name,
    fetchUser,
    fetchAuth,
    fetchLogout,
  };
});
