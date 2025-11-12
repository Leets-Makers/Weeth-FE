import { Part } from '@/types/education';

export interface BaseBoardContent {
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

export interface BoardContent extends BaseBoardContent {
  parts: string[];
}

export interface PartEduContent extends BaseBoardContent {
  parts: Part[];
}
