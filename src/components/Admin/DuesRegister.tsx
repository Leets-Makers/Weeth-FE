import styled from 'styled-components';
import { useState } from 'react';
import DownButton from '@/assets/images/ic_admin_cardinal.svg?react';
import DuesRegisterDropDown from '@/components/Admin/DuesRegisterDropDown';
import { units } from '@/theme/designTokens';
import { DropdownButton } from '@/styles/admin/Attendance.styled';

export const Container = styled.div`
  position: relative;
  width: 100%;
`;

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 72px;
  background-color: ${({ $isOpen, theme }) =>
    $isOpen
      ? theme.semantic.container.primary
      : theme.semantic.container.neutral};
  padding: 0 30px;
  box-sizing: border-box;
  border-radius: ${({ $isOpen }) =>
    $isOpen
      ? `${units.radius.lg}px ${units.radius.lg}px 0 0`
      : `${units.radius.lg}px`};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
`;

export const Title = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  color: ${({ $isOpen, theme }) =>
    $isOpen ? theme.semantic.text.inverse : theme.semantic.text.strong};
  transition: color 0.2s ease;
`;

const DuesRegister: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <Wrapper $isOpen={isOpen}>
        <Title $isOpen={isOpen} onClick={toggleForm}>
          총 회비 최초 등록
          <DropdownButton $isOpen={isOpen}>
            <DownButton />
          </DropdownButton>
        </Title>
      </Wrapper>
      {isOpen && <DuesRegisterDropDown />}
    </Container>
  );
};

export default DuesRegister;
