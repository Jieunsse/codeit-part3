// SignUpForm/utils/validateField.ts
import { SIGNUP_MSG } from './messages';
import { isAllowedPasswordCharset, isEmailFormat } from './validators';
import type { FormValues } from '../useSignUpForm';

export function validateField(field: keyof FormValues, values: FormValues): string | undefined {
  const v = values[field].trim();

  if (field === 'email') {
    if (!v) return SIGNUP_MSG.emailRequired;
    if (!isEmailFormat(v)) return SIGNUP_MSG.emailInvalid;
    return;
  }

  if (field === 'nickname') {
    if (!v) return SIGNUP_MSG.nicknameRequired;
    if (v.length > 20) return SIGNUP_MSG.nicknameMax;
    return;
  }

  if (field === 'password') {
    if (!v) return SIGNUP_MSG.pwRequired;
    if (v.length < 8) return SIGNUP_MSG.pwMin;
    if (!isAllowedPasswordCharset(v)) return SIGNUP_MSG.pwCharset;
    return;
  }

  if (field === 'passwordConfirm') {
    if (!v) return SIGNUP_MSG.pwcRequired;
    if (v !== values.password) return SIGNUP_MSG.pwcMismatch;
    return;
  }

  return;
}
