import styled, { keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Close from '@/assets/images/ic_close.svg?react';
import Logo from '@/assets/images/ic_name_logo.svg?react';
import ICCalender from '@/assets/images/ic_home_calendar.svg?react';
import ICAttend from '@/assets/images/ic_home_attend.svg?react';
import ICBoard from '@/assets/images/ic_home_board.svg?react';
import useGetUserInfo from '@/api/useGetUserInfo';
import useSetPosition from '@/hooks/useSetPosition';
import { colors } from '@/theme/designTokens';
import LogoutButton from '../home/LogoutButton';

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9;
`;

const Sidebar = styled.aside`
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ active }) => (active ? '#72f5c9' : colors.light.neutral[0])};
  font-size: 16px;
  transition: color 0.2s ease;
  padding: 12px 8px;
  border-radius: 8px;

  &:hover {
    color: #72f5c9;
  }

  span {
    flex: 1;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  color: ${colors.light.neutral[100]};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }

  span {
    font-size: 14px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid ${colors.light.neutral[500]};
  padding-top: 16px;

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
`;

interface LNBProps {
  onClose: () => void;
}

const LNB = ({ onClose }: LNBProps) => {
  const { userInfo } = useGetUserInfo();
  const { characterImg } = useSetPosition(userInfo?.position || '', true);
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      name: '동아리 일정',
      icon: <ICCalender width={24} height={24} />,
      path: '/calendar',
    },
    {
      name: '게시판',
      icon: <ICBoard width={24} height={24} />,
      path: '/board',
    },
    {
      name: '출석',
      icon: <ICAttend width={24} height={24} />,
      path: '/attendance',
    },
    { name: '멤버', path: '/member' },
    { name: '회비', path: '/dues' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose(); // 사이드바 닫기
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <Sidebar>
        <div>
          <Header>
            <Logo width={80} height={40} />
            <CloseButton onClick={onClose}>
              <Close height={24} />
            </CloseButton>
          </Header>

          <Menu>
            {menus.map((menu) => (
              <MenuItem
                key={menu.name}
                onClick={() => handleNavigate(menu.path)}
                active={location.pathname.startsWith(menu.path)}
              >
                {menu.icon && menu.icon}
                <span>{menu.name}</span>
              </MenuItem>
            ))}
          </Menu>
        </div>

        <Footer>
          <Logout>
            <LogoutButton />
            <span>Log out</span>
          </Logout>
          <UserInfo>
            <img src={characterImg} alt="profile" />
            <div>
              <p>{userInfo?.name}</p>
              <small>
                {userInfo?.position} | {userInfo?.cardinals[0]}기
              </small>
            </div>
          </UserInfo>
        </Footer>
      </Sidebar>
    </>
  );
};

export default LNB;
