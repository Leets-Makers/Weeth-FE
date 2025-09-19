import { useDraggable } from '@/hooks/useDraggable';
import * as S from '@/styles/board/Board.styled';
import Vector from '@/assets/images/ic_vector.svg?react';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toastError } from '@/components/common/ToastMessage';
import ViewAll from '@/assets/images/ic_view_all.svg?react';

interface Notice {
  id: number;
  title: string;
  content: string;
  commentCount: number;
}

interface SlideNoticeProps {
  error: string | null;
  recentNotices: Notice[];
}

const SlideNotice = ({ error, recentNotices }: SlideNoticeProps) => {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);

  const handleNoticeCard = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
  ) => {
    e.preventDefault();
    navigate(`/board/notices/${id}`);
  };

  useEffect(() => {
    if (error) {
      toastError('데이터를 불러오지 못했습니다.');
    }
  }, [error]);

  return (
    <S.ScrollContainer
      ref={scrollerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {error ? (
        <S.NoticeCard>데이터를 불러오지 못했습니다.</S.NoticeCard>
      ) : (
        recentNotices.map((notice) => (
          <S.NoticeCard
            key={notice.id}
            onClick={(e) => handleNoticeCard(e, notice.id)}
          >
            <>
              <S.NoticeTextBox>
                <S.NoticeTitle>{notice.title}</S.NoticeTitle>
                <S.NoticeContent>{notice.content}</S.NoticeContent>
              </S.NoticeTextBox>
              <S.NoticeBottomRow>
                <S.ReadMoreText>
                  자세히 <ViewAll />
                </S.ReadMoreText>
                <S.CommentContainer>
                  <Vector />
                  <S.CommentsText>{notice.commentCount}</S.CommentsText>
                </S.CommentContainer>
              </S.NoticeBottomRow>
            </>
          </S.NoticeCard>
        ))
      )}
    </S.ScrollContainer>
  );
};

export default SlideNotice;
