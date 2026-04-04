<template>
  <input
    :checked="isToggled"
    @change="handleToggle"
    type="checkbox"
    class="ui-toggle"
  >
</template>

<script setup lang="ts">
const isToggled = defineModel<boolean>({ required: true });

const handleToggle = () => {
  isToggled.value = !isToggled.value;
};
</script>

<style scoped lang="scss">
.ui-toggle {
  --height: 1.1875em;
  --width: 0.8;

  appearance: none;
  display: inline-block;
  background-color: hsl(var(--color-neutral-200));
  height: var(--height);
  width: calc(var(--height) * calc(1 + var(--width)));
  border: 0;
  border-radius: var(--border-radius-l);
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    aspect-ratio: 1;
    background-color: hsl(var(--color-white));
    border: 1px solid hsl(var(--color-neutral-500));
    height: 100%;
    border-radius: 50%;
    transition: transform 0.15s ease-in-out;
  }

  &:checked {
    background-color: hsl(var(--color-black));
  }

  &:checked::after {
    border-color: hsl(var(--color-black));
    transform: translateX(calc(var(--height) * var(--width)));
  }
}
</style>
