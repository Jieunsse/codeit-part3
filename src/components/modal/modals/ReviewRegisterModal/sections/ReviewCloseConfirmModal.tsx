type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ReviewCloseConfirmModal({ isOpen, onCancel, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
      <div className="w-[360px] rounded-2xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
        <div className="text-[20px] font-bold text-gray-900">작성 중인 내용이 있어요</div>
        <div className="mt-2 text-[14px] font-semibold text-gray-600">
          닫으면 입력한 내용이 사라져요. 정말 닫을까요?
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            계속 작성
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
