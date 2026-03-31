<template>
  <div class="app-header-navigation">
    <RouterLink
      :to="{ name: RouteName.TRANSACTIONS }"
      @click="handleClick"
      class="app-header-navigation__item"
    >
      <IconReportMoney />

      <span class="app-header-navigation__text">Главная</span>
    </RouterLink>

    <RouterLink
      :to="{ name: RouteName.CATEGORIES }"
      @click="handleClick"
      class="app-header-navigation__item"
    >
      <IconCategory />

      <span class="app-header-navigation__text">Категории</span>
    </RouterLink>

    <RouterLink
      :to="{ name: RouteName.PROFILE }"
      @click="handleClick"
      class="app-header-navigation__item"
    >
      <IconUser />

      <span class="app-header-navigation__text">Профиль</span>
    </RouterLink>

    <button
      title="Выйти"
      @click="handleLogout"
      class="app-header-navigation__logout"
    >
      <IconDoorExit class="app-header-navigation__logout-icon" />

      <span
        v-if="isMobile"
        class="app-header-navigation__text"
      >
        Выйти
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/constants/RouteName';
import { IconReportMoney, IconCategory, IconUser, IconDoorExit } from '@tabler/icons-vue';
import { useUserStore } from '@/stores/user.ts';
import { useMobile } from '@/composables/useMobile.ts';
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits<{
  (event: 'action'): void
}>();

const userStore = useUserStore();
const { isMobile, addResizeEventListener, removeResizeEventListener } = useMobile();

const handleClick = () => {
  emit('action');
};

const handleLogout = () => {
  userStore.fetchLogout();
  emit('action');
};

onMounted(addResizeEventListener);
onUnmounted(removeResizeEventListener);
</script>

<style scoped lang="scss">
.app-header-navigation {
  $self: &;

  &__item {
    display: flex;
    align-items: center;
    column-gap: var(--gutter);
    color: hsl(var(--color-neutral-800));
    border: 2px solid transparent;
    border-radius: var(--border-radius-s);
    padding: var(--gutter) calc(var(--gutter) * 3);
    transition:
      border-color 0.1s ease,
      background-color 0.1s ease,
      color 0.1s ease;

    &.router-link-exact-active {
      background-color: hsl(var(--color-neutral-200));
    }

    &:not(.router-link-exact-active):hover {
      border-color: hsl(var(--color-neutral-200));
    }
  }

  &__text {
    color: inherit;
    font-size: var(--text-size-s);
    font-weight: 500;
    line-height: var(--text-line-height-s);
  }

  &__logout {
    margin-left: calc(var(--gutter) * 0.5);
    padding: var(--gutter);
    color: hsl(var(--color-neutral-800));
    border-radius: var(--border-radius-s);
    cursor: pointer;
    transition:
      background-color 0.1s ease,
      color 0.1s ease;

    &:hover {
      background-color: hsl(var(--color-red-600));
      color: hsl(var(--color-white));
    }

    @media (max-width: 640px) {
      border: 1px solid hsl(var(--color-red-600));
      display: flex;
      align-items: center;
      column-gap: var(--gutter);
      padding: var(--gutter) calc(var(--gutter) * 3);
    }
  }
}
</style>
