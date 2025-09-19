import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import open from '@/assets/images/ic_opened_dropdown.svg';
import close from '@/assets/images/ic_default_dropdown.svg';
import { PartTypes } from '@/types/part';
import CheckIcon from '@/assets/images/ic_dropdown_check.svg?react';
import DeleteIcon from '@/assets/images/ic_dropdown_delete.svg?react';

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  min-width: 82px;
  height: 32px;
  box-sizing: border-box;
  font-family: ${theme.font.semiBold};
`;

const DropdownButton = styled.div<{ $hasValue: boolean }>`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  outline: none;
  background-color: ${theme.color.gray[20]};
  color: ${theme.color.gray[100]};
  font-size: 14px;
  border-radius: 10px;
  padding: 6px 6px 6px 10px;
  cursor: pointer;
`;

const DropdownList = styled.div`
  position: absolute;
  width: 144px;
  max-height: 187px;
  top: 100%;
  margin-top: 4px;
  z-index: 1000;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${theme.color.gray[20]};
  padding: 5px 0px;
`;

const DropdownItem = styled.div`
  display: flex;
  padding: 8px;
  font-size: 16px;
  line-height: 24px;
  color: white;
  cursor: pointer;
  background-color: ${theme.color.gray[20]};
  gap: 4px;

  &:hover {
    background-color: ${theme.color.gray[9]};
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

const Checkbox = styled.div<{ $checked?: boolean; $indeterminate?: boolean }>`
  width: 16px;
  height: 16px;
  border: ${({ $checked, $indeterminate }) =>
    $checked || $indeterminate ? 'none' : `1px solid ${theme.color.gray[65]}`};
  border-radius: 3px;
  background-color: ${({ $checked, $indeterminate }) =>
    $checked || $indeterminate ? theme.color.positive : 'transparent'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

type RealPart = Exclude<PartTypes, '' | 'ALL'>;

const REAL_PARTS: RealPart[] = ['FE', 'BE', 'D', 'PM'];

const PART_LABEL: Record<PartTypes, string> = {
  '': '파트',
  ALL: '전체',
  FE: 'FE',
  BE: 'BE',
  D: 'D',
  PM: 'PM',
};

interface PartDropdownProps {
  value: RealPart[];
  onChange: (value: RealPart[]) => void;
}

const PartDropdown = ({ value, onChange }: PartDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedParts, setSelectedParts] = useState<RealPart[]>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setSelectedParts(value), [value]);

  const handleToggle = () => setIsOpen((v) => !v);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAllSelected = selectedParts.length === REAL_PARTS.length;
  const isNoneSelected = selectedParts.length === 0;
  const isIndeterminate = !isAllSelected && !isNoneSelected;

  const toggleAll = () => {
    const next = isAllSelected ? [] : REAL_PARTS;
    setSelectedParts(next);
    onChange(next);
  };

  const toggleOne = (p: RealPart) => {
    const next = selectedParts.includes(p)
      ? selectedParts.filter((x) => x !== p)
      : [...selectedParts, p];
    setSelectedParts(next);
    onChange(next);
  };

  const getButtonLabel = () => {
    if (isAllSelected) return '전체';
    if (isNoneSelected) return '파트';
    return selectedParts.join(', ');
  };

  const renderAllIcon = () => {
    if (isIndeterminate) return <DeleteIcon />;
    if (isAllSelected) return <CheckIcon />;
    return null;
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={handleToggle} $hasValue={!isNoneSelected}>
        {getButtonLabel()}
        {isOpen ? (
          <img src={open} alt="open" />
        ) : (
          <img src={close} alt="close" />
        )}
      </DropdownButton>

      {isOpen && (
        <DropdownList onMouseDown={(e) => e.stopPropagation()}>
          <DropdownItem
            onMouseDown={(e) => {
              e.stopPropagation();
              toggleAll();
            }}
            role="menuitemcheckbox"
            aria-checked={isAllSelected}
          >
            <CheckBoxContainer>
              <Checkbox
                $checked={isAllSelected}
                $indeterminate={isIndeterminate}
              >
                {renderAllIcon()}
              </Checkbox>
            </CheckBoxContainer>
            <span>{PART_LABEL.ALL}</span>
          </DropdownItem>

          {REAL_PARTS.map((p) => {
            const checked = selectedParts.includes(p);
            return (
              <DropdownItem
                key={p}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  toggleOne(p);
                }}
                role="menuitemcheckbox"
                aria-checked={checked}
              >
                <CheckBoxContainer>
                  <Checkbox $checked={checked}>
                    {checked ? <CheckIcon /> : null}
                  </Checkbox>
                </CheckBoxContainer>
                <span>{PART_LABEL[p]}</span>
              </DropdownItem>
            );
          })}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default PartDropdown;
