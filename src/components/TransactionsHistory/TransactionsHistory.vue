<template>
  <div class="transactions-history">
    <div class="transactions-history__header">
      <span class="transactions-history__title">История транзакций</span>

      <UiSelect
        v-model="transactionFilter"
        :options="transactionFilterOptions"
        bordered
        class="transactions-history__select"
      />
    </div>

    <div class="transactions-history__body">
      <TransactionCard
        v-for="transaction in currentTransactions"
        :key="transaction.id"
        :transaction="transaction"
        class="transactions-history__card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UiSelect from '@/ui-components/UiSelect.vue';
import { type Transaction, TransactionFilter } from '@/types/transactions.ts';
import { computed, onMounted, ref } from 'vue';
import type { UiSelectSelectOption } from '@/types/ui-components.ts';
import TransactionCard from '@/components/TransactionsHistory/components/TransactionCard.vue';
import { getTransactions } from '@/api/transactions.ts';

const transactionFilterOptions: UiSelectSelectOption[] = [
  {
    label: 'Все',
    value: TransactionFilter.ALL,
  },
  {
    label: 'Расходы',
    value: TransactionFilter.EXPENSE,
  },
  {
    label: 'Доходы',
    value: TransactionFilter.INCOME,
  },
];

const transactionFilter = ref(TransactionFilter.ALL);

const allTransactions = ref<Transaction[]>([]);
const expenseTransactions = ref<Transaction[]>([]);
const incomeTransactions = ref<Transaction[]>([]);

const currentTransactions = computed(() => {
  if (transactionFilter.value === TransactionFilter.ALL) {
    return allTransactions.value;
  }

  if (transactionFilter.value === TransactionFilter.EXPENSE) {
    return expenseTransactions.value;
  }

  if (transactionFilter.value === TransactionFilter.INCOME) {
    return incomeTransactions.value;
  }

  return [];
});

onMounted(async () => {
  allTransactions.value = (await getTransactions()).items;
});
</script>

<style scoped lang="scss">
.transactions-history {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: 500;
    font-size: var(--text-size-l);
    line-height: var(--text-line-height-l);
  }

  &__select {
    width: 8rem;
  }

  &__body {
    margin-top: calc(var(--gutter) * 4);
  }

  &__card {
    margin-top: var(--gutter);
  }
}
</style>
