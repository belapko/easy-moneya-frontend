<template>
  <button class="ui-button">
    <slot />
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.ui-button {
  width: 100%;
  padding: calc(var(--gutter) * 1.5) calc(var(--gutter) * 2);
  background-color: var(--color-black);
  color: var(--color-white);
  font-weight: 500;
  font-size: var(--text-size-s);
  border-radius: var(--border-radius-s);
  cursor: pointer;

  &:hover:not(:disabled) {
    box-shadow: 5px 5px 5px -5px var(--color-neutral-700);
  }

  &:disabled {
    cursor: default;
    background-color: var(--color-neutral-700);
  }
}
</style>
