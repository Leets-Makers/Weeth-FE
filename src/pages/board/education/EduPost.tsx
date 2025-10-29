import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useState } from 'react';
import postBoardNotice from '@/api/postBoardNotice';
import { PostRequestType } from '@/types/PostRequestType';
import EduWrite from '@/components/Board/EduWrite';
import { PartTypes } from '@/types/part';
import { toastError } from '@/components/common/ToastMessage';

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

  const onSave = useCallback(async () => {
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

    try {
      const postData: PostRequestType = {
        title,
        content,
        parts: partsToSend,
        cardinalNumber: selectedCardinal || undefined,
        files: [],
      };

      await postBoardNotice({
        postData,
        files,
        postType: 'postEdu',
      });

      const backPart = partParam ?? 'ALL';
      navigate(`/board/education/${backPart}`);
    } catch (err) {
      console.error('게시 실패:', err);
      toastError('게시 중 오류가 발생했습니다.');
    }
  }, [title, content, selectedCardinal]);

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
      onSave={onSave}
    />
  );
};

export default EduPost;
