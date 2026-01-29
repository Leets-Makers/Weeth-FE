import * as S from '@/styles/board/Board.styled';
import { useNavigate } from 'react-router-dom';
import Cardinal from '@/components/Board/EduMaterial/Cardinal';
import SlideEdu from '@/components/Board/EduMaterial/SlideEdu';
import { PartEduContent } from '@/types/education';
import ArrowRightIcon from '@/assets/images/ic_chevron_right.svg?react';

interface EduMaterialProps {
  data: PartEduContent[];
  selectedCardinal: number | null;
  onCardinalChange: (value: number | null) => void;
}

const EduMaterial = ({
  data,
  selectedCardinal,
  onCardinalChange,
}: EduMaterialProps) => {
  const navigate = useNavigate();

  const handleAllEdu = () => {
    navigate('/board/education/ALL');
  };

  return (
    <S.NoticePreviewContainer>
      <S.CardContainer>
        <S.EduTitle>
          <S.NoticeTextContainer>
            <S.NoticeTitleText>교육자료</S.NoticeTitleText>
            <S.AllText onClick={handleAllEdu}>
              전체보기 <ArrowRightIcon />
            </S.AllText>
          </S.NoticeTextContainer>
          <S.EduAddContent>
            참여하신 기수의 자료만 볼 수 있습니다.
          </S.EduAddContent>
        </S.EduTitle>
        <Cardinal value={selectedCardinal} onChange={onCardinalChange} />
      </S.CardContainer>
      <SlideEdu recentEdu={data} />
    </S.NoticePreviewContainer>
  );
};

export default EduMaterial;
