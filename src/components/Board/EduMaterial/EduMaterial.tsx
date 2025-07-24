import * as S from '@/styles/board/Board.styled';
import { useNavigate } from 'react-router-dom';
import Cardinal from '@/components/Board/EduMaterial/Cardinal';
import SlideEdu from '@/components/Board/EduMaterial/SlideEdu';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';
import Loading from '@/components/common/Loading';

const EduMaterial = () => {
  const navigate = useNavigate();
  const handleAllEdu = () => {
    navigate('/education');
  };

  const { recentNotices, error, recentNoticeLoading } = useGetRecentNotice();
  if (recentNoticeLoading) {
    return <Loading />;
  }

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
        <Cardinal />
      </S.CardContainer>
      <SlideEdu error={error} recentNotices={recentNotices} />
    </S.NoticePreviewContainer>
  );
};

export default EduMaterial;
