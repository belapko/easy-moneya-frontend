<template>
  <span
    v-html="iconSvg"
    class="async-tabler-icon"
    :style="asyncTablerIconStyles"
  />
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { loadTablerIconSvg } from '@/utils/tabler-icons.ts';

const {
  iconKey = null,
  size = 24,
} = defineProps<{
  iconKey?: string | null;
  size?: number;
}>();

const iconSvg = shallowRef('');

const asyncTablerIconStyles = computed(() => ({ '--tabler-icon-size': `${size}px` }));

let requestId = 0;

watch(() => iconKey, async (iconKey) => {
    const currentRequestId = ++requestId;
    const svg = await loadTablerIconSvg(iconKey);

    if (currentRequestId === requestId) {
      iconSvg.value = svg;
    }
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
.async-tabler-icon {
  display: inline-block;
  width: var(--tabler-icon-size);
  height: var(--tabler-icon-size);
  color: currentColor;

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}
</style>
