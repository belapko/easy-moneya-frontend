<template>
  <header class="app-header">
    <AppHeaderLogo />

    <template v-if="isMobile">
      <button
        type="button"
        :aria-expanded="isMobileMenuActive"
        aria-controls="app-header-navigation"
        @click="toggleMobileMenu"
        class="app-header__burger"
      >
        <IconMenu2 />
      </button>

      <button
        type="button"
        :tabindex="isMobileMenuActive ? 0 : -1"
        aria-label="Закрыть навигацию"
        @click="closeMobileMenu"
        class="app-header__backdrop"
        :class="appHeaderBackdropClasses"
      />
    </template>

    <AppHeaderNavigation
      id="app-header-navigation"
      @action="closeMobileMenu"
      class="app-header__navigation"
      :class="appHeaderNavigationClasses"
    />
  </header>
</template>

<script setup lang="ts">
import AppHeaderLogo from '@/components/AppHeader/components/AppHeaderLogo.vue';
import AppHeaderNavigation from '@/components/AppHeader/components/AppHeaderNavigation.vue';
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { IconMenu2 } from '@tabler/icons-vue';
import { useMobile } from '@/composables/useMobile.ts';

const { isMobile, addResizeEventListener, removeResizeEventListener } = useMobile();

const isMobileMenuActive = ref<boolean>(false);

const toggleMobileMenu = () => {
  if (!isMobile.value) {
    return;
  }

  isMobileMenuActive.value = !isMobileMenuActive.value;
};

const closeMobileMenu = () => isMobileMenuActive.value = false;

const appHeaderBackdropClasses = computed(() => ({
  'app-header__backdrop--is-visible': isMobileMenuActive.value
}));

const appHeaderNavigationClasses = computed(() => ({
  'app-header__navigation--is-mobile-open': isMobileMenuActive.value
}));

watchEffect(() => {
  if (!isMobile.value) {
    closeMobileMenu();
  }
});

onMounted(addResizeEventListener);
onUnmounted(removeResizeEventListener);
</script>

<style scoped lang="scss">
.app-header {
  background-color: hsl(var(--color-white));
  border-bottom: 1px solid hsl(var(--color-neutral-200));
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: var(--header-height);
  position: relative;

  @media (max-width: 640px) {
    padding-left: calc(var(--gutter) * 3);
    padding-right: calc(var(--gutter) * 3);
    justify-content: space-between;
  }

  &__navigation {
    display: flex;
    align-items: center;
    column-gap: var(--gutter);

    @media (max-width: 640px) {
      row-gap: var(--gutter);
      box-shadow: 0 0 10px -5px hsl(var(--color-neutral-400));
      width: 40%;
      align-items: unset;
      background-color: hsl(var(--color-white));
      padding-top: var(--header-height);
      padding-left: calc(var(--gutter) * 2);
      padding-right: calc(var(--gutter) * 2);
      position: fixed;
      height: 100dvh;
      flex-direction: column;
      top: 0;
      right: 0;
      z-index: 50;
      transform: translateX(100%);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition:
        transform 0.25s ease,
        opacity 0.25s ease,
        visibility 0.25s ease;

      &--is-mobile-open {
        @media (max-width: 640px) {
          transform: translateX(0);
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
      }
    }
  }

  &__burger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--gutter) * 1.5);
    background: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    z-index: 75;
  }

  &__backdrop {
    display: block;
    position: fixed;
    inset: 0;
    border: none;
    background-color: hsla(var(--color-overlay) / 0.2);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 0.25s ease,
      visibility 0.25s ease;
    z-index: 25;

    &--is-visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }
  }
}
</style>
