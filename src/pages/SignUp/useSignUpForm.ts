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

  const setFieldValue = (field: keyof FormValues, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };

      // touched 된 필드는 입력 중에도 검증 업데이트
      if (touched[field]) {
        setErrors((prevErr) => ({ ...prevErr, [field]: validateField(field, next) }));
      }

      // 비밀번호 변경 시 비번확인도(이미 touched면) 같이 재검증
      if (field === 'password' && touched.passwordConfirm) {
        setErrors((prevErr) => ({
          ...prevErr,
          passwordConfirm: validateField('passwordConfirm', next),
        }));
      }

      return next;
    });
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }));
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
