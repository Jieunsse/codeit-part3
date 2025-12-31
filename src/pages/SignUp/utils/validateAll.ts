// SignUpForm/utils/validateAll.ts
import type { FormErrors, FormValues } from '../useSignUpForm';
import { validateField } from './validateField';

export function validateAll(values: FormValues): FormErrors {
  const nextErrors: FormErrors = {};
  (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
    const msg = validateField(key, values);
    if (msg) nextErrors[key] = msg;
  });
  return nextErrors;
}
