import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import StudyWriteTemplate from '@/components/Board/StudyWriteTemplate';
import Breadcrumb from '@/components/common/Breadcrumb';
import EditGNB from '@/components/Navigation/EditGNB';
import usePostBoard from '@/hooks/mutation/board/usePostBoard';
import { PostRequestType } from '@/types/PostRequestType';
import { toastError } from '@/components/common/ToastMessage';
import { PostContainerWrapper } from '@/styles/board/BoardPost.styled';
import * as S from '@/styles/board/BoardDetail.styled';

type CategorySlug = 'study' | 'article';
type CategoryEnum = 'StudyLog' | 'Article';

const slugToEnum = (s?: CategorySlug): CategoryEnum =>
  s === 'article' ? 'Article' : 'StudyLog';

const PartPost = () => {
  const navigate = useNavigate();
  const { category: slug } = useParams<{
    category: CategorySlug;
  }>();
  const category = slugToEnum(slug);

  const [title, setTitle] = useState('');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedPart, setSelectedPart] = useState<string>('FE');
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const postBoardMutation = usePostBoard({
    onSuccess: () => {
      navigate(`/board/${slug}/${selectedPart}`);
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

    if (category === 'StudyLog') {
      if (!selectedCardinal) {
        toastError('기수를 선택해주세요.');
        return;
      }
      if (!selectedWeek) {
        toastError('주차를 선택해주세요.');
        return;
      }
      if (!selectedStudy) {
        toastError('스터디를 선택해주세요.');
        return;
      }
    } else if (!selectedCardinal) {
      toastError('기수를 선택해주세요.');
      return;
    }

    const postData: PostRequestType = {
      title,
      content,
      category,
      studyName: selectedStudy || undefined,
      week: selectedWeek || undefined,
      part: selectedPart,
      cardinalNumber: selectedCardinal || undefined,
      files: [],
    };

    postBoardMutation.mutate({
      postData,
      files,
      postType: 'postBoard',
    });
  };
  return (
    <S.Container>
      <EditGNB onClickButton={handleClickButton} />
      <PostContainerWrapper>
        <Breadcrumb
          items={[
            { label: '게시판', path: '/board' },
            {
              label:
                category === 'StudyLog' ? '스터디로그 글쓰기' : '아티클 글쓰기',
            },
          ]}
        />
        <StudyWriteTemplate
          category={category}
          title={title}
          setTitle={setTitle}
          selectedCardinal={selectedCardinal}
          setSelectedCardinal={setSelectedCardinal}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          selectedStudy={selectedStudy}
          setSelectedStudy={setSelectedStudy}
          selectedPart={selectedPart}
          setSelectedPart={setSelectedPart}
          content={content}
          setContent={setContent}
          files={files}
          setFiles={setFiles}
        />
      </PostContainerWrapper>
    </S.Container>
  );
};

export default PartPost;
