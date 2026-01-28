import styled, { keyframes } from 'styled-components';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

// LNB

export const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9;
`;

export const Sidebar = styled.aside`
  position: fixed;
  width: 60%;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${colors.semantic.container.neutral};
  color: ${colors.dark.neutral[900]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${slideIn} 0.3s ease-out forwards;
  z-index: 10;
  padding: 40px 20px 28px 20px;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
`;

export const LNBMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const LNBMenuItem = styled.li<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ active }) =>
    active ? colors.dark.primary : colors.dark.neutral[900]};
  font-size: 16px;
  transition: color 0.2s ease;
  padding: 12px 8px;
  border-radius: 12px;

  &:hover {
    background-color: ${colors.dark.neutral[400]};
  }

  span {
    flex: 1;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Logout = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.dark.neutral[800]};
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 8px 12px;
  border-radius: 12px;
  ${typography.Button1};

  &:hover {
    background-color: ${colors.dark.neutral[400]};
  }

  span {
    margin-left: 8px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 12px;

  cursor: pointer;
  padding: 8px 12px;
  border-radius: 12px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p {
    color: ${colors.dark.neutral[800]};
    ${typography.Sub2};
    margin: 0;
    line-height: 20px;
  }

  small {
    color: #a6a6a6;
    ${typography.Caption1};
    margin-top: 4px;
  }

  &:hover {
    background-color: ${colors.semantic.container['neutral-interaction']};
  }

  &:before {
    content: '';

    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${colors.dark.neutral[400]};
  }
`;

// DesktopGNB

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: ${units.device.desktop};
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background-color: ${colors.dark.neutral[200]};
  box-sizing: border-box;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  height: 40px;
  margin-right: 16px;
  cursor: pointer;
`;

export const GNBMenu = styled.ul`
  display: flex;
  gap: 16px;
  color: ${colors.dark.neutral[900]};
  list-style: none;
  padding: 5px 0 0 0;
`;

export const GNBMenuItem = styled.li<{ $active?: boolean }>`
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) =>
    $active ? colors.dark.primary[500] : colors.dark.neutral[900]};
  transition: color 0.2s;

  &:hover {
    color: ${colors.dark.primary[500]};
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Profile = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const WriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${units.margin['100']}px;
  padding: ${units.margin['200']}px ${units.padding['400']}px;
  background-color: ${colors.semantic.button.primary};
  border-radius: ${units.radius.md}px;
  border: none;
  cursor: pointer;
  ${typography.Button1};
  color: ${colors.semantic.text.inverse};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.semantic.button['primary-interaction']};
  }
`;
