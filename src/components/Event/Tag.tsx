import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

const Label = styled.div`
  height: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${typography.Caption1};
  background-color: rgba(0, 221, 168, 0.1);
  color: ${colors.semantic.container.primary};
  padding: ${units.padding['100']}px ${units.padding['200']}px;
  box-sizing: border-box;
`;

const Tag = () => {
  return <Label>정기 모임</Label>;
};

export default Tag;
