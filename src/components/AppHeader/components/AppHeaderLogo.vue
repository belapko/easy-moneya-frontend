<template>
  <div class="app-header-logo">
    <WalletIcon class="app-header-logo__icon" />

    <RouterLink :to="{ name: RouteName.Transactions }" class="app-header-logo__title">
      easy-money
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import WalletIcon from '@/assets/icons/WalletIcon.vue';
import { RouteName } from '@/constants/RouteName.ts';
</script>

<style scoped lang="scss">
.app-header-logo {
  display: flex;
  align-items: center;
  column-gap: calc(var(--gutter) * 2);

  &__icon {
    font-size: var(--text-size-xxxl);
  }

  &__title {
    font-size: var(--text-size-l);
    color: var(--color-neutral-900);
    font-weight: 500;
    line-height: var(--text-line-height-l);
  }
}
</style>
