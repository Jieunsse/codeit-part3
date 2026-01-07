import { RecommendedContainer } from '@src/domain/list/containers/RecommendedContainer';
import { InputWineListContainer } from '@src/domain/list/containers/InputWineListContainer';
import { Search } from '@src/components/input/Search';
import { useState } from 'react';
import { FilterModal, type FilterValue } from '@src/components/modal/modals/FilterModal';
import { WinesStickyControls } from '@src/domain/list/components/WinesStickyControls';
import { WinesDesktopSidebar } from '@src/domain/list/components/WinesDesktopSidebar';
import { WinesMobileFloatingRegisterButton } from '@src/domain/list/components/WinesMobileFloatingRegisterButton';
import {
  WineRegisterModal,
  type WineRegisterValue,
} from '@src/components/modal/modals/WineModal/WineRegisterModal';
export function Wines() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState<FilterValue | undefined>(undefined);
  const [isWineRegisterOpen, setIsWineRegisterOpen] = useState(false);

  const wineItems = [
    {
      id: '1',
      title: 'Wine 1',
      text: 'Text 1',
      price: 10000,
      rating: 4.8,
      reviewNumber: 100,
      review: 'Review 1',
    },
    {
      id: '2',
      title: 'Wine 2',
      text: 'Text 2',
      price: 20000,
      rating: 4.7,
      reviewNumber: 200,
      review: 'Review 2',
    },
    {
      id: '3',
      title: 'Wine 3',
      text: 'Text 3',
      price: 30000,
      rating: 4.6,
      reviewNumber: 300,
      review: 'Review 3',
    },
  ] as const;

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);
  const openWineRegister = () => setIsWineRegisterOpen(true);
  const closeWineRegister = () => setIsWineRegisterOpen(false);

  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-[1140px] flex-col gap-6 px-[30px] py-6 pb-24 sm:pb-6 lg:gap-8">
        <header className="w-full">
          <RecommendedContainer
            items={[
              { id: '1', rating: 4.8, title: '이달의 추천 와인' },
              { id: '2', rating: 4.9, title: '에디터 픽' },
            ]}
          />
        </header>

        <WinesStickyControls
          onOpenFilterModal={openFilterModal}
          onOpenWineRegister={openWineRegister}
        />

        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <WinesDesktopSidebar onOpenWineRegister={openWineRegister} />

          <section className="w-full min-w-0 flex-1">
            {/* PC(lg+): 카드 리스트와 같은 컬럼/같은 너비의 검색창 */}
            <div className="hidden pb-4 lg:block">
              <Search className="w-full" placeholder="와인을 검색해 보세요" />
            </div>
            <InputWineListContainer items={[...wineItems]} />
          </section>
        </div>
      </div>

      <WinesMobileFloatingRegisterButton onOpenWineRegister={openWineRegister} />

      <FilterModal
        key={isFilterModalOpen ? 'open' : 'closed'}
        isOpen={isFilterModalOpen}
        onClose={closeFilterModal}
        initialValue={filterValue}
        onApply={(value) => setFilterValue(value)}
        maxPrice={30000000}
      />

      <WineRegisterModal
        isOpen={isWineRegisterOpen}
        onClose={closeWineRegister}
        onSubmit={(value: WineRegisterValue) => {
          // TODO: 실제 API 연동 시 여기서 등록 요청 후 리스트 리프레시
          console.log('wine register submit', value);
        }}
      />
    </div>
  );
}
