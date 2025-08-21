import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postBoardNotice from '@/api/postBoardNotice';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '@/components/common/ToastMessage';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import StudyWriteTemplate from '@/components/Board/StudyWriteTemplate';
import getHeaderTitle from '@/utils/getHeaderTitle';

export interface originFile {
  fileId: number;
  fileName: string;
  fileUrl: string;
}

const PartEdit = () => {
  const navigate = useNavigate();
  const { postId, category, part } = useParams();

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];

  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [originFiles, setOriginFiles] = useState<originFile[]>([]);

  const isTitleEmpty = title.trim() === '';
  const isContentEmpty = content.trim() === '';
  const numericPostId = postId ? parseInt(postId, 10) : 0;

  const { boardDetailInfo } = useGetBoardDetail(path, numericPostId);

  useEffect(() => {
    setTitle(boardDetailInfo?.title ?? '');
    setContent(boardDetailInfo?.content ?? '');
    setOriginFiles(boardDetailInfo?.fileUrls ?? []);
    setSelectedCardinal(boardDetailInfo?.cardinalNumber ?? null);
    setSelectedStudy(boardDetailInfo?.studyName ?? null);
    setSelectedWeek(boardDetailInfo?.week ?? null);
  }, [boardDetailInfo]);

  const onSave = async () => {
    if (isTitleEmpty) {
      toastInfo('제목을 입력해주세요.');
      return;
    }
    if (isContentEmpty) {
      toastInfo('내용을 입력해주세요.');
      return;
    }

    try {
      const postType = 'editPart';

      if (title.length > 255) {
        toastError('제목을 255자 이내로 작성해주세요.');
        return;
      }

      if (content.length > 65000) {
        toastError('내용을 65,000자 이내로 작성해주세요.');
        return;
      }

      await postBoardNotice({
        originFiles,
        files,
        postData: {
          title,
          content,
          studyName: selectedStudy || undefined,
          week: selectedWeek || undefined,
          cardinalNumber: selectedCardinal || undefined,
          files: [],
        },
        postType,
        id: numericPostId,
      });
      toastSuccess('게시글이 수정되었습니다.');
      navigate(`/board/${category}/${part}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toastError(
        path === 'board'
          ? '게시글 작성 중 문제가 발생했습니다.'
          : '공지사항 작성 중 문제가 발생했습니다.',
      );
    }
  };

  if (!category || !part || !postId) {
    return <div>잘못된 경로입니다.</div>;
  }

  return (
    <StudyWriteTemplate
      category={category}
      headerTitle={getHeaderTitle(category, part)}
      selectedCardinal={selectedCardinal}
      setSelectedCardinal={setSelectedCardinal}
      selectedWeek={selectedWeek}
      setSelectedWeek={setSelectedWeek}
      selectedStudy={selectedStudy}
      setSelectedStudy={setSelectedStudy}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      files={files}
      setFiles={setFiles}
      originFiles={originFiles}
      setOriginFiles={setOriginFiles}
      onSave={onSave}
    />
  );
};

export default PartEdit;
