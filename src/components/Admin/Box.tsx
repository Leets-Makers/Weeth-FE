import styled from 'styled-components';
import { units } from '@/theme/designTokens';
import { useTheme } from 'styled-components';
import typography from '@/theme/typography';

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
  $isSelected?: boolean;
  isIncomplete?: boolean;
  $isPrimaryBg?: boolean;
}>`
  width: ${({ isCardinalBox }) => (isCardinalBox ? 'auto' : '234px')};
  min-width: ${({ isCardinalBox }) => (isCardinalBox ? '234px' : 'auto')};
  min-height: 164px;
  background-color: ${({ isIncomplete, color }) => {
    if (isIncomplete) return 'transparent';
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

  ${({ isClick, $isSelected, isIncomplete, $isPrimaryBg, theme }) =>
    isClick &&
    !$isSelected &&
    !isIncomplete &&
    `
    &:hover {
      background-color: ${
        $isPrimaryBg
          ? theme.semantic.button['primary-interaction']
          : theme.semantic.button.neutral
      }
    }
  `};
`;

export const Title = styled.div<{
  isHidden?: boolean;
  isIncomplete?: boolean;
  $isPrimaryBg?: boolean;
}>`
  ${typography.admin.Sub2}
  min-height: 24px;
  color: ${({ isIncomplete, $isPrimaryBg, theme }) => {
    if (isIncomplete) return theme.semantic.text.disabled;
    if ($isPrimaryBg) return theme.semantic.text.inverse;
    return theme.semantic.text.normal;
  }};
`;

export const Description = styled.div<{
  isIncomplete?: boolean;
  $isPrimaryBg?: boolean;
}>`
  ${typography.admin.H3}
  color: ${({ isIncomplete, $isPrimaryBg, theme }) => {
    if (isIncomplete) return theme.semantic.text.disabled;
    if ($isPrimaryBg) return theme.semantic.text.inverse;
    return theme.semantic.text.normal;
  }};
  margin-top: 20px;
  white-space: nowrap;
`;

export const Last = styled.div<{
  lastColor?: string;
  isIncomplete?: boolean;
  $isPrimaryBg?: boolean;
}>`
  ${typography.admin.Caption2};
  color: ${({ isIncomplete, lastColor, $isPrimaryBg, theme }) => {
    if (isIncomplete) return theme.semantic.text.disabled;
    if (lastColor) return lastColor;
    if ($isPrimaryBg) return theme.semantic.text.inverse;
    return theme.semantic.text.normal;
  }};
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
  const currentTheme = useTheme();
  const isPrimaryBg = color === currentTheme.semantic.container.primary;

  return (
    <Wrapper
      onClick={onClick}
      color={color}
      isCardinalBox={isCardinalBox}
      isClick={isClick}
      $isSelected={isSelected}
      isIncomplete={isIncomplete}
      $isPrimaryBg={isPrimaryBg}
    >
      {title && (
        <Title isIncomplete={isIncomplete} $isPrimaryBg={isPrimaryBg}>
          {title}
        </Title>
      )}
      <Description isIncomplete={isIncomplete} $isPrimaryBg={isPrimaryBg}>
        {description}
      </Description>
      <Last
        lastColor={lastColor}
        isIncomplete={isIncomplete}
        $isPrimaryBg={isPrimaryBg}
      >
        {last}
      </Last>
    </Wrapper>
  );
};
export default Box;
