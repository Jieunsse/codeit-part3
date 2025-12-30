import { FlavorSliderModal } from '../../../../card/FlavorSlider';
import type { ReviewTasteKey } from '../ReviewRegisterModal.types';

type Props = {
  taste: Record<ReviewTasteKey, number>;
  onChangeTaste: (v: Record<ReviewTasteKey, number>) => void;
};

export function ReviewTasteSection({ taste, onChangeTaste }: Props) {
  return (
    <div className="space-y-6">
      <div className="mt-10 text-[20px] leading-8 font-bold text-gray-800">
        와인의 맛은 어땠나요?
      </div>
      <FlavorSliderModal value={taste} onChange={onChangeTaste} />
    </div>
  );
}
