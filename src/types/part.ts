export type PartTypes = '' | 'ALL' | 'FE' | 'BE' | 'D' | 'PM';
export type Part = Exclude<PartTypes, ''>;
export type RealPart = Exclude<PartTypes, '' | 'ALL'>;

export const REAL_PARTS: RealPart[] = ['FE', 'BE', 'D', 'PM'];

export const PART_LABEL: Record<PartTypes, string> = {
  '': '파트',
  ALL: '전체',
  FE: 'FE',
  BE: 'BE',
  D: 'D',
  PM: 'PM',
};
