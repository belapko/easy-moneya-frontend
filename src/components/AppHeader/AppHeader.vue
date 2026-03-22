<template>
  <header class="app-header">
    <AppHeaderLogo />

    <AppHeaderNavigation />
  </header>
</template>

<script setup lang="ts">
import AppHeaderLogo from '@/components/AppHeader/components/AppHeaderLogo.vue';
import AppHeaderNavigation from '@/components/AppHeader/components/AppHeaderNavigation.vue';
</script>

<style scoped lang="scss">
.app-header {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: space-around;
  height: 64px;


}
</style>
