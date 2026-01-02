import { Search } from '@src/components/input/Search';
import { FilterIconButton } from './FilterIconButton';
import { WineRegisterButton } from './WineRegisterButton';

type WinesStickyControlsProps = {
  onOpenFilterModal: () => void;
  onOpenWineRegister: () => void;
};

export function WinesStickyControls({
  onOpenFilterModal,
  onOpenWineRegister,
}: WinesStickyControlsProps) {
  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur">
      {/* 태블릿(sm~md): 아이콘 - 검색 - 등록버튼 한 줄 */}
      <div className="flex hidden w-full flex-row items-center justify-between gap-3 py-3 sm:flex lg:hidden">
        <FilterIconButton
          onClick={onOpenFilterModal}
          className="shrink-0 cursor-pointer rounded-[8px] border-[1px] border-gray-300 p-[10px]"
        />
        <Search className="w-full max-w-[480px] flex-1" placeholder="와인을 검색해 보세요" />
        <WineRegisterButton className="min-w-[200px] shrink-0 px-6" onClick={onOpenWineRegister} />
      </div>

      {/* 모바일: 검색 인풋(위) / 아이콘(아래) */}
      <div className="flex w-full flex-col gap-3 py-3 sm:hidden">
        <Search className="w-full" placeholder="와인을 검색해 보세요" />
        <div className="flex items-center justify-between">
          <FilterIconButton
            onClick={onOpenFilterModal}
            className="shrink-0 cursor-pointer rounded-[8px] border-[1px] border-gray-300 p-[10px]"
          />
        </div>
      </div>

      {/* 데스크톱(lg+): sticky 영역에서는 아무것도 하지 않음(검색은 리스트 컬럼에서 렌더) */}
      <div className="hidden py-3 lg:block" />
    </div>
  );
}
