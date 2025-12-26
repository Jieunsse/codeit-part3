import { useMemo, useState } from 'react';
import { BaseModal } from './BaseModal';

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

  const [taste, setTaste] = useState<Record<ReviewTasteKey, number>>({
    body: 50,
    tannin: 35,
    sweet: 40,
    acid: 55,
  });

  const [selectedAromas, setSelectedAromas] = useState<string[]>([]);

  const [customAromas, setCustomAromas] = useState<string[]>([]);
  const [isAddingAroma, setIsAddingAroma] = useState(false);
  const [newAroma, setNewAroma] = useState('');

  const [error, setError] = useState<string>('');

  const [submitting, setSubmitting] = useState(false);

  const allAromas = useMemo(() => {
    const set = new Set<string>([...DEFAULT_AROMAS, ...customAromas]);
    return Array.from(set);
  }, [customAromas]);

  const tasteLabel = useMemo(
    () => ({
      body: ['바디감', '가벼워요', '진해요'],
      tannin: ['타닌', '부드러워요', '떫어요'],
      sweet: ['당도', '드라이해요', '달아요'],
      acid: ['산미', '약해요', '많아요'],
    }),
    [],
  );

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

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="리뷰 등록"
      maxWidthClassName="max-w-[620px]"
    >
      <div className="space-y-6">
        {/* wine header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-100">
            {wineImageUrl ? (
              <img src={wineImageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">🍷</div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">{wineName}</div>
            <StarRating value={rating} onChange={setRating} />
          </div>
        </div>

        {/* content */}
        <div className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="후기를 작성해 주세요"
            className="h-28 w-full resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-violet-400"
          />
        </div>

        {/* taste sliders */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-gray-900">와인의 맛은 어땠나요?</div>

          {(['body', 'tannin', 'sweet', 'acid'] as ReviewTasteKey[]).map((k) => {
            const [title, left, right] = tasteLabel[k];
            return (
              <div key={k} className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="min-w-10 rounded-md bg-gray-100 px-2 py-1 text-[11px] text-gray-600">
                    {title}
                  </span>
                  <span>{left}</span>
                  <div className="flex-1" />
                  <span>{right}</span>
                </div>

                {/* 팀원 Slider로 교체 가능 */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={taste[k]}
                  onChange={(e) =>
                    setTaste((prev) => ({
                      ...prev,
                      [k]: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>
            );
          })}
        </div>

        {/* aroma chips */}
        <div className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">기억에 남는 향이 있나요?</div>
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
                    'rounded-full px-3 py-2 text-xs font-medium transition',
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
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-gray-300 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
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
                          setNewAroma('');
                          setIsAddingAroma(false);
                        }
                      }}
                      placeholder="향 입력"
                      className="w-16 bg-transparent text-xs outline-none"
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
          className="h-12 w-full rounded-xl bg-violet-600 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
        >
          {submitting ? '리뷰 등록 중...' : '리뷰 남기기'}
        </button>
      </div>
    </BaseModal>
  );
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="mt-1 flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const idx = i + 1;
        const active = idx <= value;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onChange(idx)}
            className={active ? 'text-violet-600' : 'text-gray-300'}
            aria-label={`star-${idx}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
