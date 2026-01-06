export interface CardReviewModel {
  username: string;
  createdAt: string;
  text: string;
  chips: {
    title: string;
  }[];
  mainChip: {
    label: string;
    value: number;
  };
  flavorValue: {
    body: number;
    tannin: number;
    sweet: number;
    acid: number;
  };
}
