export interface CustomFiles {
  fileName: string;
  fileUrl: string;
}

type EduPart = '' | 'ALL' | 'FE' | 'BE' | 'D' | 'PM';

export interface PostRequestType {
  title: string;
  content: string;
  cardinalNumber?: number | null;
  files: CustomFiles[];
  category?: string;
  studyName?: string;
  week?: number;
  part?: string;
  parts?: EduPart[];
}
