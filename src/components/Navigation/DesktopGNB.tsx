import logo from '@/assets/images/ic_name_logo.svg';
import useGetUserInfo from '@/api/useGetUserInfo';
import useSetPosition from '@/hooks/useSetPosition';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from '@/styles/navigation/Navigation.styled';

const DesktopGNB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useGetUserInfo();
  const { characterImg } = useSetPosition(userInfo?.position || '');

  const menus = [
    { name: '동아리일정', path: '/calendar' },
    { name: '게시판', path: ['/board', '/education'] },
    { name: '출석', path: '/attendance' },
    { name: '멤버', path: '/member' },
    { name: '회비', path: '/dues' },
  ];

  return (
    <S.Container>
      <S.Left>
        <S.Logo src={logo} alt="Weeth" onClick={() => navigate('/home')} />
        <S.GNBMenu>
          {menus.map((menu) => (
            <S.GNBMenuItem
              key={menu.name}
              active={
                Array.isArray(menu.path)
                  ? menu.path.some((p) => location.pathname.startsWith(p))
                  : location.pathname.startsWith(menu.path)
              }
              onClick={() =>
                navigate(Array.isArray(menu.path) ? menu.path[0] : menu.path)
              }
            >
              {menu.name}
            </S.GNBMenuItem>
          ))}
        </S.GNBMenu>
      </S.Left>
      <S.Right>
        <S.Profile
          src={characterImg}
          alt="profile"
          onClick={() => navigate('/mypage')}
        />
      </S.Right>
    </S.Container>
  );
};

export default DesktopGNB;
