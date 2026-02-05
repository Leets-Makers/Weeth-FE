import styled from 'styled-components';
import theme from '@/styles/theme';
import { units } from '@/theme/designTokens';

export interface BoxProps {
  title?: string;
  description: string;
  last: string;
  color: string;
  lastColor?: string;
  minWidth?: string;
  isCardinalBox?: boolean;
  onClick?: () => void;
  isClick?: boolean;
  isSelected?: boolean;
  isIncomplete?: boolean;
}

export const Wrapper = styled.div<{
  color: string;
  isCardinalBox: boolean;
  isClick?: boolean;
  isSelected?: boolean;
  isIncomplete?: boolean;
}>`
  width: ${({ isCardinalBox }) => (isCardinalBox ? 'none' : '234px')};
  min-width: ${({ isCardinalBox }) => (isCardinalBox ? '234px' : 'none')};
  min-height: 132px;
  background-color: ${({ isIncomplete, isSelected, color }) => {
    if (isIncomplete) return 'transparent';
    if (isSelected) return theme.color.gray[18];
    return color;
  }};
  border: ${({ isIncomplete, theme }) =>
    isIncomplete ? `1.5px dashed ${theme.semantic.line}` : 'none'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
  border-radius: ${units.radius.sm}px;
  cursor: ${({ isClick }) => (isClick ? 'pointer' : 'auto')};
  box-shadow: 0px 1px 5px 0px rgba(17, 33, 49, 0.15);

  ${({ isClick, isSelected, isIncomplete }) =>
    isClick &&
    !isSelected &&
    !isIncomplete &&
    `
    &:hover {
      background-color: ${theme.color.gray[18]};
    }
  `};
`;


export const Title = styled.div<{
  isHidden?: boolean;
  isIncomplete?: boolean;
}>`
  font-size: 18px;
  min-height: 24px;
  color: ${({ isIncomplete, theme }) =>
    isIncomplete ? theme.semantic.text.disabled : theme.semantic.text.strong};
`;

export const Description = styled.div<{ isIncomplete?: boolean }>`
  font-size: 24px;
  font-family: ${theme.font.semiBold};
  color: ${({ isIncomplete, theme }) =>
    isIncomplete ? theme.semantic.text.disabled : theme.semantic.text.strong};
  margin-top: 20px;
  white-space: nowrap;
`;

export const Last = styled.div<{ lastColor?: string; isIncomplete?: boolean }>`
  font-size: 18px;
  color: ${({ isIncomplete, lastColor }) =>
    isIncomplete ? '#909393' : lastColor || 'rgba(255, 255, 255, 0.5)'};
`;

const Box: React.FC<BoxProps> = ({
  title,
  description,
  last,
  color,
  lastColor,
  isCardinalBox = false,
  onClick,
  isClick = false,
  isSelected = false,
  isIncomplete = false,
}) => {
  return (
    <Wrapper
      onClick={onClick}
      color={color}
      isCardinalBox={isCardinalBox}
      isClick={isClick}
      isSelected={isSelected}
      isIncomplete={isIncomplete}
    >
      {title && <Title isIncomplete={isIncomplete}>{title}</Title>}
      <Description isIncomplete={isIncomplete}>{description}</Description>
      <Last lastColor={lastColor} isIncomplete={isIncomplete}>
        {last}
      </Last>
    </Wrapper>
  );
};
export default Box;
