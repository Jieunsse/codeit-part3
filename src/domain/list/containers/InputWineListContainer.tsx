import { CardWinetList } from '../components/CardWinetList';
import { Search } from '@src/components/input/Search';

interface CardWineData {
  id: string;
  title: string;
  text: string;
  price: number;
  rating: number;
  reviewNumber: number;
  review: string;
}
export function InputWineListContainer({ items }: { items: CardWineData[] }) {
  return (
    <div className="wf flex flex-col items-center justify-center gap-[20px] px-[30px] py-[30px]">
      <Search className="w-full" placeholder="와인을 검색해 보세요" />
      <CardWinetList items={items} />
    </div>
  );
}
