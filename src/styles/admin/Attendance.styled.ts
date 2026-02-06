import { units } from '@/theme/designTokens';
import styled from 'styled-components';

export const AttendanceTable = styled.div<{ $isOpen?: boolean }>`
  width: 95%;
  background-color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.semantic.button.primary : theme.semantic.container.neutral};
  border-radius: ${({ $isOpen }) =>
    $isOpen
      ? `${units.radius.md}px ${units.radius.md}px 0 0`
      : `${units.radius.md}px`};
  border: 1px solid ${({ theme }) => theme.semantic.line};
  display: flex;
  margin-left: 2.5%;
  margin-top: 15px;
  border-collapse: collapse;
  border-spacing: 0;
  cursor: pointer;

  &:last-child {
    margin-bottom: 15px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 25px 25px;
  display: flex;
  justify-content: space-between;
`;

export const DateInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DateText = styled.span<{ $isOpen?: boolean }>`
  font-size: 20px;
  color: ${({ theme, $isOpen }) =>
    $isOpen === true
      ? theme.semantic.text.inverse
      : theme.semantic.text.normal};
  margin-right: 15px;
  transition: color 0.2s ease;
`;

export const ContentText = styled.span<{ $isOpen?: boolean }>`
  font-size: 20px;
  color: ${({ theme, $isOpen }) =>
    $isOpen === true
      ? theme.semantic.text.inverse
      : theme.semantic.text.normal};
  transition: color 0.2s ease;
`;

export const DropdownButton = styled.div<{ isOpen: boolean }>`
  transition:
    transform 0.3s ease-in-out,
    color 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0)')};
  color: ${({ isOpen, theme }) =>
    isOpen ? theme.semantic.text.inverse : theme.semantic.text.normal};
  display: flex;
  align-items: center;
  justify-content: center;
`;
