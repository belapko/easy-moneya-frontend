import { computed, ref } from 'vue';

export const useMobile = () => {
  const windowWidth = ref(window.innerWidth);
  const isMobile = computed(() => windowWidth.value <= 640);

  const onWidthChange = () => {
    windowWidth.value = window.innerWidth;
  };

  const addResizeEventListener = () => window.addEventListener('resize', onWidthChange);
  const removeResizeEventListener = () => window.removeEventListener('resize', onWidthChange);

  return {
    isMobile,
    addResizeEventListener,
    removeResizeEventListener,
  };
};
