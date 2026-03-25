<template>
  <div
    class="ui-tabs"
    :style="maxTabWidth ? { '--ui-tab-width': `${maxTabWidth}px` } : undefined"
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      ref="tabButtons"
      type="button"
      @click="setActiveTab(tab.value)"
      class="ui-tabs__tab"
      :class="uiTabsTabClasses(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';

const { tabs } = defineProps<{
  tabs: Array<{
    label: string
    value: string
  }>
}>();

const activeTab = defineModel<string>({ required: true });
const tabButtons = useTemplateRef<HTMLButtonElement[]>('tabButtons');
const maxTabWidth = ref<number | null>(null);

const setActiveTab = (tabValue: string) => {
  activeTab.value = tabValue;
};

const updateTabWidth = async () => {
  maxTabWidth.value = null;
  await nextTick();

  const widths = tabButtons.value?.map((button) => button.getBoundingClientRect().width) ?? [];

  maxTabWidth.value = widths.length ? Math.ceil(Math.max(...widths)) : null;
};

const uiTabsTabClasses = (tabValue: string) => ({
  'ui-tabs__tab--is-active': tabValue === activeTab.value,
});

onMounted(() => {
  updateTabWidth();
  window.addEventListener('resize', updateTabWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTabWidth);
});

watch(() => tabs, updateTabWidth);
</script>

<style scoped lang="scss">
.ui-tabs {
  display: inline-flex;
  padding: var(--ui-tabs-gutter, var(--gutter));
  gap: var(--ui-tabs-gap, calc(var(--gutter) / 2));
  background-color: var(--color-neutral-200);
  border-radius: var(--border-radius-l);

  &__tab {
    width: var(--ui-tab-width, auto);
    padding: var(--ui-tab-gutter, var(--gutter)) var(--ui-tab-gutter, calc(var(--gutter) * 10));
    border-radius: var(--border-radius-m);
    color: var(--color-black);
    font-weight: 500;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      box-shadow 0.2s ease;

    &--is-active {
      background-color: var(--color-white);
      box-shadow: 0 2px 4px 1px var(--color-neutral-300);
    }
  }
}
</style>
