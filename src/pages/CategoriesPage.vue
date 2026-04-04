<template>
  <div class="categories-page">
    <CategoriesHeader
      v-model:activeTab="activeTab"
      v-model:isArchivedToggled="isArchivedToggled"
    />
<!--    <div class="categories-page__preview">-->
<!--      <AsyncTablerIcon-->
<!--        :iconKey="selectedIconKey"-->
<!--        :size="36"-->
<!--        class="categories-page__preview-icon"-->
<!--      />-->

<!--      <div>-->
<!--        <p class="categories-page__preview-title">-->
<!--          {{ selectedIconLabel }}-->
<!--        </p>-->

<!--        <p class="categories-page__preview-key">-->
<!--          {{ selectedIconKey }}-->
<!--        </p>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="categories-page__content">-->
<!--      <IconPicker-->
<!--        v-model="selectedIconKey"-->
<!--        class="categories-page__picker"-->
<!--      />-->

<!--      <section class="categories-page__panel">-->
<!--        <div class="categories-page__panel-header">-->
<!--          <div>-->
<!--            <p class="categories-page__panel-eyebrow">-->
<!--              Existing Categories-->
<!--            </p>-->

<!--            <h2 class="categories-page__panel-title">-->
<!--              Текущие категории-->
<!--            </h2>-->
<!--          </div>-->

<!--          <UiTabs-->
<!--            v-model="activeTab"-->
<!--            :tabs="tabs"-->
<!--            class="categories-page__tabs"-->
<!--          />-->
<!--        </div>-->

<!--        <p-->
<!--          v-if="isLoading"-->
<!--          class="categories-page__status"-->
<!--        >-->
<!--          Загружаю категории...-->
<!--        </p>-->

<!--        <p-->
<!--          v-else-if="loadError"-->
<!--          class="categories-page__status categories-page__status&#45;&#45;error"-->
<!--        >-->
<!--          {{ loadError }}-->
<!--        </p>-->

<!--        <div-->
<!--          v-else-->
<!--          class="categories-page__list"-->
<!--        >-->
<!--          <button-->
<!--            v-for="category in categories"-->
<!--            :key="category.id"-->
<!--            type="button"-->
<!--            class="categories-page__category"-->
<!--            :class="categoryCardClasses(category.iconKey)"-->
<!--            @click="selectedIconKey = category.iconKey"-->
<!--          >-->
<!--            <div-->
<!--              class="categories-page__category-icon"-->
<!--              :style="{ backgroundColor: category.color }"-->
<!--            >-->
<!--              <AsyncTablerIcon-->
<!--                :iconKey="category.iconKey"-->
<!--                :size="22"-->
<!--              />-->
<!--            </div>-->

<!--            <div class="categories-page__category-text">-->
<!--              <span class="categories-page__category-name">-->
<!--                {{ category.name }}-->
<!--              </span>-->

<!--              <span class="categories-page__category-key">-->
<!--                {{ category.iconKey }}-->
<!--              </span>-->
<!--            </div>-->
<!--          </button>-->

<!--          <p-->
<!--            v-if="!categories.length"-->
<!--            class="categories-page__status"-->
<!--          >-->
<!--            Категории пока не найдены.-->
<!--          </p>-->
<!--        </div>-->
<!--      </section>-->
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import { getCategories } from '@/api/categories.ts';
import { type Category, CategoryKind } from '@/types/categories.ts';
import IconPicker from '@/components/IconPicker/IconPicker.vue';
import AsyncTablerIcon from '@/components/AsyncTablerIcon/AsyncTablerIcon.vue';
import UiTabs from '@/ui-components/UiTabs.vue';
import { DEFAULT_TABLER_ICON_KEY } from '@/utils/tabler-icons.ts';
import CategoriesHeader from '@/components/CategoriesHeader/CategoriesHeader.vue';

const tabs = {
  [CategoryKind.EXPENSE]: {
    label: 'Расходы',
    activeBackgroundColor: '--color-red-200',
    activeTextColor: '--color-red-700',
  },
  [CategoryKind.INCOME]: {
    label: 'Доходы',
    activeBackgroundColor: '--color-green-200',
    activeTextColor: '--color-green-700',
  },
};

const activeTab = ref<CategoryKind>(CategoryKind.EXPENSE);
const isArchivedToggled = ref<boolean>(false);


const categories = ref<Category[]>([]);
const isLoading = ref(false);
const loadError = ref('');
const selectedIconKey = ref(DEFAULT_TABLER_ICON_KEY);

const selectedIconLabel = computed(() => selectedIconKey.value);

const categoryCardClasses = (iconKey: string) => ({
  'categories-page__category--is-active': iconKey === selectedIconKey.value,
});

watch(activeTab, async (kind) => {
  isLoading.value = true;
  loadError.value = '';

  try {
    categories.value = await getCategories({ kind, includeArchived: false });
    const [firstCategory] = categories.value;

    if (firstCategory) {
      selectedIconKey.value = firstCategory.iconKey;
    }
  } catch {
    loadError.value = 'Не удалось загрузить категории.';
  } finally {
    isLoading.value = false;
  }
}, { immediate: true });
</script>

