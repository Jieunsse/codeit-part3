import { RecommendedContainer } from '@src/domain/list/containers/RecommendedContainer';
import { InputWineListContainer } from '@src/domain/list/containers/InputWineListContainer';
import { Search } from '@src/components/input/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterModal, type FilterValue } from '@src/components/modal/modals/FilterModal';
import {
  WineRegisterModal,
  type WineRegisterValue,
} from '@src/components/modal/modals/WineRegisterModal';
import { WinesStickyControls } from '@src/domain/list/components/WinesStickyControls';
import { WinesDesktopSidebar } from '@src/domain/list/components/WinesDesktopSidebar';
import { WinesMobileFloatingRegisterButton } from '@src/domain/list/components/WinesMobileFloatingRegisterButton';
import { useRecommendedWines } from './hooks/useRecommendedWines';
import { toRecommendedItems } from '@src/domain/list/mapper/recommendedWines.mapper';
import { useWineList } from './hooks/useWineList';
import { toWineListCardItems } from '@src/domain/list/mapper/wineList.mapper';
import { DEFAULT_WINE_LIST_FILTER_VALUE } from '@src/domain/list/types/wineListFilter.types';
import { createWine } from './apis/wines';
export function Wines() {
  const navigate = useNavigate();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState<FilterValue>(DEFAULT_WINE_LIST_FILTER_VALUE);
  const [isWineRegisterOpen, setIsWineRegisterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchName, setSearchName] = useState(''); // 실제 검색 실행 값(엔터/버튼 submit 시만 갱신)

  const {
    data: recommendedWines,
    isLoading: isRecommendedWinesLoading,
    error: recommendedWinesError,
  } = useRecommendedWines();

  const selectedType = filterValue.types?.[0];
  const apiWineType =
    selectedType === 'Red'
      ? 'RED'
      : selectedType === 'White'
        ? 'WHITE'
        : selectedType === 'Sparkling'
          ? 'SPARKLING'
          : undefined;

  const apiRating =
    filterValue.rating === '4.8-5.0'
      ? 5.0
      : filterValue.rating === '4.5-4.8'
        ? 4.8
        : filterValue.rating === '4.0-4.5'
          ? 4.5
          : filterValue.rating === '3.0-4.0'
            ? 4.0
            : undefined;

  const {
    data: wines,
    error: winesError,
    refetch: refetchWines,
  } = useWineList({
    limit: 10,
    type: apiWineType,
    minPrice: filterValue.priceMin,
    maxPrice: filterValue.priceMax,
    rating: apiRating,
    name: searchName.trim() === '' ? undefined : searchName.trim(),
  });

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);
  const openWineRegister = () => setIsWineRegisterOpen(true);
  const closeWineRegister = () => setIsWineRegisterOpen(false);
  const submitSearch = () => setSearchName(searchInput);

  if (recommendedWinesError) {
    console.error('추천 와인 조회 실패', recommendedWinesError);
  }

  const recommendedItems = !isRecommendedWinesLoading ? toRecommendedItems(recommendedWines) : [];

  if (winesError) {
    console.error('와인 목록 조회 실패', winesError);
  }

  const wineItems = toWineListCardItems(wines);
  const handleWineCardClick = (id: string) => navigate(`/wines/${id}`);

  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-[1140px] flex-col gap-6 px-[30px] py-6 pb-24 sm:pb-6 lg:gap-8">
        <header className="w-full">
          <RecommendedContainer items={recommendedItems} />
        </header>

        <WinesStickyControls
          onOpenFilterModal={openFilterModal}
          onOpenWineRegister={openWineRegister}
          searchInput={searchInput}
          onChangeSearchInput={setSearchInput}
          onSubmitSearch={submitSearch}
        />

        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <WinesDesktopSidebar
            onOpenWineRegister={openWineRegister}
            filterValue={filterValue}
            onChangeFilterValue={setFilterValue}
          />

          <section className="w-full min-w-0 flex-1">
            {/* PC(lg+): 카드 리스트와 같은 컬럼/같은 너비의 검색창 */}
            <div className="hidden pb-4 lg:block">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSearch();
                }}
                className="w-full"
              >
                <Search
                  className="w-full flex-1"
                  placeholder="와인을 검색해 보세요"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  iconButtonType="submit"
                />
              </form>
            </div>
            <InputWineListContainer items={wineItems} onItemClick={handleWineCardClick} />
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
        onSubmit={async (value: WineRegisterValue) => {
          await createWine({
            name: value.name,
            region: value.origin,
            price: value.price === '' ? 0 : value.price,
            type:
              value.type === 'Red'
                ? 'RED'
                : value.type === 'White'
                  ? 'WHITE'
                  : value.type === 'Sparkling'
                    ? 'SPARKLING'
                    : value.type,
            photoFile: value.photoFile,
          });
          refetchWines();
        }}
      />
    </div>
  );
}
