import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import usePostBoard from '@/hooks/mutation/usePostBoard';
import { PostRequestType } from '@/types/PostRequestType';
import EduWrite from '@/components/Board/EduWrite';
import { PartTypes } from '@/types/part';
import { toastError } from '@/components/common/ToastMessage';
import Breadcrumb from '@/components/common/Breadcrumb';
import EditGNB from '@/components/Navigation/EditGNB';
import { PostContainerWrapper } from '@/styles/board/BoardPost.styled';

type RealPart = Exclude<PartTypes, '' | 'ALL'>;
const REAL_PARTS: RealPart[] = ['FE', 'BE', 'D', 'PM'];

const EduPost = () => {
  const navigate = useNavigate();
  const { part: partParam } = useParams<{ part: PartTypes }>();
  const initialSelectedParts: RealPart[] =
    partParam &&
    partParam !== 'ALL' &&
    (REAL_PARTS as string[]).includes(partParam)
      ? [partParam as RealPart]
      : REAL_PARTS;

  const [title, setTitle] = useState('');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedPart, setSelectedPart] =
    useState<RealPart[]>(initialSelectedParts);
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const postBoardMutation = usePostBoard({
    onSuccess: () => {
      const backPart =
        selectedPart.length === REAL_PARTS.length || selectedPart.length === 0
          ? 'ALL'
          : selectedPart[0];
      navigate(`/board/education/${backPart}`);
    },
    onError: (message) => {
      toastError(message ?? '게시 중 오류가 발생했습니다.');
    },
  });

  const handleClickButton = () => {
    if (!title) {
      toastError('제목을 입력해주세요.');
      return;
    }
    if (!content) {
      toastError('내용을 입력해주세요.');
      return;
    }
    if (!selectedCardinal) {
      toastError('기수를 선택해주세요.');
      return;
    }

    const partsToSend: PartTypes[] =
      selectedPart.length === REAL_PARTS.length || selectedPart.length === 0
        ? ['ALL']
        : selectedPart;

    const postData: PostRequestType = {
      title,
      content,
      parts: partsToSend,
      cardinalNumber: selectedCardinal || undefined,
      files: [],
    };

    postBoardMutation.mutate({
      postData,
      files,
      postType: 'postEdu',
    });
  };

  return (
    <>
      <EditGNB onClickButton={handleClickButton} />
      <PostContainerWrapper>
        <Breadcrumb
          items={[
            { label: '게시판', path: '/board' },
            { label: '교육자료 글쓰기' },
          ]}
        />
        <EduWrite
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
        />
      </PostContainerWrapper>
    </>
  );
};

export default EduPost;
