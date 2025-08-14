export interface PartSearchContent {
  id: number;
  name: string;
  part: string;
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

export interface EduSearchContent {
  id: number;
  name: string;
  parts: string[];
  position: string;
  role: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
  hasFile: boolean;
  isNew: boolean;
}

export interface NoticeSearchContent {
  id: number;
  name: string;
  position: string;
  role: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
  hasFile: boolean;
}

export interface PartApiResponse {
  code: number;
  message: string;
  data: {
    size: number;
    content: PartSearchContent[];
    number: number;
    first: boolean;
    last: boolean;
  };
}

export interface EduApiResponse {
  code: number;
  message: string;
  data: {
    size: number;
    content: EduSearchContent[];
    number: number;
    first: boolean;
    last: boolean;
  };
}

export interface NoticeApiResponse {
  code: number;
  message: string;
  data: {
    size: number;
    content: NoticeSearchContent[];
    number: number;
    first: boolean;
    last: boolean;
  };
}

export type SearchContent = {
  id: number;
  name: string;
  parts: string[];
  part: string;
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
};

type SearchRequestType = 'part' | 'education' | 'notices';
