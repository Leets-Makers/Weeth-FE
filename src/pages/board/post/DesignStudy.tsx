import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import StudyWriteTemplate from '@/components/Board/StudyWriteTemplate';
import postBoardNotice from '@/api/postBoardNotice';
import { PostRequestType } from '@/types/PostRequestType';

type CategorySlug = 'study' | 'article';
type CategoryEnum = 'StudyLog' | 'Article';

const slugToEnum = (s?: CategorySlug): CategoryEnum =>
  s === 'article' ? 'Article' : 'StudyLog';

const DesignStudy = () => {
  const navigate = useNavigate();
  const { category: slug } = useParams<{ category: CategorySlug }>();
  const category = slugToEnum(slug);

  const [title, setTitle] = useState('');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const onSave = async () => {
    try {
      const postData: PostRequestType = {
        title,
        content,
        category,
        studyName: selectedStudy || undefined,
        week: selectedWeek || undefined,
        cardinal: selectedCardinal || undefined,
        files: [],
      };

      await postBoardNotice({
        postData,
        files,
        postType: 'postBoard',
      });

      navigate(`/board/${slug}/D`);
    } catch (err) {
      console.error('게시 실패:', err);
      alert('게시 중 오류가 발생했습니다.');
    }
  };

  return (
    <StudyWriteTemplate
      category={category}
      headerTitle="D 스터디"
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
      onSave={onSave}
    />
  );
};

export default DesignStudy;
