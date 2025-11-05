import styled, { keyframes } from 'styled-components';
import Close from '@/assets/images/ic_close.svg?react';
import Logo from '@/assets/images/ic_logo.svg?react';
import ICCalender from '@/assets/images/ic_home_calendar.svg?react';
import ICAttend from '@/assets/images/ic_home_attend.svg?react';
import ICBoard from '@/assets/images/ic_home_board.svg?react';
import useGetUserInfo from '@/api/useGetUserInfo';
import useSetPosition from '@/hooks/useSetPosition';
import LogoutButton from '../home/LogoutButton';

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9;
`;

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100%;
  background-color: #222;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${slideIn} 0.3s ease-out;
  z-index: 10;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Menu = styled.ul`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: #f3f3f3;
    font-size: 15px;
    &:hover {
      color: #72f5c9;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Logout = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #bbb;
  &:hover {
    color: #fff;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid #444;
  padding-top: 16px;

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }

  p {
    margin: 0;
    font-weight: 500;
  }

  small {
    color: #aaa;
  }
`;

interface LNBProps {
  onClose: () => void;
}

const LNB = ({ onClose }: LNBProps) => {
  const { userInfo } = useGetUserInfo();
  const { characterImg } = useSetPosition(userInfo?.position || '', true);
  return (
    <>
      <Overlay onClick={onClose} />
      <Sidebar>
        <Header>
          <Logo height={28} />
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </Header>

        <Menu>
          <li>
            <ICCalender />
            <span>동아리 일정</span>
          </li>
          <li>
            <ICBoard />
            <span>게시판</span>
          </li>
          <li>
            <ICAttend />
            <span>출석</span>
          </li>
          <li>멤버</li>
          <li>회비</li>
        </Menu>

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
                {userInfo?.position} | {userInfo?.cardinals[0]}
              </small>
            </div>
          </UserInfo>
        </Footer>
      </Sidebar>
    </>
  );
};

export default LNB;
