<template>
  <div class="transactions-page">
    <TransactionsForm class="transactions-page__form" />

    <TransactionsHistory class="transactions-page__history"/>
  </div>
</template>

<script setup lang="ts">
import TransactionsForm from '@/components/TransactionsForm/TransactionsForm.vue';
import TransactionsHistory from '@/components/TransactionsHistory/TransactionsHistory.vue';
</script>

<style scoped lang="scss">
.transactions-page {
  &__form {
    width: min(100%, 32rem);
    margin-top: calc(var(--gutter) * 10);
    margin-left: auto;
    margin-right: auto;
  }

  &__history {
    width: min(100%, 48rem);
    margin-top: calc(var(--gutter) * 10);
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
