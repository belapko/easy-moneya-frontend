<template>
  <div class="app-header-navigation">
    <RouterLink
      :to="{ name: RouteName.TRANSACTIONS }"
      class="app-header-navigation__item"
    >
      <IconReportMoney color="black" />

      <span class="app-header-navigation__text">Главная</span>
    </RouterLink>

    <RouterLink
      :to="{ name: RouteName.CATEGORIES }"
      class="app-header-navigation__item"
    >
      <IconCategory color="black" />

      <span class="app-header-navigation__text">Категории</span>
    </RouterLink>

    <RouterLink
      :to="{ name: RouteName.PROFILE }"
      class="app-header-navigation__item"
    >
      <IconUser color="black" />

      <span class="app-header-navigation__text">Профиль</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/constants/RouteName';
import { IconReportMoney, IconCategory, IconUser } from '@tabler/icons-vue';
</script>

<style scoped lang="scss">
.app-header-navigation {
  display: flex;
  align-items: center;
  column-gap: var(--gutter);

  &__item {
    display: flex;
    align-items: center;
    column-gap: var(--gutter);
    border-radius: var(--border-radius-s);
    padding: var(--gutter) calc(var(--gutter) * 3);
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &.router-link-exact-active {
      background-color: var(--color-neutral-200);
    }
  }

  &__text {
    color: var(--color-neutral-800);
    font-size: var(--text-size-s);
    font-weight: 500;
    line-height: var(--text-line-height-s);
  }
}
</style>
