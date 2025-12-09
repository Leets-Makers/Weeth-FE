import { colors, units } from '@/theme/designTokens';
import styled from 'styled-components';
import CheckImg from '@/assets/images/ic_check_round_fill.svg?react';

const ButtonContainer = styled.button`
  background-color: ${colors.semantic.button.primary};

  padding: ${units.padding[400]}px;
  gap: ${units.margin[100]}px;
  border-radius: ${units.radius.md}px;

  :&hover {
    background-color: ${colors.semantic.button['primary-interaction']};
  }
`;

const HeaderButton = ({ isMypage = false }: { isMypage: boolean }) => {
  return (
    <ButtonContainer>
      <CheckImg />
      {isMypage ? '저장' : '게시'}
    </ButtonContainer>
  );
};

export default HeaderButton;
