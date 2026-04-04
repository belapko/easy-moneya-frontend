<template>
  <div class="categories-header">
    <h1 class="categories-header__title">
      Настройка категорий
    </h1>

    <div class="categories-header__content">
      <UiTabs
        v-model="activeTab"
        :tabs="TABS"
        class="categories-header__tabs"
      />

      <div class="categories-header__toggle">
        <UiToggle v-model="isArchivedToggled"/>

        <span>Показывать архивные</span>
      </div>

      <UiButton class="categories-header__create">
        <IconPlus :size="16"/>

        <span>Создать</span>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CategoryKind } from '@/types/categories.ts';
import UiTabs from '@/ui-components/UiTabs.vue';
import UiButton from '@/ui-components/UiButton.vue';
import { IconPlus } from '@tabler/icons-vue';
import UiToggle from '@/ui-components/UiToggle.vue';

const TABS = {
  [CategoryKind.EXPENSE]: {
    label: 'Расходы',
  },
  [CategoryKind.INCOME]: {
    label: 'Доходы',
  },
};

const activeTab = defineModel<string>('activeTab',{ required: true });
const isArchivedToggled = defineModel<boolean>('isArchivedToggled', { required: true });
</script>

<style scoped lang="scss">
.categories-header {
  &__title {
    font-weight: 400;
    font-size: var(--text-size-xxl);
    line-height: var(--text-line-height-xxl);
    color: hsl(var(--color-neutral-700));
    text-align: center;
  }

  &__content {
    padding: calc(var(--gutter) * 5);
    background-color: hsl(var(--color-white));
    border-radius: var(--border-radius-m);
    box-shadow: 0 5px 10px 2px hsl(var(--color-neutral-200));
    margin-top: calc(var(--gutter) * 5);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__tabs {
    font-size: var(--text-size-s);
    line-height: var(--text-line-height-s);
  }

  &__toggle {
    display: flex;
    align-items: center;
    column-gap: calc(var(--gutter) * 2);
    font-weight: 500;
  }

  &__create {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--gutter);
  }
}
</style>
