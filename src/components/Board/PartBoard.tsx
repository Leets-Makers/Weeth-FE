import * as S from '@/styles/board/Board.styled';
import { useNavigate } from 'react-router-dom';
import D from '@/assets/images/ic_board_D.svg';
import BE from '@/assets/images/ic_board_BE.svg';
import FE from '@/assets/images/ic_board_FE.svg';
import PM from '@/assets/images/ic_board_PM.svg';
import ENTIRE from '@/assets/images/ic_board_ENTIRE.svg';
import { useRef } from 'react';
import { useDraggable } from '@/hooks/useDraggable';

const parts = [
  { key: 'D', label: '디자인', image: D, url: 'design' },
  { key: 'BE', label: '백엔드', image: BE, url: 'back' },
  { key: 'FE', label: '프론트', image: FE, url: 'front' },
  { key: 'PM', label: '기획', image: PM, url: 'pm' },
  { key: '', label: '전체', image: ENTIRE, url: 'entire' },
];

const PartBoard = () => {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);

  return (
    <S.CardContainer>
      <S.PartTitleText>파트 게시판</S.PartTitleText>
      <S.ScrollContainer
        ref={scrollerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <S.PartList>
          {parts.map((part) => (
            <S.PartItem
              key={part.key}
              onClick={() => navigate(`/board/${part.url}`)}
            >
              <S.PartImage src={part.image} alt={part.key} />
              <S.PartLabel>{part.key}</S.PartLabel>
            </S.PartItem>
          ))}
        </S.PartList>
      </S.ScrollContainer>
    </S.CardContainer>
  );
};

export default PartBoard;
