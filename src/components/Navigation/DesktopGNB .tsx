import styled from 'styled-components';
import logo from '@/assets/images/ic_logo.svg';
import profile from '@/assets/images/ic_DE.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #1f1f1f;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 30px;
  margin-right: 24px;
`;

const Menu = styled.ul`
  display: flex;
  gap: 16px;
  color: white;
  list-style: none;
`;

const Right = styled.div``;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const DesktopGNB = () => {
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
        <Profile src={profile} alt="profile" />
      </Right>
    </Container>
  );
};

export default DesktopGNB;
