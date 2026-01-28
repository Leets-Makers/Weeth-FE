import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 40px;
`;

export const Slider = styled.span<{ $selectedIndex: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.semantic.container.neutral};
  transition: 0.4s;
  border-radius: 10px;
  padding: 4px;
  box-sizing: border-box;

  &:before {
    position: absolute;
    content: '';
    height: 32px;
    width: calc(25% - 8px);
    left: ${({ $selectedIndex }) => `calc(${$selectedIndex} * 25% + 4px)`};
    background-color: ${colors.semantic.container['neutral-interaction']};
    transition: 0.4s;
    border-radius: ${units.radius.md}px;
  }
`;

export const TextPart = styled.span<{ $isSelected: boolean }>`
  ${typography.Caption1};
  color: ${({ $isSelected }) =>
    $isSelected
      ? colors.semantic.text.normal
      : colors.semantic.text.alternative};
  z-index: 1;
  flex: 1;
  text-align: center;
  cursor: pointer;
`;

const PARTS = ['FE', 'BE', 'D', 'PM'] as const;

type Part = (typeof PARTS)[number];

const PartToggle = ({
  selectedPart,
  onToggle,
}: {
  selectedPart?: Part;
  onToggle: (part: Part) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!selectedPart) return;
    const idx = PARTS.indexOf(selectedPart);
    if (idx >= 0) setSelectedIndex(idx);
  }, [selectedPart]);

  const handlePartClick = (index: number) => {
    setSelectedIndex(index);
    onToggle(PARTS[index]);
  };

  return (
    <Switch>
      <Slider $selectedIndex={selectedIndex}>
        {PARTS.map((part, index) => (
          <TextPart
            key={part}
            $isSelected={selectedIndex === index}
            onClick={() => handlePartClick(index)}
          >
            {part}
          </TextPart>
        ))}
      </Slider>
    </Switch>
  );
};

export default PartToggle;
