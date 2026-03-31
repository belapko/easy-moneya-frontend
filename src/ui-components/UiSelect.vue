<template>
  <div
    ref="rootRef"
    class="ui-select"
    :class="uiSelectRootClasses"
    :style="uiSelectRootStyles"
  >
    <label
      v-if="label"
      :for="selectId"
      class="ui-select__label"
    >
      {{ label }}
    </label>

    <div class="ui-select__control">
      <button
        :id="selectId"
        v-bind="triggerAttrs"
        type="button"
        :disabled="isDisabled"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        @click="toggleOptions"
        class="ui-select__trigger"
      >
        <span>{{ selectedLabel }}</span>

        <IconChevronDown
          :size="16"
          class="ui-select__icon"
          :class="uiSelectIconClasses"
        />
      </button>

      <input
        v-if="inputName"
        :name="inputName"
        :value="modelValue"
        :disabled="isDisabled"
        type="hidden"
        class="ui-select__input"
      >

      <ul
        v-if="isOpen && options.length"
        role="listbox"
        class="ui-select__dropdown"
      >
        <li
          v-for="option in options"
          :key="option.value"
          role="option"
          :aria-selected="option.value === modelValue"
          @click="selectOption(option.value)"
          class="ui-select__option"
          :class="uiSelectOptionClasses(option.value)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, useId, useTemplateRef } from 'vue';
import { IconChevronDown } from '@tabler/icons-vue';

defineOptions({
  inheritAttrs: false,
});

type SelectOption = {
  label: string;
  value: string;
};

const {
  label = undefined,
  options,
  placeholder = '',
} = defineProps<{
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}>();

const modelValue = defineModel<string>({ required: true });
const attrs = useAttrs();
const fallbackId = useId();

const rootRef = useTemplateRef<HTMLDivElement>('rootRef');
const isOpen = ref(false);

const uiSelectRootClasses = computed(() => attrs.class);
const uiSelectRootStyles = computed(() => attrs.style);

const triggerAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    id: _id,
    name: _name,
    disabled: _disabled,
    ...buttonAttrs
  } = attrs;

  return buttonAttrs;
});

const inputName = computed(() => {
  const { name } = attrs;

  if (typeof name === 'string' || typeof name === 'number') {
    return String(name);
  }

  return undefined;
});

const isDisabled = computed(() => attrs.disabled !== undefined && attrs.disabled !== false);

const selectId = computed(() => {
  const { id } = attrs;

  if (typeof id === 'string' || typeof id === 'number') {
    return String(id);
  }

  return fallbackId;
});

const selectedLabel = computed(() => (
  options.find((option) => option.value === modelValue.value)?.label ?? placeholder
));

const toggleOptions = () => {
  if (isDisabled.value || !options.length) {
    return;
  }

  isOpen.value = !isOpen.value;
};

const closeOptions = () => {
  isOpen.value = false;
};

const selectOption = (value: string) => {
  modelValue.value = value;
  closeOptions();
};

const handleClickOutside = (event: PointerEvent) => {
  if (!isOpen.value || !rootRef.value) {
    return;
  }

  const target = event.target;

  if (target instanceof Node && !rootRef.value.contains(target)) {
    closeOptions();
  }
};

const uiSelectIconClasses = computed(() => ({
  'ui-select__icon--is-open': isOpen.value,
}));

const uiSelectOptionClasses = (optionValue: string) => ({
  'ui-select__option--is-selected': optionValue === modelValue.value
});

onMounted(() => {
  document.addEventListener('pointerdown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleClickOutside);
});
</script>

<style scoped lang="scss">
.ui-select {
  &__label {
    font-weight: 500;
    font-size: var(--text-size-s);
    line-height: var(--text-line-height-s);
  }

  &__control {
    position: relative;
    margin-top: var(--gutter);
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: none;
    outline: none;
    padding: calc(var(--gutter) * 1.5) calc(var(--gutter) * 3);
    background-color: hsl(var(--color-neutral-100));
    border-radius: var(--border-radius-s);
    font-size: var(--text-size-s);
    line-height: var(--text-line-height-s);
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__icon {
    color: hsl(var(--color-neutral-600));
    transition: transform 0.15s ease;

    &--is-open {
      transform: rotate(-180deg);
    }
  }

  &__dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    z-index: 10;
    background-color: hsl(var(--color-white));
    border-radius: var(--border-radius-s);
    box-shadow: 0 10px 20px -12px hsl(var(--color-neutral-500));
  }

  &__option {
    font-size: var(--text-size-s);
    line-height: var(--text-line-height-s);
    list-style: none;
    padding: calc(var(--gutter) * 1.5) calc(var(--gutter) * 3);
    border-radius: var(--border-radius-s);
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover:not(&--is-selected) {
      background-color: hsl(var(--color-neutral-200));
    }

    &--is-selected {
      background-color: hsl(var(--color-green-200));
    }
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
}
</style>
