<template>
  <div class="transaction-card">
    <div class="transaction-card__left">
      <AsyncTablerIcon
        :iconKey="transaction.category.iconKey"
        :size="32"
        class="transaction-card__icon"
        :style="transactionCardIconStyles"
      />

      <div class="transaction-card__about">
        <span class="transaction-card__category">{{ transaction.category.name }}</span>

        <span class="transaction-card__description">{{ transaction.description }}</span>
      </div>
    </div>

    <div class="transaction-card__about">
      <span
        class="transaction-card__amount"
        :class="transactionCardAmountClasses"
      >
        {{ formattedAmount }}
      </span>

      <span class="transaction-card__date">{{ formattedOccurredAt }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type Transaction, TransactionKind } from '@/types/transactions.ts';
import { formatDateTime } from '@/utils/date.ts';
import AsyncTablerIcon from '@/components/AsyncTablerIcon/AsyncTablerIcon.vue';

const {
  transaction,
} = defineProps<{
  transaction: Transaction,
}>();

const formattedAmount = computed(
  () => transaction.kind === TransactionKind.EXPENSE
    ? `-${transaction.amount} ₽`
    : `+${transaction.amount} ₽`
);

const formattedOccurredAt = computed(() => formatDateTime(transaction.occurredAt, 'ru-RU'));

const transactionCardIconStyles = computed(() => ({ 'background-color': transaction.category.color }));
const transactionCardAmountClasses = computed(() => [`transaction-card__amount--${transaction.kind}`]);
</script>

<style scoped lang="scss">
.transaction-card {
  display: flex;
  justify-content: space-between;
  background-color: hsl(var(--color-white));
  padding: calc(var(--gutter) * 3) calc(var(--gutter) * 6);
  border-radius: var(--border-radius-m);
  border: 1px solid hsl(var(--color-neutral-200));

  &__left {
    display: flex;
    align-items: center;
    column-gap: calc(var(--gutter) * 3);
  }

  &__icon {
    min-width: 32px;
    color: hsl(var(--color-white));
    padding: var(--gutter);
    border-radius: var(--border-radius-xs);
  }

  &__about {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__category {
    font-weight: 500;
  }

  &__description {
    font-size: var(--text-size-s);
    line-height: var(--text-line-height-s);
    color: hsl(var(--color-neutral-700));
  }

  &__amount {
    text-align: end;
    font-weight: 500;
    font-size: var(--text-size-xl);
    line-height: var(--text-line-height-xl);

    &--expense {
      color: hsl(var(--color-red-600));
    }

    &--income {
      color: hsl(var(--color-green-600));
    }
  }

  &__date {
    text-align: end;
    text-wrap: nowrap;
    font-weight: 300;
    font-size: var(--text-size-xs);
    line-height: var(--text-line-height-xs);
    color: hsl(var(--color-neutral-700));
  }
}
</style>
