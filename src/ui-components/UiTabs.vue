<template>
  <div class="ui-tabs">
    <button
      v-for="(tab, value) in tabs"
      :key="value"
      type="button"
      @click="setActiveTab(value)"
      class="ui-tabs__tab"
      :class="uiTabsTabClasses(value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { tabs } = defineProps<{
  tabs: Record<string, {label: string}>;
}>();

const activeTab = defineModel<string>({ required: true });

const setActiveTab = (tabValue: string) => {
  activeTab.value = tabValue;
};

const uiTabsTabClasses = (tabValue: string) => ({
  'ui-tabs__tab--is-active': tabValue === activeTab.value,
});
</script>

<style scoped lang="scss">
.ui-tabs {
  display: flex;
  padding: var(--ui-tabs-gutter, var(--gutter));
  gap: var(--ui-tabs-gap, calc(var(--gutter) / 2));
  background-color: var(--color-neutral-200);
  border-radius: var(--border-radius-l);

  &__tab {
    flex-grow: 1;
    flex-basis: 0;
    padding: var(--ui-tab-padding-block, var(--gutter))
      var(--ui-tab-padding-inline, clamp(calc(var(--gutter) * 3), 4vw, calc(var(--gutter) * 10)));
    border-radius: var(--border-radius-m);
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
