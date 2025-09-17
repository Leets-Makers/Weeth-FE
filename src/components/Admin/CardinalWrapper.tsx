import styled from 'styled-components';
import CardinalDropdown from '@/components/Admin/Cardinal';
import useGetAllCardinals from '@/api/useGetCardinals';
import { useEffect } from 'react';

interface TotalCardinalProps {
  selectedCardinal: number | null;
  setSelectedCardinal: React.Dispatch<React.SetStateAction<number | null>>;
  autoSelectLatest?: boolean;
}

const CardinalWrapper = styled.div`
  width: 166px;
  height: 80px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const TotalCardinal: React.FC<TotalCardinalProps> = ({
  selectedCardinal,
  setSelectedCardinal,
  autoSelectLatest = false,
}) => {
  const { allCardinals } = useGetAllCardinals();

  useEffect(() => {
    if (!autoSelectLatest || allCardinals.length === 0) return;

    const numbers = allCardinals
      .map((c) => c.cardinalNumber)
      .filter((n) => n > 0);

    if (numbers.length === 0) return;
    const latest = Math.max(...numbers);
    setSelectedCardinal(latest);
  }, [allCardinals, setSelectedCardinal, autoSelectLatest]);

  return (
    <CardinalWrapper>
      <div>
        <CardinalDropdown
          selectedCardinal={selectedCardinal}
          setSelectedCardinal={setSelectedCardinal}
        />
      </div>
    </CardinalWrapper>
  );
};

export default TotalCardinal;
