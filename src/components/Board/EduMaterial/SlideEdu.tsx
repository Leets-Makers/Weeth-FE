import { useDraggable } from '@/hooks/useDraggable';
import * as S from '@/styles/board/Board.styled';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Vector from '@/assets/images/ic_vector.svg?react';
import FileIcon from '@/assets/images/ic_file.svg?react';
import Part from '@/components/Board/EduMaterial/Part';

interface Notice {
  id: number;
  title: string;
  content: string;
}

interface SlideNoticeProps {
  error: string | null;
  recentNotices: Notice[];
}

// 아직 교육 자료 API가 없어서 임의로 공지사항과 연결해둠
const SlideEdu = ({ error, recentNotices }: SlideNoticeProps) => {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);

  const handleNoticeCard = (
    e: React.MouseEvent<HTMLDivElement>,
    id: number,
  ) => {
    e.preventDefault();
    // navigate(`/education/${id}`);
    navigate(`/notice/${id}`);
  };

  return (
    <S.ScrollContainer
      ref={scrollerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {error ? (
        <S.EduCard>데이터를 불러오지 못했습니다.</S.EduCard>
      ) : (
        recentNotices.map((notice) => (
          <S.EduCard
            key={notice.id}
            onClick={(e) => handleNoticeCard(e, notice.id)}
          >
            <S.EduPart>
              <Part part="ALL" />
              <Part part="BE" />
            </S.EduPart>
            <S.EduCardTitle>{notice.title}</S.EduCardTitle>
            <S.NoticeBottomRow>
              <S.EduDateContainer>
                00/00 |
                <FileIcon />
              </S.EduDateContainer>
              <S.CommentContainer>
                <Vector />
                <S.CommentsText>3</S.CommentsText>
              </S.CommentContainer>
            </S.NoticeBottomRow>
          </S.EduCard>
        ))
      )}
    </S.ScrollContainer>
  );
};
export default SlideEdu;
