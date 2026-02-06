import { useState } from 'react';
import styled from 'styled-components';
import CardinalSVG from '@/assets/images/ic_admin_cardinal.svg';
import { CardinalProps } from '@/types/adminCardinal';
import useCardinalData from '@/hooks/queries/useCardinalData';
import { units } from '@/theme/designTokens';

export const CardinalButton = styled.div<{ $variant?: 'button' | 'container' }>`
  width: 118px;
  height: 48px;
  background-color: ${({ theme, $variant }) =>
    $variant === 'button'
      ? theme.semantic.button.neutral
      : theme.semantic.container.neutral};
  border: 1px solid ${({ theme }) => theme.semantic.line};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  border-radius: ${units.radius.md}px;
  color: black;
`;

export const DropdownMenu = styled.div.attrs<{ itemCount: number }>(
  (props) => ({
    style: {
      maxHeight: props.itemCount > 4 ? '240px' : 'auto',
      overflowY: props.itemCount > 4 ? 'auto' : 'hidden',
    },
  }),
)`
  width: 118px;
  background-color: ${({ theme }) => theme.semantic.container.neutral};
  border-radius: ${units.radius.md}px;
  box-shadow: 0 5px 20px 0 rgba(17, 33, 49, 0.2);
  color: black;
  position: absolute;
  z-index: 5;
`;

export const DropdownItem = styled.div`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.semantic.container.neutral};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: ${units.radius.md}px;
    border-top-right-radius: ${units.radius.md}px;
  }

  &:last-child {
    border-bottom-left-radius: ${units.radius.md}px;
    border-bottom-right-radius: ${units.radius.md}px;
  }
`;

export const ArrowIcon = styled.img`
  &.open {
    transform: rotate(180deg);
  }
`;

export const CardinalWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const CardinalDropdown: React.FC<CardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
  variant,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: allCardinals } = useCardinalData();

  const sortedCardinals = allCardinals
    ?.filter((item) => item.cardinalNumber !== 0)
    .sort((a, b) => b.cardinalNumber - a.cardinalNumber);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCardinal = (value: number) => {
    setSelectedCardinal(value);
    setIsOpen(false);
  };

  return (
    <CardinalWrapper>
      <CardinalButton onClick={toggleDropdown} $variant={variant}>
        <div>
          {selectedCardinal === 0 || selectedCardinal === null
            ? '기수'
            : `${selectedCardinal}기`}
        </div>
        <ArrowIcon
          src={CardinalSVG}
          alt="cardinal"
          className={isOpen ? 'open' : ''}
        />
      </CardinalButton>
      {isOpen && (
        <DropdownMenu itemCount={sortedCardinals?.length ?? 0}>
          {sortedCardinals?.length === 0 && (
            <DropdownItem>기수 없음</DropdownItem>
          )}
          {sortedCardinals?.map((item) => (
            <DropdownItem
              key={item.id}
              onClick={() => selectCardinal(item.cardinalNumber)}
            >
              {item.cardinalNumber}기
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </CardinalWrapper>
  );
};

export default CardinalDropdown;
