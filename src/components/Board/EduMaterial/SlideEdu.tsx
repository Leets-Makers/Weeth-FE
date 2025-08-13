import { useDraggable } from '@/hooks/useDraggable';
import * as S from '@/styles/board/Board.styled';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Vector from '@/assets/images/ic_vector.svg?react';
import FileIcon from '@/assets/images/ic_file.svg?react';
import Part from '@/components/Board/EduMaterial/Part';
import { PartEduContent } from '@/api/useGetEducationBoard';
import { PartTypes } from '@/types/part';
import dayjs from 'dayjs';

interface SlideEduProps {
  recentEdu: PartEduContent[];
}

const SlideEdu = ({ recentEdu }: SlideEduProps) => {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);

  const formatMMDD = (iso?: string) => {
    if (!iso) return '00/00';
    const d = dayjs(iso);
    return d.isValid() ? d.format('MM/DD') : '00/00';
  };

  const handleEducationCard = (
    e: React.MouseEvent<HTMLDivElement>,
    part: string,
    id: number,
  ) => {
    e.preventDefault();
    navigate(`/education/${part}/${id}`);
  };

  return (
    <S.ScrollContainer
      ref={scrollerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {recentEdu.map((edu) => {
        const parts = (edu.parts?.length ? edu.parts : ['ALL']) as PartTypes[];
        return (
          <S.EduCard
            key={edu.id}
            onClick={(e) => handleEducationCard(e, parts[0], edu.id)}
          >
            <S.EduPart>
              {parts.map((p) => (
                <Part key={p} part={p} />
              ))}
            </S.EduPart>

            <S.EduCardTitle>{edu.title}</S.EduCardTitle>

            <S.NoticeBottomRow>
              <S.EduDateContainer>
                {formatMMDD(edu.time)}
                {edu.hasFile && ' | '}
                {edu.hasFile && <FileIcon />}
              </S.EduDateContainer>

              <S.CommentContainer>
                <Vector />
                <S.CommentsText>{edu.commentCount}</S.CommentsText>
              </S.CommentContainer>
            </S.NoticeBottomRow>
          </S.EduCard>
        );
      })}
    </S.ScrollContainer>
  );
};
export default SlideEdu;
