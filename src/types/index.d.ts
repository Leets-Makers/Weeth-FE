export type useMutationCallback = {
  onSuccess?: () => void;
  onMutate?: () => void;
  onSettled?: () => void;
  onError?: (message: string) => void;
};

export interface PageResponse<T> {
  content: T[];
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  numberOfElements: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
