<template>
  <AppHeader />

  <main>
    <RouterView />
  </main>

  <footer>
    Футер
  </footer>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/AppHeader.vue';
</script>

<style scoped>

</style>
