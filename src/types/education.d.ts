type Part = 'ALL' | 'FE' | 'BE' | 'D' | 'PM';

export interface PartEduBoardQuery {
  part: Part;
  cardinalNumber: number | undefined;
  pageNumber: number;
  pageSize: number;
}

export interface PartEduContent {
  id: number;
  name: string;
  parts: Part[];
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

export interface GetEduBoardResponse {
  size: number;
  content: PartEduContent[];
  number: number;
  sort: PartBoardSort;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
