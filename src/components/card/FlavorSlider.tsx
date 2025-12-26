export type ReviewTasteKey = 'body' | 'tannin' | 'sweet' | 'acid';
type TasteValue = Record<ReviewTasteKey, number>;

type FlavorSliderModalProps = {
  value: TasteValue;
  onChange: (next: TasteValue) => void;
};

type RowProps = {
  chip: string;
  left: string;
  right: string;
  value: number;
  onChange: (next: number) => void;
  ariaLabel: string;
};

const LABELS: Record<ReviewTasteKey, [string, string, string]> = {
  body: ['바디감', '가벼워요', '진해요'],
  tannin: ['타닌', '부드러워요', '떫어요'],
  sweet: ['당도', '드라이해요', '달아요'],
  acid: ['산미', '안셔요', '많이셔요'],
};

function Row({ chip, left, right, value, onChange, ariaLabel }: RowProps) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={[
          'flex items-center justify-center',
          'h-6 w-[54px]',
          'rounded-lg',
          'bg-white/90',
          'text-[14px] leading-6 font-semibold',
          'text-[#9FACBD]',
          'background-[rgba(242, 244, 248, 1)]',
          'shrink-0',
        ].join(' ')}
      >
        {chip}
      </div>

      <div className="flex flex-1 items-center">
        <div className="w-[92px] text-left text-[16px] leading-[26px] font-medium text-[#2D3034]">
          {left}
        </div>

        <div className="flex-1 px-4">
          <input
            aria-label={ariaLabel}
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="rangePurpleModal w-full"
          />
        </div>

        <div className="w-[92px] text-right text-[16px] leading-[26px] font-medium text-[#2D3034]">
          {right}
        </div>
      </div>
    </div>
  );
}

export function FlavorSliderModal({ value, onChange }: FlavorSliderModalProps) {
  const setOne = (key: ReviewTasteKey, next: number) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        {(Object.keys(LABELS) as ReviewTasteKey[]).map((k) => {
          const [chip, left, right] = LABELS[k];
          return (
            <Row
              key={k}
              chip={chip}
              left={left}
              right={right}
              value={value[k]}
              onChange={(n) => setOne(k, n)}
              ariaLabel={chip}
            />
          );
        })}
      </div>

      <style>{`
        .rangePurpleModal {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.9);
          box-shadow:
            inset 0 0 0 1px rgba(148, 163, 184, 0.35),
            0 6px 16px rgba(0,0,0,0.10);
          outline: none;
        }

        .rangePurpleModal::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #6f45d9;
          box-shadow: 0 8px 18px rgba(0,0,0,0.22);
          cursor: pointer;
        }

        .rangePurpleModal::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #6f45d9;
          border: none;
          box-shadow: 0 8px 18px rgba(0,0,0,0.22);
          cursor: pointer;
        }

        .rangePurpleModal::-moz-range-track {
          height: 6px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.9);
          box-shadow:
            inset 0 0 0 1px rgba(148, 163, 184, 0.35),
            0 6px 16px rgba(0,0,0,0.10);
        }
      `}</style>
    </div>
  );
}
