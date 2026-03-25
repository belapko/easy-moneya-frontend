<template>
  <div class="auth-form">
    <UiTabs
      :tabs="TABS"
      v-model="activeTab"
    />

    <component
:is="TABS[activeTab].component"
class="auth-form__content" />
  </div>
</template>

<script setup lang="ts">
import UiTabs from '@/ui-components/UiTabs.vue';
import { ref } from 'vue';
import AuthFormRegister from '@/components/AuthForm/components/AuthFormRegister.vue';
import AuthFormLogin from '@/components/AuthForm/components/AuthFormLogin.vue';

enum AuthFormValue {
  LOGIN = 'login',
  REGISTER = 'register',
}

const TABS = {
  [AuthFormValue.LOGIN]: {
    label: 'Вход',
    component: AuthFormLogin,
  },
  [AuthFormValue.REGISTER]: {
    label: 'Регистрация',
    component: AuthFormRegister,
  }
};

const activeTab = ref<AuthFormValue>(AuthFormValue.LOGIN);
</script>

<style scoped lang="scss">
.auth-form {
  padding: calc(var(--gutter) * 10) calc(var(--gutter) * 8);
  display: inline-block;
  background-color: var(--color-white);
  border-radius: var(--border-radius-m);
  box-shadow: 0 5px 10px 2px var(--color-neutral-200);

  &__content {
    margin-top: calc(var(--gutter) * 6);
  }
}
</style>
