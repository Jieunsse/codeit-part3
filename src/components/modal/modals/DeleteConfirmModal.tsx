import { useState } from 'react';
import { BaseModal } from './BaseModal';

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
      maxWidthClassName="max-w-[520px]"
    >
      <div className="space-y-5">
        <div className="text-center text-base font-semibold text-gray-900">{title}</div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-12 flex-1 rounded-xl bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={confirm}
            disabled={loading}
            className="h-12 flex-1 rounded-xl bg-violet-600 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {loading ? '삭제 중...' : confirmText}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
