import { Chips } from '../../../../chips/Chips';

type Props = {
  error: string;

  allAromas: string[];
  selectedAromas: string[];

  isAddingAroma: boolean;
  newAroma: string;

  maxSelect: number;
  maxTotal: number;

  onToggle: (tag: string) => void;

  onStartAdd: () => void;
  onChangeNew: (v: string) => void;

  onConfirmAdd: () => void;
  onCancelAdd: () => void;
};

export function ReviewAromaSection({
  error,
  allAromas,
  selectedAromas,
  isAddingAroma,
  newAroma,
  maxSelect,
  maxTotal,
  onToggle,
  onStartAdd,
  onChangeNew,
  onConfirmAdd,
  onCancelAdd,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="mt-10 text-[20px] leading-8 font-bold text-gray-800">
            기억에 남는 향이 있나요?
          </div>
          <div className="mt-1.5 text-xs text-gray-500">최대 {maxSelect}개 선택 가능</div>
        </div>
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <div className="flex flex-wrap gap-2">
        {allAromas.map((tag) => (
          <Chips
            key={tag}
            title={tag}
            selected={selectedAromas.includes(tag)}
            onClick={() => onToggle(tag)}
          />
        ))}

        {allAromas.length < maxTotal && (
          <>
            {!isAddingAroma ? (
              <button
                type="button"
                onClick={onStartAdd}
                className="flex items-center justify-center rounded-[50px] border border-dashed border-gray-300 px-[18px] py-2.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                aria-label="향 태그 추가"
              >
                +
              </button>
            ) : (
              <div className="flex items-center gap-1 rounded-full border border-violet-400 bg-white px-3 py-1">
                <input
                  autoFocus
                  value={newAroma}
                  onChange={(e) => onChangeNew(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      onConfirmAdd();
                    }
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      e.stopPropagation();
                      onCancelAdd();
                    }
                  }}
                  placeholder="향 입력"
                  className="w-16 bg-transparent text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={onConfirmAdd}
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

      {isAddingAroma && <div className="text-[11px] text-gray-400">Enter로 추가 · Esc로 취소</div>}
    </div>
  );
}
