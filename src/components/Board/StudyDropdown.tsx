import { useEffect, useRef, useState } from 'react';
import * as S from '@/styles/board/Dropdown.styled';
import Remove from '@/assets/images/ic_remove_study.svg?react';
import { RealPart } from '@/types/part';
import useStudyList from '@/hooks/queries/board/useStudyList';

interface Props {
  origStudy: string | null;
  editStudy: (value: string | null) => void;
  selectedPart: RealPart;
}

const StudyDropdown = ({ origStudy, editStudy, selectedPart }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const textWidthRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const prevPartRef = useRef<RealPart | null>(null);
  const [localAddedStudies, setLocalAddedStudies] = useState<string[]>([]);

  const { data: studyList = [] } = useStudyList(selectedPart);
  const combinedStudyList = [...studyList, ...localAddedStudies];

  useEffect(() => {
    const prevPart = prevPartRef.current;
    if (prevPart && prevPart !== selectedPart) {
      setInputValue('');
      editStudy(null);
      setLocalAddedStudies([]);
    }
    prevPartRef.current = selectedPart;
  }, [selectedPart, editStudy]);

  const isInList = combinedStudyList.some(
    (s) => s.toLowerCase() === inputValue.trim().toLowerCase(),
  );
  const isNew = inputValue.trim().length > 0 && !isInList;

  useEffect(() => {
    if (textWidthRef.current) {
      setTextWidth(textWidthRef.current.offsetWidth);
    }
  }, [inputValue]);

  const filteredList = combinedStudyList.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const showAddOption = isNew;

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSelect = (study: string) => {
    setInputValue(study);
    editStudy(study);
    setIsOpen(false);
  };

  const handleAddOption = () => {
    const newStudy = inputValue.trim();
    if (!newStudy) return;
    setLocalAddedStudies((prev) =>
      prev.includes(newStudy) ? prev : [...prev, newStudy],
    );
    handleSelect(newStudy);
  };

  const handleClear = () => {
    setInputValue('');
    editStudy(null);
  };

  useEffect(() => {
    setInputValue(origStudy ?? '');
  }, [origStudy]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <S.Container ref={dropdownRef}>
      <S.InputWrapper>
        <S.Input
          value={inputValue}
          placeholder="옵션 검색"
          onFocus={() => setIsOpen(true)}
          $isNew={isNew}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const newStudy = inputValue.trim();
              if (
                newStudy &&
                !combinedStudyList.some(
                  (s) => s.toLowerCase() === newStudy.toLowerCase(),
                )
              ) {
                setLocalAddedStudies((prev) =>
                  prev.some((s) => s.toLowerCase() === newStudy.toLowerCase())
                    ? prev
                    : [...prev, newStudy],
                );
                handleSelect(newStudy);
              }
            }
          }}
        />
        <S.HiddenText ref={textWidthRef}>{inputValue}</S.HiddenText>

        {isNew && (
          <S.ClearButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            style={{ left: textWidth + 10 }}
            aria-label="입력 지우기"
          >
            <Remove />
          </S.ClearButton>
        )}
      </S.InputWrapper>
      {isOpen && (
        <S.StudyDropdownList>
          {filteredList.map((item) => (
            <S.StudyDropdownItem key={item} onClick={() => handleSelect(item)}>
              {item}
            </S.StudyDropdownItem>
          ))}
          {showAddOption && (
            <S.StudyDropdownItem onClick={handleAddOption}>
              &apos;{inputValue}&apos; 추가하기
            </S.StudyDropdownItem>
          )}
        </S.StudyDropdownList>
      )}
    </S.Container>
  );
};

export default StudyDropdown;
