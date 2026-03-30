<template>
  <div class="transactions-page">
    <TransactionForm class="transactions-page__form" />
  </div>
</template>

<script setup lang="ts">
import TransactionForm from '@/components/TransactionForm/TransactionForm.vue';
</script>

<style scoped lang="scss">
.transactions-page {
  display: flex;
  justify-content: center;

  &__form {
    margin-top: calc(var(--gutter) * 10);
  }
}
</style>
