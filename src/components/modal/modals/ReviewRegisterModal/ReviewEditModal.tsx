import type { ReviewRegisterModalProps, ReviewRegisterValue } from './ReviewRegisterModal.types';
import { ReviewRegisterModal } from './ReviewRegisterModal';

type ReviewEditModalProps = Omit<
  ReviewRegisterModalProps,
  'titleText' | 'submitButtonText' | 'initialValue'
> & {
  review: ReviewRegisterValue;
};

export function ReviewEditModal({ review, ...props }: ReviewEditModalProps) {
  return (
    <ReviewRegisterModal
      {...props}
      titleText="수정하기"
      submitButtonText="수정하기"
      initialValue={{
        rating: review.rating,
        content: review.content,
        taste: review.taste,
        aromas: review.aromas,
      }}
    />
  );
}
