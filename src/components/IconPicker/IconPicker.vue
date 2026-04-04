<template>
  <div class="icon-picker">
    <UiInput
      v-model="searchQuery"
      label="Поиск"
      placeholder="Например, currency, home, shopping"
      :isError="false"
    />

    <p
      v-if="isLoading"
      class="icon-picker__status"
    >
      Загружаю список иконок...
    </p>

    <p
      v-else-if="loadError"
      class="icon-picker__status icon-picker__status--is-error"
    >
      {{ loadError }}
    </p>

    <template v-else>
      <span class="icon-picker__meta">{{ filteredIcons.length }} найдено</span>

      <div
        ref="iconPickerGridRef"
        class="icon-picker__grid"
      >
        <button
          v-for="icon in visibleIcons"
          :key="icon.key"
          type="button"
          class="icon-picker__item"
          :class="iconPickerItemClasses(icon.key)"
          @click="selectIcon(icon.key)"
        >
          <AsyncTablerIcon
            :iconKey="icon.key"
            :size="24"
          />
        </button>
      </div>

      <p
        v-if="!visibleIcons.length"
        class="icon-picker__status"
      >
        Иконки не найдены.
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import UiInput from '@/ui-components/UiInput.vue';
import AsyncTablerIcon from '@/components/AsyncTablerIcon/AsyncTablerIcon.vue';
import {
  DEFAULT_TABLER_ICON_KEY,
  loadTablerIconManifest,
  type TablerIconManifestItem,
} from '@/utils/tabler-icons.ts';

const DEFAULT_ICONS_LIMIT = 30;

const selectedIconKeyModel = defineModel<string>({ default: DEFAULT_TABLER_ICON_KEY });

const iconPickerGridRef = useTemplateRef<HTMLDivElement>('iconPickerGridRef');
const searchQuery = ref('');
const icons = ref<TablerIconManifestItem[]>([]);
const iconsLimit = ref<number>(DEFAULT_ICONS_LIMIT);
const iconsStep = ref<number>(1);

const isLoading = ref(true);
const loadError = ref('');

const normalizedSearchQuery = computed(() => searchQuery.value.trim().toLowerCase());
const filteredIcons = computed(() => {
  if (!normalizedSearchQuery.value) {
    return icons.value;
  }

  return icons.value.filter((icon) => (
    icon.key.includes(normalizedSearchQuery.value)
    || icon.label.toLowerCase().includes(normalizedSearchQuery.value)
  ));
});
const visibleIcons = computed(() => filteredIcons.value.slice(0, iconsLimit.value));

const selectIcon = (iconKey: string) => {
  selectedIconKeyModel.value = iconKey;
};

const iconPickerItemClasses = (iconKey: string) => ({
  'icon-picker__item--is-active': selectedIconKeyModel.value === iconKey,
});

onMounted(async () => {
  iconsLimit.value = iconPickerGridRef.value?.getBoundingClientRect().width ?? DEFAULT_ICONS_LIMIT;
  console.log(iconPickerGridRef.value?.getBoundingClientRect().width);

  try {
    icons.value = await loadTablerIconManifest();
  } catch {
    loadError.value = 'Не удалось загрузить список иконок.';
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped lang="scss">
.icon-picker {
  padding: calc(var(--gutter) * 6);
  background-color: hsl(var(--color-white));
  border: 1px solid hsl(var(--color-neutral-200));
  border-radius: var(--border-radius-m);

  &__meta {
    margin-top: calc(var(--gutter) * 3);
    color: hsl(var(--color-neutral-500));
    font-size: var(--text-size-xs);
    line-height: var(--text-line-height-xs);
  }

  &__grid {
    margin-top: calc(var(--gutter) * 3);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
    gap: calc(var(--gutter) * 2);
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: hsl(var(--color-white));
    border: 1px solid hsl(var(--color-neutral-200));
    border-radius: var(--border-radius-s);
    cursor: pointer;
    transition:
      border-color 0.12s ease,
      transform 0.12s ease,
      box-shadow 0.12s ease;

    &:hover {
      border-color: hsl(var(--color-neutral-400));
      transform: translateY(-1px);
      box-shadow: 0 12px 18px -18px hsl(var(--color-neutral-600));
    }

    &--is-active {
      border-color: hsl(var(--color-green-600));
      background-color: hsl(var(--color-green-200));
    }
  }

  &__status {
    margin-top: calc(var(--gutter) * 4);
    color: hsl(var(--color-neutral-500));

    &--is-error {
      color: hsl(var(--color-red-700));
    }
  }
}
</style>
