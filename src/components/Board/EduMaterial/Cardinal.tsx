import { useState } from 'react';
import useGetAllCardinals from '@/api/useGetCardinals';
import theme from '@/styles/theme';
import styled from 'styled-components';

const CardinalContainer = styled.div`
  display: flex;
  gap: 0.3125rem;
`;

const CardinalBox = styled.div<{ selected: boolean }>`
  width: 3.1875rem;
  height: 2rem;
  min-width: 2.5rem;
  border: 1px solid ${theme.color.gray[18]};
  border-radius: 1.25rem;
  background-color: ${({ selected }) =>
    selected ? theme.color.main : theme.color.gray[12]};
  font-size: 0.875rem;
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
