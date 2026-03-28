<template>
  <form
    @submit.prevent="handleSubmit"
    class="auth-form-login__form"
  >
    <UiInput
      v-model="email"
      type="text"
      placeholder="your@email.com"
      :isError="isEmailError"
      @blur="handleEmailBlur"
    >
      Email
    </UiInput>

    <UiInput
      v-model="password"
      type="password"
      placeholder="••••••••"
      :isError="isPasswordError"
      @blur="handlePasswordBlur"
      class="auth-form-login__password"
    >
      Пароль
    </UiInput>

    <UiButton
      :disabled="isButtonDisabled"
      class="auth-form-login__button"
    >
      Войти
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UiInput from '@/ui-components/UiInput.vue';
import UiButton from '@/ui-components/UiButton.vue';
import { useValidatedField } from '@/components/AuthForm/composables/useValidatedField';
import { hasMinPasswordLength, isEmail } from '@/components/AuthForm/utils/authValidators';
import { AuthFormTypes } from '@/types/authForm.ts';
import { useUserStore } from '@/stores/user.ts';

const userStore = useUserStore();

const {
  value: email,
  isValid: isEmailValid,
  isError: isEmailError,
  handleBlur: handleEmailBlur,
} = useValidatedField(isEmail);

const {
  value: password,
  isValid: isPasswordValid,
  isError: isPasswordError,
  handleBlur: handlePasswordBlur,
} = useValidatedField(hasMinPasswordLength);

const isButtonDisabled = computed(() => userStore.isLoading || !isEmailValid.value || !isPasswordValid.value);

const handleSubmit = async () => {
  email.value = email.value.trim();

  if (isButtonDisabled.value) {
    return;
  }

  await userStore.fetchAuth(AuthFormTypes.LOGIN, {
    email: email.value,
    password: password.value,
  });
};
</script>

<style scoped lang="scss">
.auth-form-login {
  &__password {
    margin-top: calc(var(--gutter) * 2);
  }

  &__button {
    margin-top: calc(var(--gutter) * 4);
  }
}
</style>
