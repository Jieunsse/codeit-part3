import { WineRegisterModal } from './WineRegisterModal';
import type { WineRegisterValue } from './WineRegisterModal';

type WineEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: WineRegisterValue) => Promise<void> | void;
};

export function WineEditModal(props: WineEditModalProps) {
  return (
    <WineRegisterModal
      {...props}
      titleText="내가 등록한 와인"
      submitButtonText="수정하기"
      submittingText="수정 중..."
    />
  );
}
