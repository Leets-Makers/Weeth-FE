import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import open from '@/assets/images/ic_opened_dropdown.svg';
import close from '@/assets/images/ic_default_dropdown.svg';
import useGetAllCardinals from '@/api/useGetCardinals';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

interface DropdownStyles {
  containerWidth?: string;
  buttonPadding?: string;
  buttonBackgroundColor?: string;
  listWidth?: string;
  listMarginTop?: string;
  itemPadding?: string;
  itemBackgroundColor?: string;
  itemHoverBackgroundColor?: string;
  itemGap?: string;
}

const DropdownContainer = styled.div<{ $styles?: DropdownStyles }>`
  position: relative;
  display: flex;
  width: ${(props) => props.$styles?.containerWidth || '93px'};
  min-width: ${(props) => props.$styles?.containerWidth || '93px'};
  box-sizing: border-box;
`;

const DropdownButton = styled.button<{
  $hasValue: boolean;
  $styles?: DropdownStyles;
}>`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  outline: none;
  background-color: ${(props) =>
    props.$styles?.buttonBackgroundColor || colors.semantic.container.neutral};
  color: ${colors.semantic.text.normal};
  ${typography.Button2};
  border-radius: ${units.radius.lg}px;
  padding: ${(props) =>
    props.$styles?.buttonPadding ||
    `10px ${units.padding['200']}px 10px ${units.padding['300']}px`};
  box-sizing: border-box;
  cursor: pointer;
`;

const DropdownList = styled.div<{ $styles?: DropdownStyles }>`
  position: absolute;
  width: ${(props) => props.$styles?.listWidth || '93px'};
  max-height: 190px;
  top: 100%;
  margin-top: ${(props) => props.$styles?.listMarginTop || '5px'};
  z-index: 1000;
  overflow-y: auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$styles?.itemGap || '0'};
`;

const DropdownItem = styled.div<{ $styles?: DropdownStyles }>`
  padding: ${(props) => props.$styles?.itemPadding || '10px'};
  font-size: 14px;
  color: white;
  cursor: pointer;
  background-color: ${(props) =>
    props.$styles?.itemBackgroundColor || colors.semantic.button.neutral};

  &:hover {
    background-color: ${(props) =>
      props.$styles?.itemHoverBackgroundColor ||
      colors.semantic.button['neutral-interaction']};
  }
`;

const CardinalDropdown = ({
  origValue,
  editValue,
  isMember,
  styles,
}: {
  origValue: number | null;
  editValue: (value: number | null) => void;
  isMember?: boolean;
  styles?: DropdownStyles;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | null>(origValue);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { allCardinals } = useGetAllCardinals();

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
    <DropdownContainer ref={dropdownRef} $styles={styles}>
      <DropdownButton
        type="button"
        onClick={handleToggle}
        $hasValue={!!selectedValue}
        $styles={styles}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedValue ? `${selectedValue}기` : '기수'}
        {isOpen ? (
          <img src={open} alt="open" />
        ) : (
          <img src={close} alt="close" />
        )}
      </DropdownButton>

      {isOpen && (
        <DropdownList $styles={styles}>
          {options.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $styles={styles}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default CardinalDropdown;
