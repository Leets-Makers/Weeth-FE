export interface CardinalProps {
  selectedCardinal: number | null;
  setSelectedCardinal: React.Dispatch<React.SetStateAction<number | null>>;
  variant?: 'button' | 'container';
}

export interface DirectCardinalProps {
  selectedCardinal: number | null;
  setSelectedCardinal: (value: number, isCustom: boolean) => void;
  isForDues?: boolean;
  variant?: 'button' | 'container';
  placeholder?: string;
}
