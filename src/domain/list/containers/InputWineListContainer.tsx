import { CardWinetList } from '../components/CardWinetList';

interface CardWineData {
  id: string;
  title: string;
  text: string;
  imageUrl?: string;
  price: number;
  rating: number;
  reviewNumber: number;
  review: string;
}

interface InputWineListContainerProps {
  items: CardWineData[];
  onItemClick?: (id: string) => void;
}

export function InputWineListContainer({ items, onItemClick }: InputWineListContainerProps) {
  return (
    <div className="flex flex-col items-start justify-center gap-[20px]">
      <CardWinetList items={items} onItemClick={onItemClick} />
    </div>
  );
}
