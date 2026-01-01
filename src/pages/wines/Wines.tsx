import { RecommendedContainer } from '@src/domain/list/containers/RecommendedContainer';
import { InputWineListContainer } from '@src/domain/list/containers/InputWineListContainer';
import { FilterContainer } from '@src/domain/list/containers/FilterContainer';
export function Wines() {
  return (
    <div className="w-full">
      <header>
        <RecommendedContainer
          items={[
            { id: '1', rating: 4.8, title: '이달의 추천 와인' },
            { id: '2', rating: 4.9, title: '에디터 픽' },
          ]}
        />
      </header>
      <div className="flex w-full items-center justify-center">
        <FilterContainer />
        <InputWineListContainer
          items={[
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
          ]}
        />
      </div>
    </div>
  );
}
