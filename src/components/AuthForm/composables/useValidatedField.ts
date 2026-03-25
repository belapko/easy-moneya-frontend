import { computed, ref } from 'vue';

export const useValidatedField = (validate: (value: string) => boolean, initialValue = '') => {
  const value = ref(initialValue);
  const isBlurred = ref(false);

  const isValid = computed(() => validate(value.value));
  const isError = computed(() => isBlurred.value && !isValid.value);

  const handleBlur = () => {
    isBlurred.value = true;
  };

  return {
    value,
    isBlurred,
    isValid,
    isError,
    handleBlur,
  };
};
