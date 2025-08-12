import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import Remove from '@/assets/images/ic_remove_study.svg?react';

const Container = styled.div`
  position: relative;
  width: 171px;
  height: 32px;
  box-sizing: border-box;
  padding: 6px 10px;
  border-radius: 10px;
  background-color: ${theme.color.gray[18]};
`;

const Input = styled.input<{ $isNew?: boolean }>`
  width: 100%;
  position: relative;
  background-color: ${theme.color.gray[18]};
  color: ${theme.color.gray[100]};
  font-family: ${theme.font.regular};
  color: ${({ $isNew }) =>
    $isNew ? theme.color.gray[65] : theme.color.gray[100]};
  font-size: 14px;
  border: none;
  outline: none;

  &::placeholder {
    color: ${theme.color.gray[65]};
  }

  &:focus {
    border: none;
    outline: none;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  left: 0;
  width: 144px;
  max-height: 170px;
  box-sizing: border-box;
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  padding: 5px 0px;
  margin-top: 10px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const DropdownItem = styled.div`
  padding: 10px;
  height: 40px;
  left: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.regular};
  // line-height: 24px;
  // line-height: 20px;
  // white-space: nowrap;

  &:hover {
    background-color: ${theme.color.gray[9]};
  }
`;

// const Text = styled.div`
//   padding-top: 8px;
//   line-height: 20px;
// `;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
`;

const ClearButton = styled.div`
  padding-top: 3px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HiddenText = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 14px;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[65]};
`;

interface Props {
  origStudy: string | null;
  editStudy: (value: string | null) => void;
}

const StudyDropdown = ({ origStudy, editStudy }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [studyList, setStudyList] = useState<string[]>([
    'React',
    '데이터분석',
    '자바스크립트',
    '스프링',
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const textWidthRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  const isInList = studyList.some(
    (s) => s.toLowerCase() === inputValue.trim().toLowerCase(),
  );
  const isNew = inputValue.trim().length > 0 && !isInList;

  useEffect(() => {
    if (textWidthRef.current) {
      setTextWidth(textWidthRef.current.offsetWidth);
    }
  }, [inputValue]);

  const filteredList = studyList.filter((item) =>
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
    setStudyList((prev) => [...prev, newStudy]);
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
    <Container ref={dropdownRef}>
      <InputWrapper>
        <Input
          value={inputValue}
          placeholder="옵션 검색"
          onFocus={() => setIsOpen(true)}
          $isNew={isNew}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const newStudy = inputValue.trim();
              if (newStudy && !studyList.includes(newStudy)) {
                setStudyList((prev) => [...prev, newStudy]);
                handleSelect(newStudy);
              }
            }
          }}
        />
        <HiddenText ref={textWidthRef}>{inputValue}</HiddenText>

        {isNew && (
          <ClearButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleClear}
            style={{ left: textWidth + 10 }}
            aria-label="입력 지우기"
          >
            <Remove />
          </ClearButton>
        )}
      </InputWrapper>
      {isOpen && (
        <DropdownList>
          {filteredList.map((item) => (
            <DropdownItem key={item} onClick={() => handleSelect(item)}>
              {item}
            </DropdownItem>
          ))}
          {showAddOption && (
            <DropdownItem onClick={handleAddOption}>
              `{inputValue}` 추가하기
            </DropdownItem>
          )}
        </DropdownList>
      )}
    </Container>
  );
};

export default StudyDropdown;
