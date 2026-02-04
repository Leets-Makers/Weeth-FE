import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import usePostBoard from '@/hooks/mutation/board/usePostBoard';
import useBoardDetail from '@/hooks/queries/board/useBoardDetail';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '@/components/common/ToastMessage';
import StudyWriteTemplate from '@/components/Board/StudyWriteTemplate';
import Breadcrumb from '@/components/common/Breadcrumb';
import EditGNB from '@/components/Navigation/EditGNB';
import * as S from '@/styles/board/PartBoard.styled';
import { PostContainerWrapper } from '@/styles/board/BoardPost.styled';

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

  const type = path === 'notices' ? 'notices' : 'board';
  const { data: boardDetailInfo } = useBoardDetail(type, numericPostId);

  useEffect(() => {
    setTitle(boardDetailInfo?.title ?? '');
    setContent(boardDetailInfo?.content ?? '');
    setOriginFiles(boardDetailInfo?.fileUrls ?? []);
    setSelectedCardinal(boardDetailInfo?.cardinalNumber ?? null);
    setSelectedStudy(boardDetailInfo?.studyName ?? null);
    setSelectedWeek(boardDetailInfo?.week ?? null);
  }, [boardDetailInfo]);

  const postBoardMutation = usePostBoard({
    onSuccess: () => {
      toastSuccess('게시글이 수정되었습니다.');
      navigate(`/board/${category}/${part}`);
    },
    onError: (message) => {
      toastError(
        message ??
          (path === 'board'
            ? '게시글 수정 중 문제가 발생했습니다.'
            : '공지사항 수정 중 문제가 발생했습니다.'),
      );
    },
  });

  const handleClickButton = () => {
    if (isTitleEmpty) {
      toastInfo('제목을 입력해주세요.');
      return;
    }
    if (isContentEmpty) {
      toastInfo('내용을 입력해주세요.');
      return;
    }

    const postType = 'editPart';

    if (title.length > 255) {
      toastError('제목을 255자 이내로 작성해주세요.');
      return;
    }

    if (content.length > 65000) {
      toastError('내용을 65,000자 이내로 작성해주세요.');
      return;
    }

    postBoardMutation.mutate({
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
  };

  if (!category || !part || !postId) {
    return <div>잘못된 경로입니다.</div>;
  }

  return (
    <S.Container>
      <EditGNB onClickButton={handleClickButton} save />
      <PostContainerWrapper>
        <Breadcrumb
          items={[
            { label: '게시판', path: '/board' },
            { label: `${part} 파트게시판`, path: `/board/study/${part}` },
            { label: '글쓰기 수정' },
          ]}
        />
        <StudyWriteTemplate
          category={category}
          selectedPart={part}
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
        />
      </PostContainerWrapper>
    </S.Container>
  );
};

export default PartEdit;
