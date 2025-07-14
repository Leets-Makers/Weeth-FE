import { useState } from 'react';
import useGetAllCardinals from '@/api/useGetCardinals';
import theme from '@/styles/theme';
import styled from 'styled-components';

const CardinalContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const CardinalBox = styled.div<{ selected: boolean }>`
  width: 51px;
  height: 32px;
  min-width: 40px;
  border: 1px solid ${theme.color.gray[18]};
  border-radius: 20px;
  background-color: ${({ selected }) =>
    selected ? theme.color.main : theme.color.gray[12]};
  font-size: 14px;
  line-height: 1;
  font-family: ${theme.font.semiBold};
  color: ${({ selected }) => (selected ? 'white' : theme.color.gray[100])};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Cardinal = () => {
  const { allCardinals } = useGetAllCardinals();
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);

  const sortedCardinals = [...allCardinals].reverse();

  const handleSelect = (id: number) => {
    setSelectedCardinal(id);
  };

  return (
    <CardinalContainer>
      {sortedCardinals.map((cardinal) => (
        <CardinalBox
          key={cardinal.id}
          selected={selectedCardinal === cardinal.id}
          onClick={() => handleSelect(cardinal.id)}
        >
          {cardinal.cardinalNumber}기
        </CardinalBox>
      ))}
    </CardinalContainer>
  );
};

export default Cardinal;
