<template>
  <form class="auth-form-login__form">
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
import { computed, ref } from 'vue';
import UiInput from '@/ui-components/UiInput.vue';
import UiButton from '@/ui-components/UiButton.vue';

const email = ref<string>('');
const isEmailBlurred = ref<boolean>(false);

const password = ref<string>('');
const isPasswordBlurred = ref<boolean>(false);

const isEmailValid = computed(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value));

const isEmailError = computed(() => isEmailBlurred.value
  ? !isEmailValid.value
  : false);

const isPasswordValid = computed(() => password.value.length >= 8);

const isPasswordError = computed(() => isPasswordBlurred.value
  ? !isPasswordValid.value
  : false);

const isButtonDisabled = computed(() => !isEmailValid.value || !isPasswordValid.value);

const handleEmailBlur = () => {
  isEmailBlurred.value = true;
};

const handlePasswordBlur = () => {
  isPasswordBlurred.value = true;
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

  &__rule {
    color: var(--color-neutral-400);
    font-size: var(--text-size-xs);

    &--is-valid {
      color: var(--color-green-600);
    }
  }
}
</style>
