import styled from 'styled-components';
import logo from '@/assets/images/ic_name_logo.svg';
import { useState } from 'react';
import useSetPosition from '@/hooks/useSetPosition';
import Menu from '@/assets/images/ic_hamburger_menu.svg?react';
import { colors } from '@/theme/designTokens';
import { useNavigate } from 'react-router-dom';
import LNB from '@/components/Navigation/LNB';
import useUserData from '@/hooks/queries/useUserData';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px 12px 8px;
  background-color: ${colors.dark.neutral[200]};
  box-sizing: border-box;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const MobileGNB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userInfo } = useUserData();
  const { characterImg } = useSetPosition(userInfo?.position || '');

  const navi = useNavigate();
  return (
    <>
      <Container>
        <Left>
          <Menu
            style={{ cursor: 'pointer', padding: 8 }}
            width={24}
            onClick={() => setIsOpen(true)}
          />
          <Logo src={logo} alt="Weeth" onClick={() => navi('/home')} />
        </Left>
        <Profile
          src={characterImg}
          alt="profile"
          onClick={() => navi('/mypage')}
        />
      </Container>
      {isOpen && <LNB onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default MobileGNB;
