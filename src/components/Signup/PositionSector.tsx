import { colors } from '@/theme/designTokens';
import React from 'react';
import styled from 'styled-components';

const PositionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  font-size: 16px;
`;

const PositionLabel = styled.div`
  width: 42px;
  text-align: left;
  color: ${colors.semantic.text.normal};
`;

const Positions = styled.div`
  display: flex;
  width: 257px;
  height: 45px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const PositionName = styled.div`
  width: auto;
  margin-left: 5px;
  margin-right: 6px;
  font-size: 16px;
  line-height: 19.09px;
  color: ${colors.semantic.text.normal};
`;

const PositionBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  background-color: ${colors.semantic.button.neutral};
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  ${HiddenCheckbox}:checked + & {
    background-color: ${colors.semantic.button.neutral};
  }

  &::after {
    content: '';
    position: absolute;
    width: 14px; /* Internal square size */
    height: 14px; /* Internal square size */
    background-color: ${({ checked }) =>
      checked ? colors.semantic.brand.primary : colors.semantic.button.neutral};
    border-radius: 1px;
    top: 2px;
    left: 2px;
  }
`;

// Type definitions for PositionCheckbox props
interface PositionCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const PositionCheckbox: React.FC<PositionCheckboxProps> = ({
  checked,
  onChange,
}) => (
  <>
    <HiddenCheckbox checked={checked} onChange={onChange} />
    <StyledCheckbox checked={checked} onClick={onChange} />
  </>
);

// List of positions
const positions = ['FE', 'BE', 'DE', 'PM'];

// Type definitions for PositionSector props
interface PositionSectorProps {
  labelName: string;
  value: string;
  onChange: (position: string) => void;
}

const PositionSector: React.FC<PositionSectorProps> = ({
  labelName,
  value,
  onChange,
}) => {
  return (
    <PositionContainer>
      <PositionLabel>{labelName}</PositionLabel>
      <Positions>
        {positions.map((position) => (
          <PositionBoxContainer key={position}>
            <PositionCheckbox
              checked={value === position}
              onChange={() => onChange(position)}
            />
            <PositionName>{position}</PositionName>
          </PositionBoxContainer>
        ))}
      </Positions>
    </PositionContainer>
  );
};

export default PositionSector;
