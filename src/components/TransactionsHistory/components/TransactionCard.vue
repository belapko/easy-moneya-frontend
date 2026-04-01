<template>
  <div class="transaction-card">
    <div class="transaction-card__left">
      <IconCurrencyRubel
        :size="32"
        class="transaction-card__icon"
      />

      <div class="transaction-card__about">
        <span class="transaction-card__category">Продукты</span>

        <span class="transaction-card__description">{{ transaction.description }}</span>
      </div>
    </div>

    <div class="transaction-card__about">
      <span class="transaction-card__amount">{{ formattedAmount }}</span>

      <span class="transaction-card__date">{{ formattedOccurredAt }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconCurrencyRubel } from '@tabler/icons-vue';
import { type Transaction, TransactionKind } from '@/types/transactions.ts';
import { computed } from 'vue';
import { formatDateTime } from '@/utils/date.ts';

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
    padding: var(--gutter);
    background-color: green;
    border-radius: var(--border-radius-xs);
  }

  &__about {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__category {
    font-weight: 500;
  }

  &__description {
    color: hsl(var(--color-neutral-700));
  }

  &__amount {
    font-weight: 500;
    font-size: var(--text-size-xl);
    line-height: var(--text-line-height-xl);
  }

  &__date {
    font-weight: 300;
    font-size: var(--text-size-xs);
    line-height: var(--text-line-height-xs);
    color: hsl(var(--color-neutral-700));
  }
}
</style>
