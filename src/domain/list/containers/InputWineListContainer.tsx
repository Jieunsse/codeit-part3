import { CardWinetList } from '../components/CardWinetList';
import { CardDetail } from '@src/components/card/CardDetail';
import { CardMylist } from '@src/components/card/CardMylist';
interface CardWineData {
  id: string;
  title: string;
  text: string;
  price: number;
  rating: number;
  reviewNumber: number;
  review: string;
}

interface InputWineListContainerProps {
  items: CardWineData[];
}

export function InputWineListContainer({ items }: InputWineListContainerProps) {
  return (
    <div className="flex flex-col items-start justify-center gap-[20px]">
      <CardWinetList items={items} />
      <CardDetail />
      <CardMylist />
    </div>
  );
}
