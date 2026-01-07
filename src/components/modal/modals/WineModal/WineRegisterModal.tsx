/**
 * 와인 등록 모달
 *
 * ## Reusability
 * - 기본 사용 시: 와인 등록 모달
 * - 수정 모달은 `WineEditModal` 래퍼 컴포넌트를 통해
 *   제목 및 버튼 문구만 변경하여 재사용합니다.
 *
 * ## Props
 * @param isOpen - 모달의 열림 여부 (부모 컴포넌트에서 제어)
 * @param onClose - 모달을 닫기 위한 콜백
 * @param onSubmit - 와인 등록/수정 제출 콜백
 * @param titleText - (선택) 모달 상단 제목 텍스트 (기본값: "와인 등록")
 * @param submitButtonText - (선택) 제출 버튼 텍스트 (기본값: "와인 등록하기")
 * @param submittingText - (선택) 제출 중 표시할 버튼 텍스트 (기본값: "등록 중...")
 *
 * @example
 * // 와인 등록 모달
 * <WineRegisterModal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   onSubmit={createWine}
 * />
 *
 * @example
 * // 와인 수정 모달 (WineEditModal 내부에서 사용)
 * <WineEditModal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   onSubmit={updateWine}
 * />
 */

import React, { useEffect, useState } from 'react';
import { BaseModal } from '../BaseModal';
import type { WineType } from '../FilterModal';
import CameraIcon from '../img/camera.svg';
import ModalButtonAdapter from '../common/ModalButtonAdapter';
import { Input } from '../../../input/Input';
import Select from '../../../input/Select';

export type WineRegisterValue = {
  name: string;
  price: number | '';
  origin: string;
  type: WineType;
  photoFile?: File | null;
};

const DEFAULT_FORM: WineRegisterValue = {
  name: '',
  price: '',
  origin: '',
  type: 'Red',
  photoFile: null,
};

type WineRegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: WineRegisterValue) => Promise<void> | void;

  /** 수정 모달 등에서 기존 값을 주입하기 위한 초기값 */
  initialValue?: Partial<WineRegisterValue>;

  titleText?: string; // 기본: "와인 등록"
  submitButtonText?: string; // 기본: "와인 등록하기"
  submittingText?: string; // 기본: "등록 중..."
};

export function WineRegisterModal({
  isOpen,
  onClose,
  onSubmit,
  initialValue,
  titleText = '와인 등록',
  submitButtonText = '와인 등록하기',
  submittingText = '등록 중...',
}: WineRegisterModalProps) {
  const [form, setForm] = useState<WineRegisterValue>(DEFAULT_FORM);
  const [submitting, setSubmitting] = useState(false);

  // 모달이 열릴 때마다 초기값 반영(수정/등록 공용)
  useEffect(() => {
    if (!isOpen) return;

    setForm({
      ...DEFAULT_FORM,
      ...initialValue,
      // photoFile은 file input 특성상 안전하게 null로 기본 처리
      photoFile: initialValue?.photoFile ?? null,
    });
  }, [isOpen, initialValue]);

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
      title={titleText}
      titleClassName="text-[24px] font-bold text-gray-800 leading-[32px] pb-[16px]"
      maxWidthClassName="max-w-[560px]"
    >
      <div className="space-y-8">
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

        <div className="flex gap-2.5 pt-2">
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
              className="h-[54px] flex-2 rounded-xl bg-violet-600 px-9 py-4 text-[16px] font-bold text-white hover:bg-violet-700"
            >
              {submitting ? submittingText : submitButtonText}
            </ModalButtonAdapter>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-[16px] leading-[26px] font-medium text-gray-800">{label}</div>
      {children}
    </div>
  );
}
