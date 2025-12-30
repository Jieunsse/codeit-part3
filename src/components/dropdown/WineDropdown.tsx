import { DropdownBase } from './base/DropdownBase';
import { WINE_ITEMS } from './wine/data/wine.data';
import type { WineTypeDropdownProps } from './wine/types/wine.types';

/**
 * 와인 종류 선택을 위한 드롭다운 컴포넌트
 *
 * - Red / White / Sparkling 중 하나를 선택할 수 있습니다.
 * - 선택된 값은 onSelect 콜백을 통해 외부로 전달됩니다.
 * - 아이템 구성 및 UI 동작은 컴포넌트 내부에 캡슐화되어 있습니다.
 *
 * ### UI 특징
 * - 항목에 마우스를 올렸을 때만 강조 스타일이 적용됩니다.
 * - 선택 상태는 시각적으로 유지되지 않습니다.
 * - 텍스트는 좌측 정렬로 표시됩니다.
 *
 * @example
 * ```tsx
 * <WineTypeDropdown
 *   onSelect={(wineType) => {
 *     fetchWines({ type: wineType });
 *   }}
 * />
 * ```
 */
export function WineTypeDropdown({ onClick }: WineTypeDropdownProps) {
  return (
    <DropdownBase
      items={WINE_ITEMS}
      width={412}
      align="left"
      onItemClick={(item) => onClick(item.key as 'red' | 'white' | 'sparkling')}
    />
  );
}
