<template>
  <div
    class="ui-input"
    :class="uiInputRootClasses"
    :style="uiInputRootStyles"
  >
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
      v-bind="uiInputAttrs"
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
  isError = true
} = defineProps<{
  isError?: boolean
}>();

const inputValue = defineModel<string | number | null>({ required: true });
const attrs = useAttrs();
const fallbackId = useId();

const uiInputRootClasses = computed(() => attrs.class);
const uiInputRootStyles = computed(() => attrs.style);
const uiInputAttrs = computed(() => {
  const { class: _class, style: _style, ...inputAttrs } = attrs;

  return inputAttrs;
});

const inputId = computed(() => {
  const { id } = attrs;

  if (typeof id === 'string' || typeof id === 'number') {
    return String(id);
  }

  return fallbackId;
});

const uiInputFieldClasses = computed(() => ({
  'ui-input__field--is-error': isError,
}));
</script>

<style scoped lang="scss">
.ui-input {
  &__label {
    font-weight: 500;
    font-size: var(--text-size-s);
  }

  &__field {
    margin-top: var(--gutter);
    border: none;
    outline: none;
    width: 100%;
    padding: calc(var(--gutter) * 1.5) calc(var(--gutter) * 3);
    background-color: var(--color-neutral-100);
    border-radius: var(--border-radius-s);
    font-size: var(--text-size-s);

    &--is-error {
      outline: 1px solid var(--color-red-700);
    }

    &:focus:not(&--is-error) {
      outline: 1px solid var(--color-neutral-300);
    }
  }
}
</style>
