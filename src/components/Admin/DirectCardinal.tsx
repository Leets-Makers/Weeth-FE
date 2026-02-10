import { useState } from 'react';
import { styled } from 'styled-components';
import { DirectCardinalProps } from '@/types/adminCardinal';
import MeatballSVG from '@/assets/images/ic_admin_column_meatball.svg';
import ArrowDownSVG from '@/assets/images/ic_admin_cardinal.svg';
import {
  CardinalButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/Admin/Cardinal';
import useCardinalData from '@/hooks/queries/useCardinalData';
import { units } from '@/theme/designTokens';

export const StyledCardinal = styled.div`
  width: 35%;
  position: relative;
  z-index: 201;
  border-radius: ${units.radius.md}px;
`;

const DirectCardinalDropdown: React.FC<DirectCardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
  isForDues,
  variant,
  placeholder = '직접 입력',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: allCardinals } = useCardinalData();
  const [isCustomInput, setIsCustomInput] = useState(false);

  const sortedCardinals =
    allCardinals
      ?.slice()
      .filter((cardinal) => cardinal.cardinalNumber !== 0)
      .sort((a, b) => b.cardinalNumber - a.cardinalNumber) ?? [];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCardinal = (value: number) => {
    setSelectedCardinal(value, false);
    setIsCustomInput(false);
    setIsOpen(false);
  };

  const handleCustomInput = () => {
    setSelectedCardinal(null, true);
    setIsCustomInput(true);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (isCustomInput) return '직접 입력';
    if (selectedCardinal === null) return placeholder;
    return `${selectedCardinal}기`;
  };

  const displayText = getDisplayText();

  return (
    <StyledCardinal>
      <CardinalButton onClick={toggleDropdown} $variant={variant}>
        <div>{displayText}</div>

        <img
          src={
            isCustomInput || displayText === '직접 입력'
              ? MeatballSVG
              : ArrowDownSVG
          }
          alt="cardinal"
          className={isOpen ? 'open' : ''}
        />
      </CardinalButton>
      {isOpen && (
        <DropdownMenu itemCount={sortedCardinals?.length}>
          {sortedCardinals?.length === 0 && (
            <DropdownItem>기수 없음</DropdownItem>
          )}
          {sortedCardinals?.length > 0 &&
            sortedCardinals?.map((item) => (
              <DropdownItem
                key={item.id}
                onClick={() => selectCardinal(item.cardinalNumber)}
              >
                {item.cardinalNumber}기
              </DropdownItem>
            ))}
          <DropdownItem onClick={handleCustomInput}>직접 입력</DropdownItem>
        </DropdownMenu>
      )}
    </StyledCardinal>
  );
};

export default DirectCardinalDropdown;