<style scoped lang="scss">
.categories-page {
  width: min(100%, 48rem);
  margin: calc(var(--gutter) * 10) auto;
}

  //&__hero {
//    display: flex;
//    justify-content: space-between;
//    align-items: flex-end;
//    gap: calc(var(--gutter) * 6);
//    padding: calc(var(--gutter) * 8);
//    border-radius: calc(var(--border-radius-l) * 1.25);
//    background:
//      radial-gradient(circle at top right, hsl(var(--color-green-200)), transparent 30%),
//      linear-gradient(135deg, hsl(var(--color-white)), hsl(var(--color-neutral-100)));
//    border: 1px solid hsl(var(--color-neutral-200));
//
//    @media (max-width: 900px) {
//      flex-direction: column;
//      align-items: stretch;
//    }
//  }
//
//  &__eyebrow,
//  &__panel-eyebrow {
//    color: hsl(var(--color-neutral-500));
//    font-size: var(--text-size-xs);
//    text-transform: uppercase;
//    letter-spacing: 0.08em;
//  }
//
//  &__title {
//    margin-top: var(--gutter);
//    font-size: clamp(var(--text-size-xxl), 3vw, var(--text-size-xxxl));
//    line-height: var(--text-line-height-xxl);
//  }
//
//  &__description {
//    margin-top: calc(var(--gutter) * 3);
//    max-width: 40rem;
//    color: hsl(var(--color-neutral-600));
//  }
//
//  &__preview {
//    display: flex;
//    align-items: center;
//    gap: calc(var(--gutter) * 3);
//    min-width: 14rem;
//    padding: calc(var(--gutter) * 4);
//    background-color: hsl(var(--color-black));
//    color: hsl(var(--color-white));
//    border-radius: calc(var(--border-radius-m) + 2px);
//  }
//
//  &__preview-icon {
//    color: inherit;
//  }
//
//  &__preview-title {
//    font-weight: 600;
//  }
//
//  &__preview-key {
//    color: hsl(var(--color-neutral-300));
//    font-size: var(--text-size-xs);
//  }
//
//  &__content {
//    margin-top: calc(var(--gutter) * 6);
//    display: grid;
//    grid-template-columns: minmax(0, 1.35fr) minmax(19rem, 0.9fr);
//    gap: calc(var(--gutter) * 6);
//
//    @media (max-width: 960px) {
//      grid-template-columns: 1fr;
//    }
//  }
//
//  &__panel {
//    padding: calc(var(--gutter) * 6);
//    background-color: hsl(var(--color-white));
//    border: 1px solid hsl(var(--color-neutral-200));
//    border-radius: var(--border-radius-m);
//  }
//
//  &__panel-header {
//    display: flex;
//    justify-content: space-between;
//    align-items: flex-start;
//    gap: calc(var(--gutter) * 3);
//
//    @media (max-width: 640px) {
//      flex-direction: column;
//      align-items: stretch;
//    }
//  }
//
//  &__panel-title {
//    margin-top: var(--gutter);
//    font-size: var(--text-size-xl);
//    line-height: var(--text-line-height-xl);
//  }
//
//  &__tabs {
//    width: min(100%, 18rem);
//  }
//
//  &__list {
//    margin-top: calc(var(--gutter) * 4);
//    display: flex;
//    flex-direction: column;
//    gap: calc(var(--gutter) * 2);
//  }
//
//  &__category {
//    display: flex;
//    align-items: center;
//    gap: calc(var(--gutter) * 3);
//    width: 100%;
//    padding: calc(var(--gutter) * 3);
//    background-color: hsl(var(--color-neutral-50));
//    border: 1px solid transparent;
//    border-radius: var(--border-radius-s);
//    text-align: left;
//    cursor: pointer;
//    transition:
//      transform 0.12s ease,
//      border-color 0.12s ease,
//      background-color 0.12s ease;
//
//    &:hover {
//      transform: translateY(-1px);
//      border-color: hsl(var(--color-neutral-300));
//      background-color: hsl(var(--color-white));
//    }
//
//    &--is-active {
//      border-color: hsl(var(--color-green-600));
//      background-color: hsl(var(--color-green-200));
//    }
//  }
//
//  &__category-icon {
//    display: flex;
//    align-items: center;
//    justify-content: center;
//    width: calc(var(--gutter) * 10);
//    height: calc(var(--gutter) * 10);
//    color: hsl(var(--color-white));
//    border-radius: var(--border-radius-xs);
//    flex-shrink: 0;
//  }
//
//  &__category-text {
//    display: flex;
//    flex-direction: column;
//    gap: calc(var(--gutter) / 2);
//    min-width: 0;
//  }
//
//  &__category-name {
//    font-weight: 600;
//  }
//
//  &__category-key {
//    color: hsl(var(--color-neutral-500));
//    font-size: var(--text-size-xs);
//    word-break: break-word;
//  }
//
//  &__status {
//    margin-top: calc(var(--gutter) * 4);
//    color: hsl(var(--color-neutral-500));
//
//    &--error {
//      color: hsl(var(--color-red-700));
//    }
//  }
//}
</style>
