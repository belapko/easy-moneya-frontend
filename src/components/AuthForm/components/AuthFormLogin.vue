<template>
  <form
    @submit.prevent="handleSubmit"
    class="auth-form-login__form"
  >
    <UiInput
      v-model.trim="email"
      label="Email"
      type="text"
      placeholder="your@email.com"
      :isError="isEmailError"
      @blur="handleEmailBlur"
    />

    <UiInput
      v-model="password"
      v-model:isToggled="isPasswordVisible"
      label="Пароль"
      :type="passwordInputType"
      placeholder="••••••••"
      :isError="isPasswordError"
      @blur="handlePasswordBlur"
      class="auth-form-login__password"
    />

    <UiButton
      :disabled="isButtonDisabled"
      class="auth-form-login__button"
    >
      Войти
    </UiButton>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import UiInput from '@/ui-components/UiInput.vue';
import UiButton from '@/ui-components/UiButton.vue';
import { useValidatedField } from '@/components/AuthForm/composables/useValidatedField';
import { hasMinPasswordLength, isEmail } from '@/components/AuthForm/utils/authValidators';
import { AuthFormTypes } from '@/constants/AuthForm.ts';
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

const isPasswordVisible = ref(false);
const passwordInputType = computed(() => isPasswordVisible.value ? 'text' : 'password');

const isButtonDisabled = computed(() => userStore.isLoading || !isEmailValid.value || !isPasswordValid.value);

const handleSubmit = async () => {
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
    position: relative;
    margin-top: calc(var(--gutter) * 2);
  }

  &__eye {
    position: absolute;
    top: 0;
    right: var(--gutter);
  }

  &__button {
    margin-top: calc(var(--gutter) * 4);
  }
}
</style>
