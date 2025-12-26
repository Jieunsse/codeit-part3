import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import type { WineType } from './FilterModal';

export type WineRegisterValue = {
  name: string;
  price: number | '';
  origin: string;
  type: WineType;
  photoFile?: File | null;
};

type WineRegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: WineRegisterValue) => Promise<void> | void;
};

export function WineRegisterModal({ isOpen, onClose, onSubmit }: WineRegisterModalProps) {
  const [form, setForm] = useState<WineRegisterValue>({
    name: '',
    price: '',
    origin: '',
    type: 'Red',
    photoFile: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof WineRegisterValue>(key: K, value: WineRegisterValue[K]) => {
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
      title="와인 등록"
      maxWidthClassName="max-w-[560px]"
    >
      <div className="space-y-4">
        <Field label="와인 이름">
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="와인 이름 입력"
            className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-violet-400"
          />
        </Field>

        <Field label="가격">
          <input
            value={form.price}
            onChange={(e) => set('price', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="가격 입력"
            inputMode="numeric"
            className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-violet-400"
          />
        </Field>

        <Field label="원산지">
          <input
            value={form.origin}
            onChange={(e) => set('origin', e.target.value)}
            placeholder="원산지 입력"
            className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-violet-400"
          />
        </Field>

        <Field label="타입">
          <select
            value={form.type}
            onChange={(e) => set('type', e.target.value as WineType)}
            className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-violet-400"
          >
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Sparkling">Sparkling</option>
          </select>
        </Field>

        <Field label="와인 사진">
          {/* 팀원 업로드 컴포넌트로 교체 가능 */}
          <label className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100">
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
            className="h-12 flex-1 rounded-xl bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200"
          >
            취소
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="h-12 flex-1 rounded-xl bg-violet-600 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
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
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      {children}
    </div>
  );
}
