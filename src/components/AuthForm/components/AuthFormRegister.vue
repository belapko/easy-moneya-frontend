<template>
    <form
      @submit.prevent="handleSubmit"
      class="auth-form-register__form"
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
        class="auth-form-register__password"
      />

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
        v-model:isToggled="isPasswordVisible"
        label="Повторите пароль"
        :type="passwordInputType"
        placeholder="••••••••"
        :isError="isRepeatedPasswordError"
        @blur="handleRepeatedPasswordBlur"
        class="auth-form-register__repeated"
      />

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
import { useValidatedField } from '@/components/AuthForm/composables/useValidatedField';
import { getPasswordValidationRules, isEmail, isStrongPassword } from '@/components/AuthForm/utils/authValidators';
import { useUserStore } from '@/stores/user.ts';
import { AuthFormTypes } from '@/constants/AuthForm.ts';

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
} = useValidatedField(isStrongPassword);

const {
  value: repeatedPassword,
  isValid: isRepeatedPasswordValid,
  isError: isRepeatedPasswordError,
  handleBlur: handleRepeatedPasswordBlur,
} = useValidatedField((value) => value.length > 0 && value === password.value);

const isPasswordVisible = ref(false);
const passwordInputType = computed(() => isPasswordVisible.value ? 'text' : 'password');

const passwordValidationRules = computed(() => getPasswordValidationRules(password.value));

const isButtonDisabled = computed(() => userStore.isLoading || !isEmailValid.value || !isPasswordValid.value || !isRepeatedPasswordValid.value);

const authFormRuleClasses = (isValid: boolean) => ({
  'auth-form-register__rule--is-valid': isValid,
});

const handleSubmit = async () => {
  if (isButtonDisabled.value) {
    return;
  }

  await userStore.fetchAuth(AuthFormTypes.REGISTER, {
    email: email.value,
    password: password.value,
  });
};
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
    line-height: var(--text-line-height-xs);

    &--is-valid {
      color: var(--color-green-600);
    }
  }
}
</style>
