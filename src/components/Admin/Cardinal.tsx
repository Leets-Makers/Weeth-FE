import { useState } from 'react';
import styled from 'styled-components';
import CardinalSVG from '@/assets/images/ic_admin_cardinal.svg';
import { CardinalProps } from '@/types/adminCardinal';
import useCardinalData from '@/hooks/queries/useCardinalData';
import { units } from '@/theme/designTokens';

export const CardinalButton = styled.div`
  width: 118px;
  height: 48px;
  background-color: ${({ theme }) => theme.semantic.button.neutral};
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
  background-color: #ffffff;
  border: 1px solid #dedede;
  border-radius: ${units.radius.md}px;
  box-shadow: 0 5px 20px 0 rgba(17, 33, 49, 0.2);
  color: black;
  position: absolute;
  z-index: 5;
`;

export const DropdownItem = styled.div`
  width: 100%;
  height: 48px;
  background-color: #ffffff;
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

const CardinalDropdown: React.FC<CardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: allCardinals } = useCardinalData();

  const sortedCardinals = allCardinals
    ?.filter((item) => item.cardinalNumber !== 0)
    .reverse();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCardinal = (value: number) => {
    setSelectedCardinal(value);
    setIsOpen(false);
  };

  return (
    <>
      <CardinalButton onClick={toggleDropdown}>
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
    </>
  );
};

export default CardinalDropdown;
