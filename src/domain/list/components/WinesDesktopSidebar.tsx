import { FilterContainer } from '@src/domain/list/containers/FilterContainer';
import { WineRegisterButton } from './WineRegisterButton';
import type { WineListFilterValue } from '../types/wineListFilter.types';

type WinesDesktopSidebarProps = {
  onOpenWineRegister: () => void;
  filterValue: WineListFilterValue;
  onChangeFilterValue: (next: WineListFilterValue) => void;
};

export function WinesDesktopSidebar({
  onOpenWineRegister,
  filterValue,
  onChangeFilterValue,
}: WinesDesktopSidebarProps) {
  return (
    <aside className="hidden lg:block lg:w-[284px] lg:shrink-0">
      <div className="flex flex-col gap-6">
        <FilterContainer value={filterValue} onChange={onChangeFilterValue} />
        <WineRegisterButton className="w-full" onClick={onOpenWineRegister} />
      </div>
    </aside>
  );
}
