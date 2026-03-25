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
import { computed } from 'vue';
import UiInput from '@/ui-components/UiInput.vue';
import UiButton from '@/ui-components/UiButton.vue';
import { useValidatedField } from '@/components/AuthForm/composables/useValidatedField';
import { getPasswordValidationRules, isEmail, isStrongPassword } from '@/components/AuthForm/utils/authValidators';

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
} = useValidatedField(isStrongPassword);

const {
  value: repeatedPassword,
  isValid: isRepeatedPasswordValid,
  isError: isRepeatedPasswordError,
  handleBlur: handleRepeatedPasswordBlur,
} = useValidatedField((value) => value.length > 0 && value === password.value);

const passwordValidationRules = computed(() => getPasswordValidationRules(password.value));

const isButtonDisabled = computed(() => !isEmailValid.value || !isPasswordValid.value || !isRepeatedPasswordValid.value);

const authFormRuleClasses = (isValid: boolean) => ({
  'auth-form-register__rule--is-valid': isValid,
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
