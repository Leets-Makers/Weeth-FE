import { colors, units } from '@/theme/designTokens';
import styled from 'styled-components';
import CheckImg from '@/assets/images/ic_check_round_fill.svg?react';
import typography from '@/theme/typography';

const ButtonContainer = styled.button`
  display: flex;
  algin-items: center;
  background-color: ${colors.semantic.button.primary};

  padding: ${units.margin[200]}px ${units.padding[400]}px;
  gap: ${units.margin[100]}px;
  border-radius: ${units.radius.md}px;

  &:hover {
    background-color: ${colors.semantic.button['primary-interaction']};
  }
  ${typography.Button1};
`;

const HeaderButton = ({ isMypage = false }: { isMypage?: boolean }) => {
  return (
    <ButtonContainer>
      <CheckImg style={{ paddingTop: 3 }} />
      {isMypage ? '저장' : '게시'}
    </ButtonContainer>
  );
};

export default HeaderButton;
