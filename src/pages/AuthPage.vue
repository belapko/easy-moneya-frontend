<template>
  <div class="auth-page">
    <IconWallet
      size="64"
      class="auth-page__icon"
    />

    <h1 class="auth-page__title">easy-money</h1>

    <h2 class="auth-page__subtitle">купюры деньги деньги</h2>

    <AuthForm class="auth-page__form" />
  </div>
</template>

<script setup lang="ts">

import { IconWallet } from '@tabler/icons-vue';
import AuthForm from '@/components/AuthForm/AuthForm.vue';
</script>

<style scoped lang="scss">
.auth-page {
  min-height: calc(100dvh - var(--header-height));
  padding: clamp(calc(var(--gutter) * 4), 4vw, calc(var(--gutter) * 8));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;

  &__icon {
    padding: calc(var(--gutter) * 3);
    border-radius: var(--border-radius-m);
    color: hsl(var(--color-white));
    background-color: hsl(var(--color-black));
  }

  &__title {
    margin-top: calc(var(--gutter) * 4);
    font-weight: 300;
  }

  &__subtitle {
    margin-top: calc(var(--gutter) * 4);
    font-size: var(--text-size-s);
    line-height: var(--text-line-height-s);
    color: hsl(var(--color-neutral-500));
    font-weight: 400;
  }

  &__form {
    margin-top: calc(var(--gutter) * 8);
  }
}
</style>
