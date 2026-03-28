import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ApiError } from '@/api/http.ts';
import { getMe } from '@/api/user.ts';
import type { User } from '@/types/user.ts';
import { IS_USER_REQUESTED } from '@/constants/SessionStorageKey.ts';
import { postLogin, postRegister } from '@/api/auth.ts';
import { AuthFormTypes } from '@/types/authForm.ts';

type AuthCredentials = {
  email: string;
  password: string;
};

export const useUserStore = defineStore('user', () => {
  const isLoading = ref(false);

  const isAuthenticated = ref(false);

  const user = ref<User | undefined>();

  const email = computed(() => user.value?.email);
  const name = computed(() => user.value?.name);

  const fetchUser = async () => {
    if (isLoading.value) {
      return;
    }

    const isUserRequested = sessionStorage.getItem(IS_USER_REQUESTED);
    if (JSON.parse(isUserRequested ?? 'false')) {
      return;
    }

    isLoading.value = true;

    try {
      user.value = await getMe();
      isAuthenticated.value = true;
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        user.value = undefined;
        isAuthenticated.value = false;
        sessionStorage.setItem(IS_USER_REQUESTED, 'true');
      }

      return;
    } finally {
      isLoading.value = false;
    }

    sessionStorage.removeItem(IS_USER_REQUESTED);
  };

  const fetchAuth = async (type: AuthFormTypes, { email, password }: AuthCredentials) => {
    if (isLoading.value) {
      return;
    }

    isLoading.value = true;

    try {
      user.value = type === AuthFormTypes.LOGIN
        ? await postLogin({ email, password })
        : await postRegister({ email, password });
      isAuthenticated.value = true;
      sessionStorage.removeItem(IS_USER_REQUESTED);
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

  return {
    isLoading,
    email,
    name,
    fetchUser,
    fetchAuth,
  };
});
