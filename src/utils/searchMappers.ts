import {
  EduSearchContent,
  NoticeSearchContent,
  PartSearchContent,
  SearchContent,
} from '@/types/search';

export const mapPartToBoard = (r: PartSearchContent): SearchContent => ({
  id: r.id,
  name: r.name,
  title: r.title,
  content: r.content,
  time: r.time ?? '',
  commentCount: r.commentCount ?? 0,
  hasFile: !!r.hasFile,
  position: r.position,
  role: r.role,
  isNew: !!r.isNew,
  studyName: r.studyName ?? '',
  week: r.week ?? 0,
  parts: [r.part],
  part: r.part ?? '',
});

export const mapEduToBoard = (r: EduSearchContent): SearchContent => {
  const parts = r.parts ?? [];
  return {
    id: r.id,
    name: r.name,
    title: r.title,
    content: r.content,
    time: r.time ?? '',
    commentCount: r.commentCount ?? 0,
    hasFile: !!r.hasFile,
    position: r.position,
    role: r.role,
    isNew: !!r.isNew,
    studyName: '',
    week: 0,
    parts,
    part: parts[0] ?? '',
  };
};

export const mapNoticeToBoard = (r: NoticeSearchContent): SearchContent => ({
  id: r.id,
  name: r.name,
  title: r.title,
  content: r.content,
  time: r.time ?? '',
  commentCount: r.commentCount ?? 0,
  hasFile: !!r.hasFile,
  position: r.position,
  role: r.role,
  isNew: false,
  studyName: '',
  week: 0,
  parts: [],
  part: '',
});
