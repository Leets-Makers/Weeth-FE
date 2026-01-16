import React from 'react';
import styled from 'styled-components';
import Button from '@/components/Button/Button';
import useLogout from '@/hooks/useLogout';
import { colors, units } from '@/theme/designTokens';
import { useTheme } from 'styled-components';

export const TopBarWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-width: 1500px;
  background-color: ${({ theme }) => theme.backGround};
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-right: 5%;
  align-items: center;
  z-index: 10;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 24px;
`;

export const Description = styled.p`
  padding-left: 20px;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.semantic.text.alternative};
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
interface TopBarProps {
  title: string;
  description: string;
}

const TopBar: React.FC<TopBarProps> = ({ title, description }) => {
  const theme = useTheme();
  const logout = useLogout();

  return (
    <TopBarWrapper>
      <TitleContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TitleContainer>
      <Button
        color={theme.semantic.button.neutral}
        textcolor={theme.semantic.text.strong}
        height="45px"
        width="85px"
        borderRadius={`${units.radius.md}px`}
        isSemibold={false}
        onClick={logout}
      >
        Logout
      </Button>
    </TopBarWrapper>
  );
};

export default TopBar;
