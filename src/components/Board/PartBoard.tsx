import * as S from '@/styles/board/Board.styled';
import { useNavigate } from 'react-router-dom';
import D from '@/assets/images/ic_board_D.svg?react';
import BE from '@/assets/images/ic_board_BE.svg?react';
import FE from '@/assets/images/ic_board_FE.svg?react';
import PM from '@/assets/images/ic_board_PM.svg?react';
import type { ComponentType, SVGProps } from 'react';

type SvgCmp = ComponentType<SVGProps<SVGSVGElement>>;

type PartItem = {
  key: 'FE' | 'BE' | 'D' | 'PM';
  url: 'FE' | 'BE' | 'D' | 'PM';
  icon: SvgCmp;
};

const parts: PartItem[] = [
  {
    key: 'FE',
    url: 'FE',
    icon: FE,
  },
  {
    key: 'BE',
    url: 'BE',
    icon: BE,
  },
  {
    key: 'D',
    url: 'D',
    icon: D,
  },
  {
    key: 'PM',
    url: 'PM',
    icon: PM,
  },
];

const PartBoard = () => {
  const navigate = useNavigate();

  return (
    <S.PartPreviewContainer>
      <S.PartTitleText>파트 게시판</S.PartTitleText>
      <S.PartBoardContainer>
        <S.PartList>
          {parts.map((part) => (
            <S.PartItem
              key={part.url}
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
                <S.PartBackground>
                  <part.icon style={{ pointerEvents: 'none' }} />
                </S.PartBackground>
              </S.PartIcon>
              <S.PartLabel>{part.key}</S.PartLabel>
            </S.PartItem>
          ))}
        </S.PartList>
      </S.PartBoardContainer>
    </S.PartPreviewContainer>
  );
};

export default PartBoard;
