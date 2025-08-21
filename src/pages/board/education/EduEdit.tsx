import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import postBoardNotice from '@/api/postBoardNotice';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '@/components/common/ToastMessage';
import useGetBoardDetail from '@/api/useGetBoardDetail';
import EduWrite from '@/components/Board/EduWrite';
import { RealPart } from '@/types/part';
import { originFile } from '@/pages/board/part/PartEdit';

const EduEdit = () => {
  const navigate = useNavigate();
  const { postId, part } = useParams();

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[2];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedPart, setSelectedPart] = useState<RealPart[]>([]);
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
    setSelectedPart((boardDetailInfo?.parts ?? []) as RealPart[]);
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
          parts: selectedPart,
          cardinalNumber: selectedCardinal,
          files: [],
        },
        postType: 'editEdu',
        id: numericPostId,
      });
      toastSuccess('게시글이 수정되었습니다.');
      navigate(`/board/education/${part}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toastError(
        path === 'board'
          ? '게시글 작성 중 문제가 발생했습니다.'
          : '공지사항 작성 중 문제가 발생했습니다.',
      );
    }
  };

  return (
    <EduWrite
      headerTitle="교육자료"
      title={title}
      setTitle={setTitle}
      selectedCardinal={selectedCardinal}
      setSelectedCardinal={setSelectedCardinal}
      selectedPart={selectedPart}
      setSelectedPart={setSelectedPart}
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

export default EduEdit;
