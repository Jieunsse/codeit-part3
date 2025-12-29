import type { RefObject } from 'react';

type Props = {
  contentRef: RefObject<HTMLDivElement | null>;
  isContentEmpty: boolean;
  onChangeText: (text: string) => void;
  onChangeEmpty: (empty: boolean) => void;
};

export function ReviewContentEditor({
  contentRef,
  isContentEmpty,
  onChangeText,
  onChangeEmpty,
}: Props) {
  return (
    <div className="mt-6 space-y-2">
      <div className="space-y-2">
        <div className="relative">
          {isContentEmpty && (
            <div className="pointer-events-none absolute top-4 left-5 text-[16px] text-gray-400">
              후기를 작성해 주세요
            </div>
          )}

          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const text = e.currentTarget.textContent ?? '';
              onChangeText(text);
              onChangeEmpty(text.length === 0);
            }}
            onFocus={() => {
              contentRef.current?.focus({ preventScroll: true });
            }}
            className="h-[120px] w-full overflow-y-auto rounded-xl border border-gray-500 px-5 py-4 text-[16px] whitespace-pre-wrap outline-none focus:border-violet-400"
          />
        </div>
      </div>
    </div>
  );
}
