export interface PartBoardQuery {
  part: string;
  category: string;
  cardinalNumber?: number;
  week?: number;
  studyName?: string;
  pageNumber: number;
  pageSize: number;
}

export interface PartBoardContent {
  id: number;
  name: string;
  position: string;
  role: string;
  title: string;
  content: string;
  studyName: string;
  week: number;
  time: string;
  commentCount: number;
  hasFile: boolean;
  isNew: boolean;
}

export interface PartBoardSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: PartBoardSort;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
}

export interface GetPartBoardResponse {
  size: number;
  content: PartBoardContent[];
  sort: PartBoardSort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
