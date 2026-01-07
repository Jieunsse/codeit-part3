import { CardWine } from '@src/components/card/CardWine';

interface CardWineData {
  id: string;
  title: string;
  text: string;
  price: number;
  rating: number;
  reviewNumber: number;
  review: string;
}

export function CardWinetList({ items }: { items: CardWineData[] }) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-[20px]">
      {items.map((item) => (
        <CardWine
          key={item.id}
          title={item.title}
          text={item.text}
          price={item.price}
          rating={item.rating}
          reviewNumber={item.reviewNumber}
          review={item.review}
        />
      ))}
    </div>
  );
}
