import { FilterContainer } from '@src/domain/list/containers/FilterContainer';
import { WineRegisterButton } from './WineRegisterButton';

type WinesDesktopSidebarProps = {
  onOpenWineRegister: () => void;
};

export function WinesDesktopSidebar({ onOpenWineRegister }: WinesDesktopSidebarProps) {
  return (
    <aside className="hidden lg:block lg:w-[284px] lg:shrink-0">
      <div className="flex flex-col gap-6">
        <FilterContainer />
        <WineRegisterButton className="w-full" onClick={onOpenWineRegister} />
      </div>
    </aside>
  );
}
