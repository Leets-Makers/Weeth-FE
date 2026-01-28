import { useNavigate } from 'react-router-dom';
import SlideNotice from '@/components/Board/SlideNotice';
import * as S from '@/styles/board/Board.styled';
import Loading from '@/components/common/Loading';
import useCustomBack from '@/hooks/useCustomBack';
import { BoardContent } from '@/types/board';
import ArrowRightIcon from '@/assets/images/ic_chevron_right.svg?react';

interface NoticePreviewProps {
  data: BoardContent[] | undefined;
  error?: string | null;
}

const NoticePreview = ({ data, error }: NoticePreviewProps) => {
  useCustomBack('/board');

  const navigate = useNavigate();

  const handleAllNotice = () => {
    navigate('/board/notices');
  };

  if (!data) return <Loading />;

  return (
    <S.NoticePreviewContainer>
      <S.CardContainer>
        <S.NoticeTextContainer>
          <S.NoticeTitleText>공지사항</S.NoticeTitleText>
          <S.AllText onClick={handleAllNotice}>
            전체보기 <ArrowRightIcon />
          </S.AllText>
        </S.NoticeTextContainer>
      </S.CardContainer>
      <SlideNotice
        error={error ?? null}
        recentNotices={data}
        isLoading={false}
      />
    </S.NoticePreviewContainer>
  );
};

export default NoticePreview;
