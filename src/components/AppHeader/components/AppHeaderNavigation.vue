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

    <button
      title="Выйти"
      @click="fetchLogout"
      class="app-header-navigation__logout"
    >
      <IconDoorExit class="app-header-navigation__logout-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/constants/RouteName';
import { IconReportMoney, IconCategory, IconUser, IconDoorExit } from '@tabler/icons-vue';
import { useUserStore } from '@/stores/user.ts';

const { fetchLogout } = useUserStore();
</script>

<style scoped lang="scss">
.app-header-navigation {
  $self: &;

  display: flex;
  align-items: center;
  column-gap: var(--gutter);

  &__item {
    display: flex;
    align-items: center;
    column-gap: var(--gutter);
    border: 2px solid transparent;
    border-radius: var(--border-radius-s);
    padding: var(--gutter) calc(var(--gutter) * 3);
    transition:
      border-color 0.1s ease,
      background-color 0.1s ease,
      color 0.1s ease;

    &.router-link-exact-active {
      background-color: var(--color-neutral-200);
    }

    &:not(.router-link-exact-active):hover {
      border-color: var(--color-neutral-200);
    }
  }

  &__text {
    color: var(--color-neutral-800);
    font-size: var(--text-size-s);
    font-weight: 500;
    line-height: var(--text-line-height-s);
  }

  &__logout {
    margin-left: calc(var(--gutter) * 0.5);
    padding: var(--gutter);
    border-radius: var(--border-radius-s);
    cursor: pointer;
    transition:
      background-color 0.1s ease,
      color 0.1s ease;

    &:hover {
      background-color: var(--color-red-600);

      #{$self}__logout-icon {
        color: var(--color-white);
      }
    }
  }
}
</style>
