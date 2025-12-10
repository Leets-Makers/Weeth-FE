import * as S from '@/styles/board/Board.styled';
import { useNavigate } from 'react-router-dom';
import PressedD from '@/assets/images/ic_board_D.svg?react';
import PressedBE from '@/assets/images/ic_board_BE.svg?react';
import PressedFE from '@/assets/images/ic_board_FE.svg?react';
import PressedPM from '@/assets/images/ic_board_PM.svg?react';
import DefaultD from '@/assets/images/ic_default_board_D.svg?react';
import DefaultBE from '@/assets/images/ic_default_board_BE.svg?react';
import DefaultFE from '@/assets/images/ic_default_board_FE.svg?react';
import DefaultPM from '@/assets/images/ic_default_board_PM.svg?react';
import { useState } from 'react';
import type { ComponentType, SVGProps } from 'react';

type SvgCmp = ComponentType<SVGProps<SVGSVGElement>>;

type PartItem = {
  key: '' | 'FE' | 'BE' | 'D' | 'PM';
  url: 'ALL' | 'FE' | 'BE' | 'D' | 'PM';
  defaultIcon: SvgCmp;
  pressedIcon: SvgCmp;
};

const parts: PartItem[] = [
  {
    key: 'FE',
    url: 'FE',
    defaultIcon: DefaultFE,
    pressedIcon: PressedFE,
  },
  {
    key: 'BE',
    url: 'BE',
    defaultIcon: DefaultBE,
    pressedIcon: PressedBE,
  },
  {
    key: 'D',
    url: 'D',
    defaultIcon: DefaultD,
    pressedIcon: PressedD,
  },
  {
    key: 'PM',
    url: 'PM',
    defaultIcon: DefaultPM,
    pressedIcon: PressedPM,
  },
];

const PartBoard = () => {
  const navigate = useNavigate();
  const [pressedKey, setPressedKey] = useState<PartItem['key'] | null>(null);

  return (
    <S.PartPreviewContainer>
      <S.PartTitleText>파트 게시판</S.PartTitleText>
      <S.PartBoardContainer>
        <S.PartList>
          {parts.map((part) => {
            const isPressed = pressedKey === part.key;
            const Icon = isPressed ? part.pressedIcon : part.defaultIcon;

            return (
              <S.PartItem
                key={part.url}
                onMouseDown={() => setPressedKey(part.key)}
                onMouseUp={() => setPressedKey(null)}
                onMouseLeave={() => {
                  setPressedKey(null);
                }}
                onClick={() => navigate(`/board/study/${part.url}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/board/study/${part.url}`);
                  }
                }}
              >
                <S.PartIcon>
                  <Icon style={{ pointerEvents: 'none' }} />
                </S.PartIcon>
                <S.PartLabel>{part.key}</S.PartLabel>
              </S.PartItem>
            );
          })}
        </S.PartList>
      </S.PartBoardContainer>
    </S.PartPreviewContainer>
  );
};

export default PartBoard;
