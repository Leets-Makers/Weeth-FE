import { useNavigate } from 'react-router-dom';
import SlideNotice from '@/components/Board/SlideNotice';
import * as S from '@/styles/board/Board.styled';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';
import Loading from '@/components/common/Loading';
import useCustomBack from '@/hooks/useCustomBack';

const NoticePreview = () => {
  useCustomBack('/board');

  const navigate = useNavigate();

  const handleAllNotice = () => {
    navigate('/board/notices');
  };

  const { recentNotices, error, recentNoticeLoading } = useGetRecentNotice();
  if (recentNoticeLoading) {
    return <Loading />;
  }

  return (
    <S.NoticePreviewContainer>
      <S.CardContainer>
        <S.NoticeTextContainer>
          <S.NoticeTitleText>공지사항</S.NoticeTitleText>
          <S.AllText onClick={handleAllNotice}>전체보기 &gt;</S.AllText>
        </S.NoticeTextContainer>
      </S.CardContainer>
      <SlideNotice error={error} recentNotices={recentNotices} />
    </S.NoticePreviewContainer>
  );
};

export default NoticePreview;
