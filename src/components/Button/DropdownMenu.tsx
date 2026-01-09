import theme from '@/styles/theme';
import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface DropdownMenuProps {
  text: string;
  origValue: string;
  editValue: (value: string) => void;
  isCardinal?: boolean;
  isProfile?: boolean;
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  ${typography.Body1};
  width: 100%;
`;

const Label = styled.label<{ $isProfile?: boolean }>`
  flex: 1;
  ${typography.Body1};
  color: ${({ $isProfile }) =>
    $isProfile
      ? colors.semantic.text.normal
      : colors.semantic.text.alternative};
`;

const Button = styled.button<{ $hasValue: boolean }>`
  flex: 7;
  height: 45px;
  padding: 0 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: ${colors.semantic.container.neutral};
  color: ${({ $hasValue }) =>
    $hasValue ? colors.semantic.text.normal : colors.semantic.text.alternative};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:focus {
    outline: 2px solid ${theme.color.mainMiddle};
  }
`;

const List = styled.ul`
  position: absolute;
  right: 22.5px;
  flex: 7;
  top: calc(100% + 4px);
  right: 0;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${colors.semantic.container.neutral};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1000;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  list-style: none;
  padding: 10px 14px;
  width: inherit;
  color: ${colors.semantic.text.normal};
  cursor: pointer;

  &:hover {
    background-color: ${colors.dark.primary[200]};
  }
`;

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  text,
  origValue,
  editValue,
  isCardinal = false,
  isProfile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(origValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const departmentOptions = [
    '경영학과',
    '경제학과',
    '시각디자인학과',
    '산업공학과',
    '소프트웨어전공',
    '인공지능전공',
    '컴퓨터공학과',
    '한국어문학과',
    '도시계획학전공',
    '글로벌경영학과',
    '금융수학전공',
    '의료산업경영학과',
  ].sort((a, b) => a.localeCompare(b, 'ko', { sensitivity: 'base' }));

  const cardinalOptions = ['1', '2', '3', '4', '5'];
  const options = isCardinal ? cardinalOptions : departmentOptions;

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    editValue(value);
    setIsOpen(false);
  };

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

  return (
    <Container ref={dropdownRef}>
      <Label $isProfile={isProfile}>{text}</Label>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        $hasValue={!!selectedValue}
      >
        {selectedValue ||
          (isCardinal ? '기수를 선택해주세요' : '학과를 선택해주세요')}
      </Button>
      {isOpen && (
        <List>
          {options.map((option) => (
            <Item key={option} onClick={() => handleSelect(option)}>
              {option}
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
};

export default DropdownMenu;
