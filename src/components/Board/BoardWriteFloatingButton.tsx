import FloatingWritingIcon from '@/assets/images/ic_floating_writing.svg?react';
import * as S from '@/styles/board/Board.styled';
import useWindowSize from '@/hooks/useWindowSize';
import { units } from '@/theme/designTokens';
import { useBoardWriteMenu } from './useBoardWriteMenu';

const BoardWriteFloatingButton = () => {
  const { width } = useWindowSize();
  const isMobile = width <= units.device.tablet;
  const { openFromFloating } = useBoardWriteMenu();

  if (!isMobile) return null;

  return (
    <S.FloatingButton onClick={openFromFloating} aria-label="글쓰기 메뉴 열기">
      <FloatingWritingIcon aria-hidden />
    </S.FloatingButton>
  );
};

export default BoardWriteFloatingButton;
