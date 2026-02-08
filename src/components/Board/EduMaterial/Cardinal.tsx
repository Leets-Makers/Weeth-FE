import useCardinalData from '@/hooks/queries/useCardinalData';
import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

const CardinalContainer = styled.div`
  display: flex;
  gap: 5px;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.semantic.line};
    border-radius: 4px;
  }
`;

const CardinalBox = styled.div<{ $selected: boolean }>`
  height: 40px;
  box-sizing: border-box;
  min-width: 40px;
  flex-shrink: 0;
  padding: 8px 15px;
  border: ${({ $selected }) =>
    $selected ? 'none' : `1px solid ${colors.semantic.line}`};
  border-radius: 9999px;
  background-color: ${({ $selected }) =>
    $selected ? colors.semantic.button.primary : 'transparent'};
  ${typography.Button2};
  color: ${({ $selected }) =>
    $selected ? colors.semantic.text.inverse : colors.semantic.text.strong};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

type Props = {
  value: number | null;
  onChange: (v: number | null) => void;
};

const Cardinal = ({ value, onChange }: Props) => {
  const { data: allCardinals } = useCardinalData();

  if (!allCardinals) return null;
  const sortedCardinals = [...allCardinals]?.reverse();

  const handleSelect = (cardinalNumber: number) => {
    onChange(value === cardinalNumber ? null : cardinalNumber);
  };

  return (
    <CardinalContainer>
      {sortedCardinals.map((cardinal) => (
        <CardinalBox
          key={cardinal.id}
          $selected={value === cardinal.cardinalNumber}
          onClick={() => handleSelect(cardinal.cardinalNumber)}
        >
          {cardinal.cardinalNumber}기
        </CardinalBox>
      ))}
    </CardinalContainer>
  );
};

export default Cardinal;
