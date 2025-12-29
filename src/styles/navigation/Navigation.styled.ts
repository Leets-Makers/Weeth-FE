import styled, { keyframes } from 'styled-components';
import { colors, units } from '@/theme/designTokens';

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
  background-color: ${colors.dark.neutral[300]};
  color: ${colors.light.neutral[0]};
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
    active ? colors.light.primary : colors.light.neutral[0]};
  font-size: 16px;
  transition: color 0.2s ease;
  padding: 12px 8px;
  border-radius: 12px;

  &:hover {
    background-color: ${colors.light.neutral[500]};
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
  color: ${colors.light.neutral[100]};
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 16px;

  &:hover {
    background-color: ${colors.light.neutral[500]};
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
    color: ${colors.light.neutral[100]};
    font-weight: 600;
    font-size: 16px;
    margin: 0;
    line-height: 20px;
  }

  small {
    color: #a6a6a6;
    font-size: 12px;
    margin-top: 4px;
  }

  &:hover {
    background-color: ${colors.light.neutral[500]};
  }

  &:before {
    content: '';

    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${colors.light.neutral[500]};
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
  color: ${colors.light.neutral[0]};
  list-style: none;
  padding: 5px 0 0 0;
`;

export const GNBMenuItem = styled.li<{ $active?: boolean }>`
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) =>
    $active ? colors.light.primary[500] : colors.light.neutral[0]};
  transition: color 0.2s;

  &:hover {
    color: ${colors.light.primary[500]};
  }
`;

export const Right = styled.div``;

export const Profile = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
