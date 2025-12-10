import theme from '@/styles/theme';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 171px;
  height: 32px;
  box-sizing: border-box;
  padding: 6px 10px;
  border-radius: 10px;
  background-color: ${theme.color.gray[18]};
`;

export const Input = styled.input<{ $isNew?: boolean }>`
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

export const StudyDropdownList = styled.div`
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

export const StudyDropdownItem = styled.div`
  padding: 8px 16px;
  min-height: 40px;
  left: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-family: ${theme.font.regular};
  gap: 10px;

  &:hover {
    background-color: ${theme.color.gray[9]};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
`;

export const ClearButton = styled.div`
  padding-top: 3px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HiddenText = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 14px;
  font-family: ${theme.font.regular};
  color: ${theme.color.gray[65]};
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  width: 82px;
  min-width: 82px;
  height: 32px;
  box-sizing: border-box;
`;

export const DropdownButton = styled.div<{ $hasValue: boolean }>`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  outline: none;
  background-color: ${colors.semantic.container.neutral};
  color: ${colors.semantic.text.normal};
  ${typography.Button2};
  padding: 6px ${units.padding['200']}px 6px ${units.padding['300']}px;
  border-radius: ${units.radius.md}px;
  cursor: pointer;
`;

export const DropdownList = styled.div`
  position: absolute;
  width: 144px;
  max-height: 190px;
  top: 100%;
  margin-top: 4px;
  z-index: 1000;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: ${colors.semantic.container.neutral};
  padding: ${units.padding['100']}px 0;
`;

export const DropdownItem = styled.div`
  padding: ${units.padding['200']}px 16px;
  ${typography.Button1};
  color: ${colors.semantic.text.strong};
  cursor: pointer;
  background-color: ${colors.semantic.container.neutral};

  &:hover {
    background-color: ${colors.semantic.container['neutral-interaction']};
  }
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const Checkbox = styled.div<{
  $checked?: boolean;
  $indeterminate?: boolean;
}>`
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
