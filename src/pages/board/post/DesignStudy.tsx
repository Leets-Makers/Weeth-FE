import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import StudyWriteTemplate from '@/components/Board/StudyWriteTemplate';

const DesignStudy = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');

  const [title, setTitle] = useState('');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(
    Number(cardinal) || null,
  );
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const onSave = () => {
    navigate('/board/design');
  };

  return (
    <StudyWriteTemplate
      headerTitle="DE 스터디"
      title={title}
      setTitle={setTitle}
      selectedCardinal={selectedCardinal}
      setSelectedCardinal={setSelectedCardinal}
      selectedWeek={selectedWeek}
      setSelectedWeek={setSelectedWeek}
      selectedStudy={selectedStudy}
      setSelectedStudy={setSelectedStudy}
      onSave={onSave}
    />
  );
};

export default DesignStudy;
