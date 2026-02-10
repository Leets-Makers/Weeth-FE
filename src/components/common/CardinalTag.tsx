import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

const Container = styled.div<{ type: 'member' | 'mypage' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 19px;
  border-radius: 13px;
  background-color: ${colors.semantic.container['neutral-interaction']};
  color: ${colors.semantic.text.alternative};
  ${typography.Caption1};
`;

const CardinalTag = ({
  cardinal,
  type,
}: {
  cardinal: number;
  type: 'member' | 'mypage';
}) => {
  return <Container type={type}>{cardinal}기</Container>;
};

export default CardinalTag;
