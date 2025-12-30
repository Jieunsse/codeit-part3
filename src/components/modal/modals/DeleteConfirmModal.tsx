/**
 * 삭제 확인용 공통 모달
 *
 * - 확인 버튼 클릭 시 onConfirm 실행
 * - onConfirm 완료 후 자동으로 모달 닫힘
 * - 비동기 처리 중에는 확인 버튼 비활성화
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <DeleteConfirmModal
 *   isOpen={open}
 *   onClose={() => setOpen(false)}
 *   onConfirm={async () => {
 *     await deleteItem(id);
 *   }}
 *   title="이 게시물을 삭제할까요?"
 *   confirmText="삭제"
 *   cancelText="취소"
 * />
 * ```
 */

import { useState } from 'react';
import { BaseModal } from './BaseModal';
import ModalButtonAdapter from './common/ModalButtonAdapter';

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
};

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '정말 삭제하시겠습니까?',
  confirmText = '삭제하기',
  cancelText = '취소',
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  const confirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      showHeader={false}
      maxWidthClassName="max-w-[353px]  h-[182px]"
    >
      <div className="space-y-5 pt-2">
        <div className="mb-10 text-center text-[20px] leading-8 font-bold text-gray-800">
          {title}
        </div>

        <div className="flex gap-2.5 pb-6">
          <ModalButtonAdapter
            type="button"
            cancel
            onClick={onClose}
            className="h-[54px] flex-1 rounded-xl border border-gray-300 bg-white px-5 py-4 text-[16px] leading-[26px] font-bold text-gray-500 hover:bg-gray-100"
          >
            {cancelText}
          </ModalButtonAdapter>

          <ModalButtonAdapter
            type="button"
            onClick={confirm}
            disabled={loading}
            className="h-[54px] flex-1 rounded-xl bg-violet-600 px-5 py-4 text-[16px] font-bold text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {loading ? '삭제 중...' : confirmText}
          </ModalButtonAdapter>
        </div>
      </div>
    </BaseModal>
  );
}
