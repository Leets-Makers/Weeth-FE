import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const Switch = styled.label`
  position: relative;
  display: flex;
  display: inline-block;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 32px;
`;

export const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Slider = styled.span<{ $isMonth: boolean }>`
  display: flex;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.semantic.container.neutral};
  transition: 0.4s;
  border-radius: 10px;

  &:before {
    position: absolute;
    content: '';
    height: 28px;
    width: 32px;
    left: 2px;
    bottom: 2px;
    background-color: ${colors.semantic.container['neutral-interaction']};
    transition: 0.4s;
    border-radius: 9px;
    transform: ${(props) =>
      props.$isMonth ? 'translateX(0)' : 'translateX(33px)'};
  }
`;

export const TextMonth = styled.div<{ $isMonth: boolean }>`
  position: absolute;
  left: 18%;
  color: ${(props) =>
    props.$isMonth
      ? colors.semantic.text.normal
      : colors.semantic.text.alternative};
  ${typography.Caption1};
  z-index: 1;
`;

export const TextYear = styled.div<{ $isMonth: boolean }>`
  position: absolute;
  right: 20%;
  color: ${(props) =>
    props.$isMonth
      ? colors.semantic.text.alternative
      : colors.semantic.text.normal};
  ${typography.Caption1};
  z-index: 1;
`;

const CalendarToggle = ({
  onToggle,
  isMonth,
}: {
  onToggle: () => void;
  isMonth: boolean;
}) => {
  return (
    <Switch>
      <Checkbox type="checkbox" onChange={onToggle} />
      <Slider $isMonth={isMonth}>
        <TextMonth $isMonth={isMonth}>M</TextMonth>
        <TextYear $isMonth={isMonth}>Y</TextYear>
      </Slider>
    </Switch>
  );
};

export default CalendarToggle;
