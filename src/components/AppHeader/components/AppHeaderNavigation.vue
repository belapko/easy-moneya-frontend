<template>
  <div class="app-header-navigation">
    <RouterLink :to="{ name: RouteName.Transactions }" class="app-header-navigation__item">
      <HouseIcon class="app-header-navigation__icon" />

      <span class="app-header-navigation__text">Главная</span>
    </RouterLink>

    <RouterLink :to="{ name: RouteName.Categories }" class="app-header-navigation__item">
      <CategoriesIcon class="app-header-navigation__icon" />

      <span class="app-header-navigation__text">Категории</span>
    </RouterLink>

    <RouterLink :to="{ name: RouteName.Profile }" class="app-header-navigation__item">
      <ProfileIcon class="app-header-navigation__icon" />

      <span class="app-header-navigation__text">Профиль</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/constants/RouteName';
import HouseIcon from '@/assets/icons/HouseIcon.vue';
import CategoriesIcon from '@/assets/icons/CategoriesIcon.vue';
import ProfileIcon from '@/assets/icons/ProfileIcon.vue';
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

  &__icon {

  }

  &__text {
    color: var(--color-neutral-800);
    font-size: var(--text-size-s);
    font-weight: 500;
    line-height: var(--text-line-height-s);
  }
}
</style>
