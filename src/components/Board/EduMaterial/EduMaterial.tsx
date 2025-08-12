import * as S from '@/styles/board/Board.styled';
import { useNavigate } from 'react-router-dom';
import Cardinal from '@/components/Board/EduMaterial/Cardinal';
import SlideEdu from '@/components/Board/EduMaterial/SlideEdu';
import useGetEducationBoard from '@/api/useGetEducationBoard';
import { useState } from 'react';

const EduMaterial = () => {
  const navigate = useNavigate();
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const handleAllEdu = () => {
    navigate('/board/education/ALL');
  };

  const { data } = useGetEducationBoard({
    part: 'ALL',
    cardinalNumber: selectedCardinal || undefined,
    pageSize: 10,
    pageNumber: 0,
  });
  const recentEdu = data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <S.NoticePreviewContainer>
      <S.CardContainer>
        <S.EduTitle>
          <S.NoticeTextContainer>
            <S.NoticeTitleText>교육자료</S.NoticeTitleText>
            <S.AllText onClick={handleAllEdu}>전체보기 &gt;</S.AllText>
          </S.NoticeTextContainer>
          <S.EduAddContent>
            참여하신 기수의 자료만 볼 수 있습니다.
          </S.EduAddContent>
        </S.EduTitle>
        <Cardinal value={selectedCardinal} onChange={setSelectedCardinal} />
      </S.CardContainer>
      <SlideEdu recentEdu={recentEdu} />
    </S.NoticePreviewContainer>
  );
};

export default EduMaterial;
