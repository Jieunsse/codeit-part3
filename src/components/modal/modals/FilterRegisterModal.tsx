import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import type { WineType } from './FilterModal';

export type FilterRegisterValue = {
  name: string;
  price: number | '';
  origin: string;
  type: WineType;
  photoFile?: File | null;
};

type FilterRegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: FilterRegisterValue) => Promise<void> | void;
};

export function FilterRegisterModal({ isOpen, onClose, onSubmit }: FilterRegisterModalProps) {
  const [form, setForm] = useState<FilterRegisterValue>({
    name: '',
    price: '',
    origin: '',
    type: 'Red',
    photoFile: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof FilterRegisterValue>(key: K, value: FilterRegisterValue[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    try {
      setSubmitting(true);
      await onSubmit(form);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="필터"
      titleClassName="text-[20px] font-bold text-gray-800 leading-[32px] pb-[16px]"
      maxWidthClassName="max-w-[520px]"
    >
      <div className="space-y-6">
        <Field label="와인 이름">
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="와인 이름 입력"
            className="font-regular h-[42px] w-full rounded-xl border border-gray-300 px-4 text-[14px] leading-6 text-gray-800 outline-none placeholder:text-gray-500 focus:border-violet-400"
          />
        </Field>

        <Field label="가격">
          <input
            value={form.price}
            onChange={(e) => set('price', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="가격 입력"
            className="font-regular h-[42px] w-full rounded-xl border border-gray-300 px-4 text-[14px] leading-6 text-gray-800 outline-none placeholder:text-gray-500 focus:border-violet-400"
          />
        </Field>

        <Field label="원산지">
          <input
            value={form.origin}
            onChange={(e) => set('origin', e.target.value)}
            placeholder="원산지 입력"
            className="font-regular h-[42px] w-full rounded-xl border border-gray-300 px-4 text-[14px] leading-6 text-gray-800 outline-none placeholder:text-gray-500 focus:border-violet-400"
          />
        </Field>

        <Field label="타입">
          <select
            value={form.type}
            onChange={(e) => set('type', e.target.value as WineType)}
            className="font-regular h-[42px] w-full rounded-xl border border-gray-300 px-4 text-[14px] leading-6 text-gray-800 outline-none placeholder:text-gray-500 focus:border-violet-400"
          >
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Sparkling">Sparkling</option>
          </select>
        </Field>

        <Field label="와인 사진">
          <label className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => set('photoFile', e.target.files?.[0] ?? null)}
            />
            📷
          </label>
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-[54px] flex-1 rounded-xl bg-purple-100 px-9 py-4 text-[16px] font-bold text-purple-700 hover:bg-purple-200"
          >
            취소
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="h-[54px] flex-2 rounded-xl bg-violet-600 px-9 py-4 text-[16px] font-bold text-white hover:bg-violet-700"
          >
            {submitting ? '등록 중...' : '와인 등록하기'}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="pb-3.5 text-[14px] leading-6 font-medium text-gray-800">{label}</label>
      {children}
    </div>
  );
}
