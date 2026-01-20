import React, { Dispatch, SetStateAction, useEffect } from 'react';
import CardinalDropDown from '@/components/Admin/Cardinal';
import SearchBar, { SearchBarWrapper } from '@/components/Admin/SearchBar';
import useCardinalData from '@/hooks/queries/useCardinalData';

interface CombinedSearchBarProps {
  selectedCardinal: number | null;
  setSelectedCardinal: Dispatch<SetStateAction<number | null>>;
  isPenaltyPage?: boolean;
  searchName: string;
  setSearchName: Dispatch<SetStateAction<string>>;
  autoSelectLatest?: boolean;
}

const CombinedSearchBar: React.FC<CombinedSearchBarProps> = ({
  selectedCardinal,
  setSelectedCardinal,
  isPenaltyPage,
  searchName,
  setSearchName,
  autoSelectLatest = false,
}) => {
  const { data: allCardinals } = useCardinalData();

  useEffect(() => {
    if (!autoSelectLatest) return;
    if (selectedCardinal != null) return;
    if (!Array.isArray(allCardinals) || allCardinals.length === 0) return;

    const latest = allCardinals.at(-1)!.cardinalNumber;
    setSelectedCardinal(latest);
  }, [autoSelectLatest, selectedCardinal, allCardinals, setSelectedCardinal]);

  return (
    <SearchBarWrapper $isPenaltyPage={isPenaltyPage}>
      <div>
        <CardinalDropDown
          selectedCardinal={selectedCardinal}
          setSelectedCardinal={setSelectedCardinal}
        />
      </div>
      <SearchBar
        isWrapped={false}
        searchName={searchName}
        setSearchName={setSearchName}
      />
    </SearchBarWrapper>
  );
};

export default CombinedSearchBar;
