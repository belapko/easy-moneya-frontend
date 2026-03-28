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

    <div class="ui-input__wrapper">
      <input
        v-model="inputValue"
        :id="inputId"
        v-bind="uiInputAttrs"
        class="ui-input__field"
        :class="uiInputFieldClasses"
      >

      <button
        v-if="hasToggleModel"
        type="button"
        @click="isToggled = !isToggled"
        class="ui-input__eye"
      >
        <component
          :is="iconComponent"
          :size="16"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, useAttrs, useId } from 'vue';
import { IconEye, IconEyeOff } from '@tabler/icons-vue';

defineOptions({
  inheritAttrs: false,
});

const {
  isError = true
} = defineProps<{
  isError?: boolean
}>();

const inputValue = defineModel<string>({ required: true });
const isToggled = defineModel<boolean>('isToggled', { default: false });
const attrs = useAttrs();
const fallbackId = useId();
const instance = getCurrentInstance();

const hasToggleModel = computed(() => {
  const vNodeProps = instance?.vnode.props ?? {};
  return 'isToggled' in vNodeProps || 'onUpdate:isToggled' in vNodeProps;
});

const iconComponent = computed(() => isToggled.value ? IconEye : IconEyeOff);

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

  &__wrapper {
    position: relative;
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

  &__eye {
    position: absolute;
    right: calc(var(--gutter) * 2);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
