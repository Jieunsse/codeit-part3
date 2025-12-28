import { useEffect, useMemo, useState } from 'react';
import { BaseModal } from './BaseModal';
import { FlavorSliderModal } from '../../card/FlavorSlider';
import { StarReview as StarReviewComponent } from '../../star/StarReview';

const DEFAULT_TASTE: Record<ReviewTasteKey, number> = {
  body: 50,
  tannin: 35,
  sweet: 40,
  acid: 55,
};

export type ReviewTasteKey = 'body' | 'tannin' | 'sweet' | 'acid';

export type ReviewRegisterValue = {
  rating: number;
  content: string;
  taste: Record<ReviewTasteKey, number>; // 0~100
  aromas: string[];
};

type ReviewRegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;

  wineName: string;
  wineImageUrl?: string;

  onSubmit: (value: ReviewRegisterValue) => Promise<void> | void;
};

const DEFAULT_AROMAS = [
  '체리',
  '베리',
  '오크',
  '바닐라',
  '후추',
  '제빵',
  '풀',
  '사과',
  '복숭아',
  '시트러스',
  '트로피컬',
  '미네랄',
  '꽃',
  '담뱃잎',
  '흙',
  '초콜릿',
  '스파이스',
  '커피',
  '가죽',
] as const;

const MAX_TOTAL_AROMAS = 25; // 기본 + 커스텀 합쳐서 최대 25개
const MAX_SELECT_AROMAS = 5; // 칩 선택 가능 개수(최대)

