import { useEffect, useRef, useState } from 'react';
import * as S from '@/styles/board/Dropdown.styled';
import open from '@/assets/images/ic_opened_dropdown.svg';
import close from '@/assets/images/ic_default_dropdown.svg';

const WeekDropdown = ({
  origWeek,
  editWeek,
  isEntire,
}: {
  origWeek: number | null;
  editWeek: (value: number | null) => void;
  isEntire?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(origWeek);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { value: number | null; label: string }[] = [
    ...(isEntire ? [{ value: null, label: '전체' }] : []),
    ...Array.from({ length: 10 }, (_, i) => ({
      value: i + 1,
      label: `${i + 1}주차`,
    })),
  ];
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: number | null) => {
    setSelectedWeek(value);
    editWeek(value);
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
    setSelectedWeek(origWeek);
  }, [origWeek]);

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.DropdownButton onClick={handleToggle} $hasValue={!!selectedWeek}>
        {selectedWeek ? `${selectedWeek}주차` : '주차 수'}
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

export default WeekDropdown;
