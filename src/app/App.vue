<template>
  <AppHeader v-if="isHeaderVisible" />

  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { RouteName } from '@/constants/RouteName.ts';

const route = useRoute();

const isHeaderVisible = computed(() => route.name !== RouteName.AUTH);
</script>
