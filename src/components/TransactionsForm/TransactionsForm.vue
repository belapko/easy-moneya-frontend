<template>
  <div class="transactions-form">
    <p class="transactions-form__title">
      {{ formTitle }}
    </p>

    <UiTabs
      :tabs="TABS"
      v-model="activeTab"
      class="transactions-form__tabs"
    />

    <form class="transactions-form__controls">
      <div class="transactions-form__fields">
        <UiInput
          v-model="amount"
          class="transactions-form__field"
          label="Сумма, ₽"
          type="number"
          placeholder="1234.89"
          :isError="false"
        />

        <UiSelect
          v-model="categoryId"
          class="transactions-form__field"
          label="Категория"
          placeholder="Выберите категорию"
          :options="categoryOptions"
        />
      </div>

      <UiInput
        v-model="description"
        class="transactions-form__field"
        label="Описание"
        type="text"
        placeholder="Чипсы"
        :isError="false"
      />

      <UiButton
        :disabled="isButtonDisabled"
        class="transactions-form__button"
      >
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
import type { UiSelectSelectOption } from '@/types/ui-components.ts';

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
const amount = ref<string>('');
const description = ref<string>('');
const categoryId = ref<string>('');
const categories = ref<Category[]>([]);

const formTitle = computed(() => `Добавить ${TABS[activeTab.value].description}`);
const activeCategoryKind = computed(() => CATEGORY_KIND_BY_TRANSACTION_KIND[activeTab.value]);
const categoryOptions = computed<UiSelectSelectOption[]>(() => categories.value.map((category) => ({
  label: category.name,
  value: category.id,
})));

const isButtonDisabled = computed(() => !amount.value || !categoryId.value);

watch(activeCategoryKind, async (kind) => {
  categories.value = await getCategories({ kind });
  categoryId.value = categories.value[0]?.id ?? '';
}, { immediate: true });
</script>

<style scoped lang="scss">
.transactions-form {
  padding: calc(var(--gutter) * 10) calc(var(--gutter) * 8);
  background-color: hsl(var(--color-white));
  border-radius: var(--border-radius-m);
  box-shadow: 0 5px 10px 2px hsl(var(--color-neutral-200));

  @media (max-width: 640px) {
    padding: calc(var(--gutter) * 6) calc(var(--gutter) * 4);
  }

  &__title {
    font-size: var(--text-size-xxl);
    line-height: var(--text-line-height-xxl);
    color: hsl(var(--color-neutral-700));
    text-align: center;
  }

  &__tabs {
    margin-top: calc(var(--gutter) * 3);
    margin-left: auto;
    margin-right: auto;
    width: min(100%, 21rem);
  }

  &__controls {
    margin-top: calc(var(--gutter) * 2);
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--gutter) * 2);
  }

  &__fields {
    display: flex;
    width: 100%;
    column-gap: calc(var(--gutter) * 2);

    @media (max-width: 640px) {
      flex-direction: column;
      row-gap: calc(var(--gutter) * 2);
      column-gap: 0;
    }
  }

  &__field {
    flex-grow: 1;
    flex-basis: 0;
  }

  &__button {
    margin-top: var(--gutter);
  }
}
</style>
