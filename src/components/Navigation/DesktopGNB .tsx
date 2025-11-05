import styled from 'styled-components';
import logo from '@/assets/images/ic_name_logo.svg';
import useGetUserInfo from '@/api/useGetUserInfo';
import useSetPosition from '@/hooks/useSetPosition';
import { colors, units } from '@/theme/designTokens';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: ${units.device.desktop};
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background-color: ${colors.dark.neutral[200]};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-left: 16px;
`;

const Menu = styled.ul`
  display: flex;
  gap: 16px;
  color: ${colors.light.neutral[0]};
  list-style: none;
  padding: 0;
`;

const Right = styled.div``;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const DesktopGNB = () => {
  const { userInfo } = useGetUserInfo();
  const { characterImg } = useSetPosition(userInfo?.position || '', true);
  return (
    <Container>
      <Left>
        <Logo src={logo} alt="Weeth" />
        <Menu>
          <li>동아리일정</li>
          <li>게시판</li>
          <li>출석</li>
          <li>멤버</li>
          <li>회비</li>
        </Menu>
      </Left>
      <Right>
        <Profile src={characterImg} alt="profile" />
      </Right>
    </Container>
  );
};

export default DesktopGNB;
