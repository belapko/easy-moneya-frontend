<template>
  <div class="ui-input">
    <label
      v-if="$slots.default"
      :for="inputId"
      class="ui-input__label"
    >
      <slot />
    </label>

    <input
      v-model="inputValue"
      :id="inputId"
      v-bind="$attrs"
      class="ui-input__field"
      :class="uiInputFieldClasses"
    >
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const {
  isValid = true
} = defineProps<{
  isValid?: boolean
}>();

const inputValue = defineModel<string | number | null>({ required: true });
const attrs = useAttrs();
const fallbackId = useId();
const inputId = computed(() => {
  const { id } = attrs;

  if (typeof id === 'string' || typeof id === 'number') {
    return String(id);
  }

  return fallbackId;
});

const uiInputFieldClasses = computed(() => ({
  'ui-input__field--is-error': !isValid,
}));
</script>

<style scoped lang="scss">
.ui-input {
  &__label {
    color: var(--color-black);
    font-weight: 500;
  }

  &__field {
    border: none;
    outline: none;
    width: 100%;
    color: var(--color-black);
    padding: var(--gutter) calc(var(--gutter) * 2);
    background-color: var(--color-neutral-100);
    border-radius: var(--border-radius-s);

    &--is-error {
      outline: 1px solid var(--color-red-700);
    }

    &:focus:not(&--is-error) {
      outline: 1px solid var(--color-neutral-300);
    }
  }
}
</style>
