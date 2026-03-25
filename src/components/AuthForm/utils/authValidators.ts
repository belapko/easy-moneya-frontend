export type ValidationRule = {
  label: string
  isValid: boolean
};

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRuleChecks = [
  {
    label: '8 characters;',
    check: (value: string) => value.length >= 8,
  },
  {
    label: 'uppercase letter;',
    check: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: 'lowercase letter;',
    check: (value: string) => /[a-z]/.test(value),
  },
  {
    label: 'number;',
    check: (value: string) => /\d/.test(value),
  },
] as const;

export const isEmail = (value: string) => emailPattern.test(value);

export const hasMinPasswordLength = (value: string) => value.length >= 8;

export const getPasswordValidationRules = (value: string): ValidationRule[] => passwordRuleChecks.map((rule) => ({
  label: rule.label,
  isValid: rule.check(value),
}));

export const isStrongPassword = (value: string) => getPasswordValidationRules(value).every((rule) => rule.isValid);
