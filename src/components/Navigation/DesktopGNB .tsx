import styled from 'styled-components';
import logo from '@/assets/images/ic_name_logo.svg';
import useGetUserInfo from '@/api/useGetUserInfo';
import useSetPosition from '@/hooks/useSetPosition';
import { colors, units } from '@/theme/designTokens';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: ${units.device.desktop};
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background-color: ${colors.dark.neutral[200]};
  box-sizing: border-box;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 16px;
  cursor: pointer;
`;

const Menu = styled.ul`
  display: flex;
  gap: 16px;
  color: ${colors.light.neutral[0]};
  list-style: none;
  padding: 5px 0 0 0;
`;

const MenuItem = styled.li<{ active?: boolean }>`
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  color: ${({ active }) =>
    active ? colors.light.primary[500] : colors.light.neutral[0]};
  transition: color 0.2s;

  &:hover {
    color: ${colors.light.primary[500]};
  }
`;

const Right = styled.div``;

const Profile = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const DesktopGNB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useGetUserInfo();
  const { characterImg } = useSetPosition(userInfo?.position || '');

  const menus = [
    { name: '동아리일정', path: '/calendar' },
    { name: '게시판', path: '/board' },
    { name: '출석', path: '/attendance' },
    { name: '멤버', path: '/member' },
    { name: '회비', path: '/dues' },
  ];

  return (
    <Container>
      <Left>
        <Logo src={logo} alt="Weeth" onClick={() => navigate('/home')} />
        <Menu>
          {menus.map((menu) => (
            <MenuItem
              key={menu.name}
              active={location.pathname.startsWith(menu.path)}
              onClick={() => navigate(menu.path)}
            >
              {menu.name}
            </MenuItem>
          ))}
        </Menu>
      </Left>
      <Right>
        <Profile
          src={characterImg}
          alt="profile"
          onClick={() => navigate('/mypage')}
        />
      </Right>
    </Container>
  );
};

export default DesktopGNB;
