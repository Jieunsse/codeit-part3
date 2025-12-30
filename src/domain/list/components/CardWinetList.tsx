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
    <div>
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
