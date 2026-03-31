<template>
  <button class="ui-button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.ui-button {
  width: 100%;
  padding: calc(var(--gutter) * 1.5) calc(var(--gutter) * 2);
  background-color: hsl(var(--color-black));
  color: hsl(var(--color-white));
  font-weight: 500;
  font-size: var(--text-size-s);
  line-height: var(--text-line-height-s);
  border-radius: var(--border-radius-s);
  cursor: pointer;

  &:hover:not(:disabled) {
    box-shadow: 5px 5px 5px -5px hsl(var(--color-neutral-700));
  }

  &:disabled {
    cursor: default;
    background-color: hsl(var(--color-neutral-500));
  }
}
</style>
