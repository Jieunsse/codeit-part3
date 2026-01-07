/**
 * 와인 등록(필터 등록) 모달
 *
 * - 이름/가격/원산지/타입/사진을 입력받아 `onSubmit`으로 전달합니다.
 * - 제출 성공(또는 onSubmit 완료) 후 모달을 자동으로 닫습니다.
 * - 제출 중에는 버튼이 disabled 되고 로딩 텍스트가 표시됩니다.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <FilterRegisterModal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   onSubmit={async (value) => {
 *     await createWine(value);
 *   }}
 * />
 * ```
 */

import React, { useState } from 'react';
import { BaseModal } from './BaseModal';
import type { WineType } from './FilterModal';
import CameraIcon from '../img/camera.svg';
import ModalButtonAdapter from './common/ModalButtonAdapter';
import { Input } from '../../input/Input';
import Select from '../../input/Select';

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
          <Input
            title=""
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="와인 이름 입력"
          />
        </Field>

        <Field label="가격">
          <Input
            title=""
            value={form.price}
            onChange={(e) => set('price', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="가격 입력"
          />
        </Field>

        <Field label="원산지">
          <Input
            title=""
            value={form.origin}
            onChange={(e) => set('origin', e.target.value)}
            placeholder="원산지 입력"
          />
        </Field>

        <Field label="타입">
          <Select
            title=""
            value={form.type}
            onChange={(value: string) => set('type', value as WineType)}
            options={[
              { label: 'Red', value: 'Red' },
              { label: 'White', value: 'White' },
              { label: 'Sparkling', value: 'Sparkling' },
            ]}
          />
        </Field>

        <Field label="와인 사진">
          <label className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100">
            <Input
              title=""
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => set('photoFile', e.target.files?.[0] ?? null)}
            />
            <img src={CameraIcon} alt="cameraIcon" />
          </label>
        </Field>

        <div className="flex gap-3 pt-2">
          <div className="flex-1">
            <ModalButtonAdapter
              type="button"
              onClick={onClose}
              className="h-[54px] rounded-xl border-none bg-purple-100 px-9 py-4 text-[16px] font-bold text-purple-700 hover:bg-purple-200"
            >
              취소
            </ModalButtonAdapter>
          </div>
          <div className="flex-2">
            <ModalButtonAdapter
              type="button"
              onClick={submit}
              disabled={submitting}
              className="h-[54px] rounded-xl bg-violet-600 px-9 py-4 text-[16px] font-bold text-white hover:bg-violet-700"
            >
              {submitting ? '등록 중...' : '와인 등록하기'}
            </ModalButtonAdapter>
          </div>
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
