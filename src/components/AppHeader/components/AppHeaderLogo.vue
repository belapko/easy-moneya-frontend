<template>
  <div class="app-header-logo">
    <IconWallet
      color="black"
      size="32"
    />

    <RouterLink
      :to="{ name: RouteName.Transactions }"
      class="app-header-logo__title"
    >
      easy-money
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { IconWallet } from '@tabler/icons-vue';
import { RouteName } from '@/constants/RouteName.ts';
</script>

<style scoped lang="scss">
.app-header-logo {
  display: flex;
  align-items: center;
  column-gap: var(--gutter);

  &__title {
    font-size: var(--text-size-l);
    color: var(--color-neutral-900);
    font-weight: 500;
    line-height: var(--text-line-height-l);
  }
}
</style>
