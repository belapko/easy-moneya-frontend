<template>
    <form class="auth-form-register__form">
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
        class="auth-form-register__password"
      >
        Пароль
      </UiInput>

      <span
        v-for="rule in passwordValidationRules"
        :key="rule.label"
        class="auth-form-register__rule"
        :class="authFormRuleClasses(rule.isValid)"
      >
        {{ rule.label }}&nbsp;
      </span>

      <UiInput
        v-model="repeatedPassword"
        type="password"
        placeholder="••••••••"
        :isError="isRepeatedPasswordError"
        @blur="handleRepeatedPasswordBlur"
        class="auth-form-register__repeated"
      >
        Повторите пароль
      </UiInput>

      <span
        class="auth-form-register__rule"
        :class="authFormRuleClasses(isRepeatedPasswordValid)"
      >
          same
        </span>

      <UiButton
        :disabled="isButtonDisabled"
        class="auth-form-register__button"
      >
        Создать аккаунт
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

const repeatedPassword = ref<string>('');
const isRepeatedPasswordBlurred = ref<boolean>(false);

const isEmailValid = computed(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value));

const isEmailError = computed(() => isEmailBlurred.value
  ? !isEmailValid.value
  : false);

const passwordValidationRules = computed(() => [
  {
    label: '8 characters;',
    isValid: password.value.length >= 8,
  },
  {
    label: 'uppercase letter;',
    isValid: /[A-Z]/.test(password.value),
  },
  {
    label: 'lowercase letter;',
    isValid: /[a-z]/.test(password.value),
  },
  {
    label: 'number;',
    isValid: /\d/.test(password.value),
  },
]);

const isPasswordValid = computed(() => passwordValidationRules.value.every(rule => rule.isValid));

const isPasswordError = computed(() => isPasswordBlurred.value
  ? !isPasswordValid.value
  : false);

const isPasswordsMatch = computed(() => password.value === repeatedPassword.value);

const isRepeatedPasswordError = computed(() => isRepeatedPasswordBlurred.value && !isPasswordsMatch.value);

const isRepeatedPasswordValid = computed(() => repeatedPassword.value.length > 0 && isPasswordsMatch.value);

const isButtonDisabled = computed(() => !isEmailValid.value || !isPasswordValid.value || !isRepeatedPasswordValid.value);

const handleEmailBlur = () => {
  isEmailBlurred.value = true;
};

const handlePasswordBlur = () => {
  isPasswordBlurred.value = true;
};

const handleRepeatedPasswordBlur = () => {
  isRepeatedPasswordBlurred.value = true;
};

const authFormRuleClasses = (isValid: boolean) => ({
  'auth-form__rule--is-valid': isValid,
});
</script>

<style scoped lang="scss">
.auth-form-register {
  &__password {
    margin-top: calc(var(--gutter) * 2);
  }

  &__repeated {
    margin-top: var(--gutter);
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
