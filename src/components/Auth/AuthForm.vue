<template>
  <div class="auth-form">
    <UiTabs
      :tabs="TABS"
      v-model="activeTab"
    />

    <form>
      <UiInput
        v-model="email"
        type="text"
        placeholder="your@email.com"
        :isValid="isEmailValid"
        @blur="handleEmailBlur"
      >
        Email
      </UiInput>

      <UiInput
        v-model="password"
        type="password"
        placeholder="••••••••"
        :isValid="isPasswordValid"
        @blur="handlePasswordBlur"
      >
        Password
      </UiInput>

      <span class="auth-form__validation">
        <span
          v-for="rule in passwordValidationRules"
          :key="rule.label"
          class="auth-form__rule"
          :class="authFormRuleClasses(rule.isValid)"
        >
          {{ rule.label }}&nbsp;
        </span>
      </span>

      <button>

      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import UiTabs from '@/ui-components/UiTabs.vue';
import { computed, ref } from 'vue';
import UiInput from '@/ui-components/UiInput.vue';

enum AuthFormValue {
  LOGIN = 'login',
  REGISTER = 'register',
}

const TABS = [
  { label: 'Вход', value: AuthFormValue.LOGIN },
  { label: 'Регистрация', value: AuthFormValue.REGISTER },
];

const activeTab = ref<AuthFormValue>(AuthFormValue.LOGIN);

const email = ref<string>('');
const isEmailBlurred = ref<boolean>(false);

const password = ref<string>('');
const isPasswordBlurred = ref<boolean>(false);

const isEmailValid = computed(() => isEmailBlurred.value
  ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)
  : true);

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

const isPasswordValid = computed(() => isPasswordBlurred.value
  ? passwordValidationRules.value.every(rule => rule.isValid)
  : true);

const handleEmailBlur = () => {
  isEmailBlurred.value = true;
};
const handlePasswordBlur = () => {
  isPasswordBlurred.value = true;
};

const authFormRuleClasses = (isValid: boolean) => ({
  'auth-form__rule--is-valid': isValid,
});
</script>

<style scoped lang="scss">
.auth-form {
  padding: calc(var(--gutter) * 5);
  display: inline-block;
  background-color: var(--color-white);
  border-radius: var(--border-radius-m);
  box-shadow: 0 5px 10px 2px var(--color-neutral-200);

  &__validation {
    display: flex;
    font-size: var(--text-size-xs);
  }

  &__rule {
    color: var(--color-neutral-400);

    &--is-valid {
      color: var(--color-green-600);
    }
  }
}
</style>
