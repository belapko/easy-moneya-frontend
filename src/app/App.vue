<template>
  <AppHeader v-if="isHeaderVisible" />

  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import { useRoute } from 'vue-router';
import { computed, onMounted } from 'vue';
import { RouteName } from '@/constants/RouteName.ts';
import { useUserStore } from '@/stores/user.ts';

const route = useRoute();

const { fetchUser } = useUserStore();

const isHeaderVisible = computed(() => route.name !== RouteName.AUTH);

onMounted(fetchUser);
</script>
