import { colors } from '@/theme/designTokens';
import styled from 'styled-components';

const LineStyle = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 1px;
  background-color: ${colors.semantic.line};
  margin: 0 auto;
`;

const Line = ({ width }: { width?: string }) => {
  return <LineStyle width={width || '325px'} />;
};

export default Line;
