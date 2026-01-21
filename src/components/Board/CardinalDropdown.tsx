import { useEffect, useRef, useState } from 'react';
import * as S from '@/styles/board/Dropdown.styled';
import open from '@/assets/images/ic_opened_dropdown.svg';
import close from '@/assets/images/ic_default_dropdown.svg';
import useCardinalData from '@/hooks/queries/useCardinalData';

const CardinalDropdown = ({
  origValue,
  editValue,
  isMember,
}: {
  origValue: number | null;
  editValue: (value: number | null) => void;
  isMember?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(origValue);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: allCardinals } = useCardinalData();

  const options: { value: number | null; label: string }[] =
    allCardinals
      ?.map(({ cardinalNumber }) => ({
        value: cardinalNumber,
        label: `${cardinalNumber}기`,
      }))
      .reverse() || [];

  if (isMember === true) options.unshift({ value: null, label: '전체' });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: number | null) => {
    setSelectedValue(value);
    editValue(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(origValue);
  }, [origValue]);

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.DropdownButton onClick={handleToggle} $hasValue={!!selectedValue}>
        {selectedValue ? `${selectedValue}기` : '기수'}
        {isOpen ? (
          <img src={open} alt="open" />
        ) : (
          <img src={close} alt="close" />
        )}
      </S.DropdownButton>

      {isOpen && (
        <S.DropdownList>
          {options.map((option) => (
            <S.DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </S.DropdownItem>
          ))}
        </S.DropdownList>
      )}
    </S.DropdownContainer>
  );
};

export default CardinalDropdown;
