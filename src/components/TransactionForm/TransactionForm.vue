<template>
  <div class="transaction-form">
    <p class="transaction-form__title">
      {{ formTitle }}
    </p>

    <UiTabs
      :tabs="TABS"
      v-model="activeTab"
      class="transaction-form__tabs"
    />

    <form class="transaction-form__controls">
      <UiInput
        v-model="sum"
        label="Сумма, ₽"
        type="number"
        placeholder="1234.89"
        :isError="false"
      />

      <UiSelect
        v-model="categoryId"
        label="Категория"
        placeholder="Выберите категорию"
        :options="categoryOptions"
      />

      <UiButton :disabled="isButtonDisabled">
        Добавить
      </UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { getCategories } from '@/api/categories.ts';
import UiTabs from '@/ui-components/UiTabs.vue';
import { TransactionKind } from '@/types/transactions.ts';
import { type Category, CategoryKind } from '@/types/categories.ts';
import { computed, ref, watch } from 'vue';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-vue';
import UiInput from '@/ui-components/UiInput.vue';
import UiButton from '@/ui-components/UiButton.vue';
import UiSelect from '@/ui-components/UiSelect.vue';

const CATEGORY_KIND_BY_TRANSACTION_KIND: Record<TransactionKind, CategoryKind> = {
  [TransactionKind.EXPENSE]: CategoryKind.EXPENSE,
  [TransactionKind.INCOME]: CategoryKind.INCOME,
};

const TABS = {
  [TransactionKind.EXPENSE]: {
    label: 'Расход',
    activeBackgroundColor: '--color-red-200',
    activeTextColor: '--color-red-700',
    iconComponent: IconTrendingDown,
    description: 'транжирства',
  },
  [TransactionKind.INCOME]: {
    label: 'Доход',
    activeBackgroundColor: '--color-green-200',
    activeTextColor: '--color-green-700',
    iconComponent: IconTrendingUp,
    description: 'доходность',
  }
};

const activeTab = ref<TransactionKind>(TransactionKind.EXPENSE);
const sum = ref<string>('');
const categoryId = ref<string>('');
const categories = ref<Category[]>([]);

const formTitle = computed(() => `Добавить ${TABS[activeTab.value].description}`);
const activeCategoryKind = computed(() => CATEGORY_KIND_BY_TRANSACTION_KIND[activeTab.value]);
const categoryOptions = computed(() => categories.value.map((category) => ({
  label: category.name,
  value: category.id,
})));

const isButtonDisabled = computed(() => !sum.value || !categoryId.value);

watch(activeCategoryKind, async (kind) => {
  categories.value = await getCategories({ kind });
  categoryId.value = categories.value[0]?.id ?? '';
}, { immediate: true });
</script>

<style scoped lang="scss">
.transaction-form {
  width: min(100%, 24rem);
  padding: calc(var(--gutter) * 10) calc(var(--gutter) * 8);
  background-color: var(--color-white);
  border-radius: var(--border-radius-m);
  box-shadow: 0 5px 10px 2px var(--color-neutral-200);

  &__title {
    font-size: var(--text-size-xxl);
    line-height: var(--text-line-height-xxl);
    color: var(--color-neutral-700);
    text-align: center;
  }

  &__tabs {
    margin-top: calc(var(--gutter) * 3);
  }

  &__controls {
    margin-top: calc(var(--gutter) * 2);
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--gutter) * 2);
  }
}
</style>
