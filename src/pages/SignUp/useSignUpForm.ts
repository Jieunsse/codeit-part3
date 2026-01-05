// SignUpForm/useSignUpForm.ts
import { useMemo, useState } from 'react';
import { validateAll } from './utils/validateAll';
import { validateField } from './utils/validateField';

export type FormValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
};

export type FormErrors = Partial<Record<keyof FormValues, string>>;
export type Touched = Partial<Record<keyof FormValues, boolean>>;

export function useSignUpForm() {
  const [values, setValues] = useState<FormValues>({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });
  const [touched, setTouched] = useState<Touched>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const isFormValid = useMemo(() => {
    const filled =
      values.email.trim() &&
      values.nickname.trim() &&
      values.password.trim() &&
      values.passwordConfirm.trim();

    return Boolean(filled) && Object.values(errors).every((e) => !e);
  }, [values, errors]);

  const computeNextErrors = (
    field: keyof FormValues,
    nextValues: FormValues,
    prevErr: FormErrors,
  ) => {
    const nextErr: FormErrors = { ...prevErr };

    if (touched[field]) {
      nextErr[field] = validateField(field, nextValues);
    }

    if (field === 'password' && touched.passwordConfirm) {
      nextErr.passwordConfirm = validateField('passwordConfirm', nextValues);
    }

    return nextErr;
  };

  const setFieldValue = (field: keyof FormValues, value: string) => {
    const nextValues = { ...values, [field]: value };

    setValues(nextValues);
    setErrors((prevErr) => computeNextErrors(field, nextValues, prevErr));
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    setErrors((prevErr) => {
      const nextErr: FormErrors = { ...prevErr, [field]: validateField(field, values) };

      if (field === 'password' && touched.passwordConfirm) {
        nextErr.passwordConfirm = validateField('passwordConfirm', values);
      }

      return nextErr;
    });
  };

  const submit = async (onValid: (values: FormValues) => Promise<void> | void) => {
    const allTouched: Touched = {
      email: true,
      nickname: true,
      password: true,
      passwordConfirm: true,
    };
    setTouched(allTouched);

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setSubmitting(true);
      await onValid(values);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    values,
    errors,
    touched,
    submitting,
    isFormValid,
    setFieldValue,
    handleBlur,
    submit,
  };
}
