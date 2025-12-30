import ModalButtonAdapter from '../../common/ModalButtonAdapter';

type Props = {
  submitting: boolean;
  onClick: () => void;
};

export function ReviewSubmitButton({ submitting, onClick }: Props) {
  return (
    <ModalButtonAdapter
      type="button"
      onClick={onClick}
      disabled={submitting}
      className="mt-6 mb-6 h-[54px] w-full rounded-xl bg-violet-600 text-[16px] font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
    >
      {submitting ? '리뷰 등록 중...' : '리뷰 남기기'}
    </ModalButtonAdapter>
  );
}
