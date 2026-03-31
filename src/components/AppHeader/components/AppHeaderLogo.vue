<template>
  <div class="app-header-logo">
    <IconWallet size="32" />

    <RouterLink
      :to="{ name: RouteName.TRANSACTIONS }"
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
  color: hsl(var(--color-neutral-900));

  &__title {
    font-size: var(--text-size-l);
    color: inherit;
    font-weight: 500;
    line-height: var(--text-line-height-l);
  }
}
</style>
