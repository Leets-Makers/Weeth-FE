import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import StudyWriteTemplate from '@/components/Board/StudyWriteTemplate';
import Breadcrumb from '@/components/common/Breadcrumb';
import EditGNB from '@/components/Navigation/EditGNB';
import postBoardNotice from '@/api/postBoardNotice';
import { PostRequestType } from '@/types/PostRequestType';
import { toastError } from '@/components/common/ToastMessage';

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

  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const part = pathArray[3];

  const [title, setTitle] = useState('');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const handleClickButton = async () => {
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

    try {
      const postData: PostRequestType = {
        title,
        content,
        category,
        studyName: selectedStudy || undefined,
        week: selectedWeek || undefined,
        part,
        cardinalNumber: selectedCardinal || undefined,
        files: [],
      };

      await postBoardNotice({
        postData,
        files,
        postType: 'postBoard',
      });

      navigate(`/board/${slug}/${part}`);
    } catch (err) {
      console.error('게시 실패:', err);
      alert('게시 중 오류가 발생했습니다.');
    }
  };
  return (
    <>
      <EditGNB onClickButton={handleClickButton} />
      <Breadcrumb
        items={[
          { label: '게시판', path: '/board' },
          { label: `${part} 파트게시판`, path: `/board/study/${part}` },
          { label: '글쓰기' },
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
        content={content}
        setContent={setContent}
        files={files}
        setFiles={setFiles}
      />
    </>
  );
};

export default PartPost;
