<template>
  <div class="ui-tabs">
    <button
      v-for="(tab, value) in tabs"
      :key="value"
      type="button"
      @click="setActiveTab(value)"
      class="ui-tabs__tab"
      :class="uiTabsTabClasses(value)"
      :style="uiTabsTabStyles(value, tab.activeBackgroundColor, tab.activeTextColor)"
    >
      <component
        v-if="tab.iconComponent"
        :is="tab.iconComponent"
        :size="16"
      />

      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

const { tabs } = defineProps<{
  tabs: Record<string, {
    label: string,
    activeBackgroundColor?: string,
    activeTextColor?: string
    iconComponent?: Component
  }>;
}>();

const activeTab = defineModel<string>({ required: true });

const setActiveTab = (tabValue: string) => {
  activeTab.value = tabValue;
};

const uiTabsTabClasses = (tabValue: string) => ({
  'ui-tabs__tab--is-active': tabValue === activeTab.value,
});
const uiTabsTabStyles = (tabValue: string, tabActiveBackgroundColor?: string, tabActiveTextColor?: string) => {
  if (tabValue !== activeTab.value) {
    return undefined;
  }

  return {
    'background-color': tabActiveBackgroundColor?.startsWith('--')
      ? `var(${tabActiveBackgroundColor})`
      : tabActiveBackgroundColor ?? 'var(--color-white)',
    'color': tabActiveTextColor?.startsWith('--')
      ? `var(${tabActiveTextColor})`
      : tabActiveTextColor ?? 'var(--color-black)',
  };
};
</script>

<style scoped lang="scss">
.ui-tabs {
  display: flex;
  padding: var(--gutter);
  gap: calc(var(--gutter) / 2);
  background-color: var(--color-neutral-200);
  border-radius: var(--border-radius-l);

  &__tab {
    display: flex;
    align-items: center;
    column-gap: var(--gutter);
    flex-grow: 1;
    flex-basis: 0;
    padding: var(--gutter) clamp(calc(var(--gutter) * 3), 4vw, calc(var(--gutter) * 10));
    border-radius: var(--border-radius-m);
    font-weight: 500;
    cursor: pointer;
    transition:
      background-color 0.1s ease,
      box-shadow 0.1s ease;

    &--is-active {
      box-shadow: 0 2px 4px 1px var(--color-neutral-300);
    }
  }
}
</style>
