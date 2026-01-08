import { Input } from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import type { FormState, FormErrors } from '../types/login.types';

interface Props {
  form: FormState;
  errors: FormErrors;
  onChange: (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  setErrors?: (errors: FormErrors) => void;
}

export default function LoginForm({ form, errors, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="mt-2.5 flex flex-col gap-4 md:mt-16 md:gap-[25px]">
      {/* 이메일 */}
      <div className="flex flex-col gap-2.5">
        <label className="-mb-2.5 text-[14px] font-medium text-gray-800 md:text-[16px]">
          이메일
        </label>
        <Input
          title=" "
          value={form.email}
          onChange={onChange('email')}
          placeholder="이메일 입력"
          type="email"
        />
        <p
          className={`overflow-hidden text-[12px] font-semibold text-red-600 transition-all duration-1000 ease-out ${errors.email ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {errors.email}
        </p>
      </div>

      {/* 비밀번호 */}
      <div className="flex flex-col gap-2.5">
        <label className="-mb-2.5 text-[14px] font-medium text-gray-800 md:text-[16px]">
          비밀번호
        </label>
        <Input
          title=" "
          value={form.password}
          onChange={onChange('password')}
          placeholder="비밀번호 입력"
          type="password"
        />
        <p
          className={`overflow-hidden text-[12px] font-semibold text-red-600 transition-all duration-1000 ease-out ${errors.password ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {errors.password}
        </p>
      </div>

      <div className="-mt-5">
        <a
          href="/forgotPassword"
          className="cursor-pointer font-medium text-violet-800 hover:underline"
        >
          비밀번호를 잊으셨나요?
        </a>
      </div>

      <Button
        type="submit"
        className="mt-6 h-[50px] w-full cursor-pointer rounded-2xl bg-violet-700 font-bold text-white transition-colors hover:bg-violet-800"
      >
        로그인
      </Button>
    </form>
  );
}
