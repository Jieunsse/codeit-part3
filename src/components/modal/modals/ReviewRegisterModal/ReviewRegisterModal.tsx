/**
 * ReviewRegisterModal
 *
 * 와인 리뷰를 작성하고 제출하는 모달 컴포넌트입니다.
 *
 * ## Responsibilities
 * - 리뷰 등록 UI를 섹션 단위 컴포넌트로 조립합니다.
 * - 폼 상태, 검증, 제출, 닫기 가드 로직은 `useReviewRegisterForm` 훅에 위임합니다.
 * - 제출 및 닫기 동작은 `useReviewRegisterForm` 훅에 위임합니다.
 *
 * ## Data Flow
 * - props로 전달받은 `onSubmit`은 훅 내부에서 호출됩니다.
 * - 제출 성공 시 모달은 자동으로 닫힙니다.
 * - 입력 중 닫기 요청 시, dirty 상태라면 확인 모달을 표시합니다.
 * - 닫기 확인 모달(`ReviewCloseConfirmModal`)을 표시합니다.
 *
 * ## Props
 * @param isOpen - 모달 열림 여부 (부모 컴포넌트에서 제어)
 * @param onClose - 모달을 닫기 위한 콜백
 * @param wineName - 상단에 표시할 와인 이름
 * @param wineImageUrl - 와인 이미지 URL (없으면 기본 아이콘 표시)
 * @param onSubmit - 리뷰 제출 콜백 (성공적으로 resolve 되면 모달 닫힘)
 * @param titleText - (선택) 모달 상단 제목 텍스트 (기본값: "리뷰 등록")
 * @param submitButtonText - (선택) 제출 버튼 텍스트 (기본값: "리뷰 남기기")
 *
 * @example
 * // 리뷰 등록 모달
 * <ReviewRegisterModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   wineName="Sentinel Cabernet Sauvignon 2016"
 *   onSubmit={handleCreate}
 * />
 *
 * @example
 * // 리뷰 수정 모달 (ReviewEditModal 내부에서 사용)
 * <ReviewEditModal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   wineName="Sentinel Cabernet Sauvignon 2016"
 *   onSubmit={handleEdit}
 * />
 */

import { BaseModal } from '../BaseModal';
import type { ReviewRegisterModalProps } from './ReviewRegisterModal.types';
import { MAX_SELECT_AROMAS, MAX_TOTAL_AROMAS } from './ReviewRegisterModal.constants';
import { useReviewRegisterForm } from './useReviewRegisterForm';

import { ReviewWineHeader } from './sections/ReviewWineHeader';
import { ReviewContentEditor } from './sections/ReviewContentEditor';
import { ReviewTasteSection } from './sections/ReviewTasteSection';
import { ReviewAromaSection } from './sections/ReviewAromaSection';
import { ReviewSubmitButton } from './sections/ReviewSubmitButton';
import { ReviewCloseConfirmModal } from './sections/ReviewCloseConfirmModal';

export function ReviewRegisterModal({
  isOpen,
  onClose,
  wineName,
  wineImageUrl,
  onSubmit,
  titleText = '리뷰 등록',
  submitButtonText = '리뷰 남기기',
  initialValue,
}: ReviewRegisterModalProps) {
  const form = useReviewRegisterForm({ isOpen, onClose, onSubmit, initialValue });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={form.requestClose}
      title={titleText}
      titleClassName="text-[24px] font-bold leading-[32px] pb-[2]"
      maxWidthClassName="max-w-[620px]"
      panelClassName="max-h-[85dvh] flex flex-col overflow-hidden"
      bodyClassName="flex-1 overflow-y-auto"
    >
      <div className="space-y-6">
        <ReviewWineHeader
          wineName={wineName}
          wineImageUrl={wineImageUrl}
          rating={form.rating}
          onChangeRating={form.setRating}
        />

        <ReviewContentEditor
          contentRef={form.contentRef}
          isContentEmpty={form.isContentEmpty}
          onChangeText={form.setContent}
          onChangeEmpty={form.setIsContentEmpty}
        />

        <ReviewTasteSection taste={form.taste} onChangeTaste={form.setTaste} />

        <ReviewAromaSection
          error={form.error}
          allAromas={form.allAromas}
          selectedAromas={form.selectedAromas}
          isAddingAroma={form.isAddingAroma}
          newAroma={form.newAroma}
          maxSelect={MAX_SELECT_AROMAS}
          maxTotal={MAX_TOTAL_AROMAS}
          onToggle={form.toggleAroma}
          onStartAdd={() => {
            form.setIsAddingAroma(true);
          }}
          onChangeNew={form.setNewAroma}
          onConfirmAdd={() => {
            form.addCustomAroma();
            form.setIsAddingAroma(false);
          }}
          onCancelAdd={() => {
            form.setNewAroma('');
            form.setIsAddingAroma(false);
          }}
        />

        <ReviewSubmitButton
          submitting={form.submitting}
          onClick={form.submit}
          text={submitButtonText}
        />
      </div>

      <ReviewCloseConfirmModal
        isOpen={form.showCloseConfirm}
        onCancel={form.cancelClose}
        onConfirm={form.confirmClose}
      />
    </BaseModal>
  );
}
