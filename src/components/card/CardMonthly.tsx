import { Card } from './Card';
import { StarReview } from '../star/StarReview';
import { StarRating } from '../star/StarRating';

export function CardMonthly() {
  return (
    <Card>
      <Card.Header>
        <h2 className="text-2xl font-bold">Monthly</h2>
        <StarReview />
        <StarRating value={3} />
      </Card.Header>
    </Card>
  );
}
