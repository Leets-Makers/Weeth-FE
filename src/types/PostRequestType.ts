export interface CustomFiles {
  fileName: string;
  fileUrl: string;
}

type EduPart = '' | 'ALL' | 'FE' | 'BE' | 'D' | 'PM';

export interface PostRequestType {
  title: string;
  content: string;
  cardinal?: number | null;
  files: CustomFiles[];
  category?: string;
  studyName?: string;
  week?: number;
  parts?: EduPart[];
}
