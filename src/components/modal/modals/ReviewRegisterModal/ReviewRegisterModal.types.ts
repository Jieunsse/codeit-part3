export type ReviewTasteKey = 'body' | 'tannin' | 'sweet' | 'acid';

export type ReviewRegisterValue = {
  rating: number;
  content: string;
  taste: Record<ReviewTasteKey, number>; // 0~100
  aromas: string[];
};

export type ReviewRegisterInitialValue = Partial<ReviewRegisterValue>;

export type ReviewRegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;

  wineName: string;
  wineImageUrl?: string;

  onSubmit: (value: ReviewRegisterValue) => Promise<void> | void;

  titleText?: string;
  submitButtonText?: string;

  initialValue?: ReviewRegisterInitialValue;
};