export function ReviewRegisterModal({
  isOpen,
  onClose,
  wineName,
  wineImageUrl,
  onSubmit,
}: ReviewRegisterModalProps) {
  const [rating, setRating] = useState(4);
  const [content, setContent] = useState('');

  const [taste, setTaste] = useState<Record<ReviewTasteKey, number>>(DEFAULT_TASTE);

  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);

  const [customAromas, setCustomAromas] = useState<string[]>([]);
  const [isAddingAroma, setIsAddingAroma] = useState(false);
  const [newAroma, setNewAroma] = useState('');

  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const hasDirty =
    rating !== 4 ||
    content.trim().length > 0 ||
    selectedAromas.length > 0 ||
    customAromas.length > 0 ||
    taste.body !== DEFAULT_TASTE.body ||
    taste.tannin !== DEFAULT_TASTE.tannin ||
    taste.sweet !== DEFAULT_TASTE.sweet ||
    taste.acid !== DEFAULT_TASTE.acid;

  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const requestClose = () => {
    if (submitting) return;

    if (isAddingAroma) {
      setNewAroma('');
      setIsAddingAroma(false);
      return;
    }

    if (hasDirty) {
      setShowCloseConfirm(true);
      return;
    }
    onClose();
  };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    onClose();
  };

  const cancelClose = () => {
    setShowCloseConfirm(false);
  };

  const allAromas = useMemo(() => {
    const set = new Set<string>([...DEFAULT_AROMAS, ...customAromas]);
    return Array.from(set);
  }, [customAromas]);

  const toggleAroma = (tag: string) => {
    setError('');
    setSelectedAromas((prev) => {
      const exists = prev.includes(tag);
      if (exists) return prev.filter((t) => t !== tag);

      if (prev.length >= MAX_SELECT_AROMAS) {
        setError(`향은 최대 ${MAX_SELECT_AROMAS}개까지 선택할 수 있어요.`);
        return prev;
      }
      return [...prev, tag];
    });
  };

  const normalizeTag = (s: string) => s.trim().replace(/\s+/g, ' ');

  const addCustomAroma = () => {
    setError('');
    const tag = normalizeTag(newAroma);
    if (!tag) return;

    const lower = tag.toLowerCase();
    const existsInAll = allAromas.some((t) => t.toLowerCase() === lower);
    if (existsInAll) {
      setError('이미 존재하는 향 태그예요.');
      return;
    }

    if (allAromas.length + 1 > MAX_TOTAL_AROMAS) {
      setError(`향 태그는 최대 ${MAX_TOTAL_AROMAS}개까지 만들 수 있어요.`);
      return;
    }

    setCustomAromas((prev) => [...prev, tag]);
    setNewAroma('');
  };

  const submit = async () => {
    setError('');

    if (selectedAromas.length < 1) {
      setError('향 태그를 최소 1개 이상 선택해 주세요.');
      return;
    }

    const payload: ReviewRegisterValue = {
      rating,
      content,
      taste,
      aromas: selectedAromas,
    };

    try {
      setSubmitting(true);
      await onSubmit(payload);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // 열릴 때마다 초기화
    setRating(4);
    setContent('');
    setTaste(DEFAULT_TASTE);
    setSelectedAromas([]);
    setCustomAromas([]);
    setIsAddingAroma(false);
    setNewAroma('');
    setError('');
    setSubmitting(false);

    // 닫기 경고 모달도 닫아두기
    setShowCloseConfirm(false);
  }, [isOpen]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={requestClose}
      title="리뷰 등록"
      titleClassName="text-[24px] font-bold leading-[32px]"
      maxWidthClassName="max-w-[620px]"
    >
      <div className="space-y-6">
        {/* wine header */}
        <div className="flex items-center gap-2.5">
          <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100">
            {wineImageUrl ? (
              <img src={wineImageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">🍷</div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-[18px] leading-[26px] font-semibold text-gray-800">{wineName}</div>
            <StarReviewComponent defaultValue={rating} onChange={setRating} />
          </div>
        </div>

        {/* content */}
        <div className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="후기를 작성해 주세요"
            className="h-[120px] w-full resize-none rounded-xl border border-gray-500 px-5 py-3.5 text-sm text-[16px] outline-none focus:border-violet-400"
          />
        </div>

        {/* taste sliders */}
        <div className="space-y-3">
          <div className="text-[20px] leading-8 font-bold text-gray-800">와인의 맛은 어땠나요?</div>
          <FlavorSliderModal value={taste} onChange={setTaste} />
        </div>

        {/* aroma chips */}
        <div className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-[20px] leading-8 font-bold text-gray-800">
                기억에 남는 향이 있나요?
              </div>
              <div className="mt-1 text-xs text-gray-500">최대 {MAX_SELECT_AROMAS}개 선택 가능</div>
            </div>

            <div className="text-xs text-gray-500">
              선택됨: <span className="font-semibold">{selectedAromas.length}</span> /{' '}
              {MAX_SELECT_AROMAS}
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="flex flex-wrap gap-2">
            {allAromas.map((tag) => {
              const active = selectedAromas.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleAroma(tag)}
                  className={[
                    'my-[5px] rounded-full px-[18px] py-2.5 text-[16px] transition',
                    active
                      ? 'bg-violet-600 text-white'
                      : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50',
                  ].join(' ')}
                >
                  {tag}
                </button>
              );
            })}

            {allAromas.length < MAX_TOTAL_AROMAS && (
              <>
                {!isAddingAroma ? (
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setIsAddingAroma(true);
                    }}
                    className="flex items-center justify-center rounded-[50px] border border-dashed border-gray-300 px-[18px] py-2.5 text-[16px] text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                    aria-label="향 태그 추가"
                  >
                    +
                  </button>
                ) : (
                  <div className="flex items-center gap-1 rounded-full border border-violet-400 bg-white px-3 py-1">
                    <input
                      autoFocus
                      value={newAroma}
                      onChange={(e) => setNewAroma(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomAroma();
                          setIsAddingAroma(false);
                        }
                        if (e.key === 'Escape') {
                          e.preventDefault();
                          e.stopPropagation();
                          setNewAroma('');
                          setIsAddingAroma(false);
                        }
                      }}
                      placeholder="향 입력"
                      className="w-16 bg-transparent text-[16px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addCustomAroma();
                        setIsAddingAroma(false);
                      }}
                      className="text-xs font-semibold text-violet-600"
                      aria-label="향 태그 추가 완료"
                    >
                      ✔
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {isAddingAroma && (
            <div className="text-[11px] text-gray-400">Enter로 추가 · Esc로 취소</div>
          )}
        </div>

        {/* submit */}
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="h-[54px] w-full rounded-xl bg-violet-600 px-9 py-4 text-[16px] font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
        >
          {submitting ? '리뷰 등록 중...' : '리뷰 남기기'}
        </button>
      </div>

      {showCloseConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
          <div className="w-[360px] rounded-2xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="text-[20px] font-bold text-gray-900">작성 중인 내용이 있어요</div>
            <div className="mt-2 text-[14px] font-semibold text-gray-600">
              닫으면 입력한 내용이 사라져요. 정말 닫을까요?
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={cancelClose}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                계속 작성
              </button>
              <button
                type="button"
                onClick={confirmClose}
                className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
