import type { ReviewRegisterModalProps } from './ReviewRegisterModal.types';
import { ReviewRegisterModal } from './ReviewRegisterModal';

export function ReviewEditModal(props: ReviewRegisterModalProps) {
  return <ReviewRegisterModal {...props} titleText="수정하기" submitButtonText="수정하기" />;
}
