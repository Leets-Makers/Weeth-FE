import { useDraggable } from '@/hooks/useDraggable';
import * as S from '@/styles/board/Board.styled';
import Vector from '@/assets/images/ic_vector.svg?react';
import FileIcon from '@/assets/images/ic_file.svg?react';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toastError } from '@/components/common/ToastMessage';
import setPositionIcon from '@/hooks/setPositionIcon';
import formatDate from '@/hooks/formatDate';
import Loading from '../common/Loading';

interface Notice {
  id: number;
  title: string;
  content: string;
  name: string;
  commentCount: number;
  role: string;
  time: string;
  hasFile: boolean;
  position: string;
}

interface SlideNoticeProps {
  error: string | null;
  isLoading: boolean;
  recentNotices: Notice[];
}

const SlideNotice = ({ error, isLoading, recentNotices }: SlideNoticeProps) => {
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

  if (isLoading) {
    return <Loading />;
  }

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
            <S.NoticeTextBox>
              <S.NoticeTitle>{notice.title}</S.NoticeTitle>
              <S.NoticeContent>{notice.content}</S.NoticeContent>
            </S.NoticeTextBox>
            <S.NoticeBottomRow>
              <S.NoticeNameContainer>
                <S.PositionIcon
                  src={setPositionIcon(notice.role, notice.position)}
                  alt="포지션 아이콘"
                />
                <span>{notice.name}</span>
                <S.Divider />
                <span>{formatDate(notice.time)}</span>
                {notice.hasFile && (
                  <>
                    <S.Divider />
                    <FileIcon />
                  </>
                )}
              </S.NoticeNameContainer>

              <S.CommentContainer>
                <Vector />
                <S.CommentsText>{notice.commentCount}</S.CommentsText>
              </S.CommentContainer>
            </S.NoticeBottomRow>
          </S.NoticeCard>
        ))
      )}
    </S.ScrollContainer>
  );
};

export default SlideNotice;
