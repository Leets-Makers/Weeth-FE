import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface SignupDropDownProps {
  text: string;
  origValue: string;
  editValue: (value: string) => void;
}

const Container = styled.div`
  position: relative;
  width: 370px;
  max-width: 370px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-left: 7%;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.font.semiBold};
  color: ${({ theme }) => theme.color.gray[100]};
  font-size: 16px;
`;

const DropdownButton = styled.button<{ $hasValue: boolean }>`
  width: 87%;
  margin: 0 7%;
  padding: 10px 12px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[25]};
  background-color: ${({ theme }) => theme.color.gray[12]};
  color: ${({ $hasValue, theme }) =>
    $hasValue ? theme.color.gray[100] : theme.color.gray[45]};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownList = styled.div`
  position: absolute;
  width: 87%;
  margin: 0 7%;
  background-color: ${({ theme }) => theme.color.gray[20]};
  border-radius: 4px;
  top: calc(100% + 4px);
  z-index: 100;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 10px 14px;
  font-size: 15px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.gray[20]};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.mainMiddle};
  }
`;

const SignupDropDown: React.FC<SignupDropDownProps> = ({
  text,
  origValue,
  editValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(origValue);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const options = [
    '경영학과',
    '경제학과',
    '시각디자인학과',
    '산업공학과',
    '소프트웨어전공',
    '인공지능전공',
    '컴퓨터공학과',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedValue(origValue);
  }, [origValue]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    editValue(value);
    setIsOpen(false);
  };

  return (
    <Container ref={dropdownRef}>
      <Label>{text}</Label>
      <DropdownButton
        onClick={() => setIsOpen((prev) => !prev)}
        $hasValue={!!selectedValue}
      >
        {selectedValue || '학과를 선택해주세요'}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem key={option} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default SignupDropDown;
