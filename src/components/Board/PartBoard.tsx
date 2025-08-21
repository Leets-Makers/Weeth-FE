import * as S from '@/styles/board/Board.styled';
import { useNavigate } from 'react-router-dom';
import PressedD from '@/assets/images/ic_board_D.svg';
import PressedBE from '@/assets/images/ic_board_BE.svg';
import PressedFE from '@/assets/images/ic_board_FE.svg';
import PressedPM from '@/assets/images/ic_board_PM.svg';
import PressedENTIRE from '@/assets/images/ic_pressed_board_ENTIRE.svg';
import DefaultD from '@/assets/images/ic_default_board_D.svg';
import DefaultBE from '@/assets/images/ic_default_board_BE.svg';
import DefaultFE from '@/assets/images/ic_default_board_FE.svg';
import DefaultPM from '@/assets/images/ic_default_board_PM.svg';
import DefaultENTIRE from '@/assets/images/ic_board_ENTIRE.svg';
import { useRef, useState } from 'react';
import { useDraggable } from '@/hooks/useDraggable';

type PartItem = {
  key: '' | 'FE' | 'BE' | 'D' | 'PM';
  url: 'ALL' | 'FE' | 'BE' | 'D' | 'PM';
  defaultImg: string;
  pressedImg: string;
};

const parts: PartItem[] = [
  {
    key: '',
    url: 'ALL',
    defaultImg: DefaultENTIRE,
    pressedImg: PressedENTIRE,
  },
  {
    key: 'FE',
    url: 'FE',
    defaultImg: DefaultFE,
    pressedImg: PressedFE,
  },
  {
    key: 'BE',
    url: 'BE',
    defaultImg: DefaultBE,
    pressedImg: PressedBE,
  },
  {
    key: 'D',
    url: 'D',
    defaultImg: DefaultD,
    pressedImg: PressedD,
  },
  {
    key: 'PM',
    url: 'PM',
    defaultImg: DefaultPM,
    pressedImg: PressedPM,
  },
];

const PartBoard = () => {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);

  const [pressedKey, setPressedKey] = useState<PartItem['key'] | null>(null);

  return (
    <S.NoticePreviewContainer>
      <S.CardContainer>
        <S.PartTitleText>파트 게시판</S.PartTitleText>
      </S.CardContainer>
      <S.ScrollContainer
        ref={scrollerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={(e) => {
          setPressedKey(null);
          onMouseUp(e);
        }}
        onMouseLeave={(e) => {
          setPressedKey(null);
          onMouseLeave(e);
        }}
      >
        <S.PartList>
          {parts.map((part) => {
            const isPressed = pressedKey === part.key;
            const imgSrc = isPressed ? part.pressedImg : part.defaultImg;

            return (
              <S.PartItem
                key={part.url}
                onMouseDown={() => setPressedKey(part.key)}
                onMouseUp={() => setPressedKey(null)}
                onMouseLeave={() => setPressedKey(null)}
                onClick={() => navigate(`/board/study/${part.url}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/board/study/${part.url}`);
                  }
                }}
              >
                <S.PartImage src={imgSrc} alt={part.key} />
                <S.PartLabel>{part.key}</S.PartLabel>
              </S.PartItem>
            );
          })}
        </S.PartList>
      </S.ScrollContainer>
    </S.NoticePreviewContainer>
  );
};

export default PartBoard;
