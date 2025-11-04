import styled from 'styled-components';
import Menu from '@/assets/images/ic_menu.svg?react';
import logo from '@/assets/images/ic_logo.svg';
import profile from '@/assets/images/ic_DE.svg';
import { useState } from 'react';
import LNB from './LNB';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #1f1f1f;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  height: 28px;
`;

const Profile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const MobileGNB = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Container>
        <Left>
          <Menu width={24} onClick={() => setIsOpen(true)} />
          <Logo src={logo} alt="Weeth" />
        </Left>
        <Profile src={profile} alt="profile" />
      </Container>
      {isOpen && <LNB onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default MobileGNB;
