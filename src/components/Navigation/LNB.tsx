import { useNavigate, useLocation } from 'react-router-dom';
import Close from '@/assets/images/ic_close.svg?react';
import Logo from '@/assets/images/ic_name_logo.svg?react';
import ICCalender from '@/assets/images/ic_home_calendar.svg?react';
import ICAttend from '@/assets/images/ic_home_attend.svg?react';
import ICBoard from '@/assets/images/ic_home_board.svg?react';
import useGetUserInfo from '@/api/useGetUserInfo';
import useSetPosition from '@/hooks/useSetPosition';
import * as S from '@/styles/navigation/Navigation.styled';
import LogoutButton from '@/components/home/LogoutButton';
import useLogout from '@/hooks/useLogout';

const LNB = ({ onClose }: { onClose: () => void }) => {
  const { userInfo } = useGetUserInfo();
  const { characterImg } = useSetPosition(userInfo?.position || '');
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

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
    onClose();
  };

  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.Sidebar>
        <div>
          <S.Header>
            <Logo
              width={80}
              height={40}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/home')}
            />
            <S.CloseButton onClick={onClose}>
              <Close height={24} />
            </S.CloseButton>
          </S.Header>

          <S.LNBMenu>
            {menus.map((menu) => (
              <S.LNBMenuItem
                key={menu.name}
                onClick={() => handleNavigate(menu.path)}
                active={location.pathname.startsWith(menu.path)}
              >
                {menu.icon && menu.icon}
                <span>{menu.name}</span>
              </S.LNBMenuItem>
            ))}
          </S.LNBMenu>
        </div>

        <S.Footer>
          <S.Logout onClick={logout}>
            <LogoutButton />
            <span>Log out</span>
          </S.Logout>
          <S.UserInfo
            onClick={() => {
              navigate('/mypage');
              onClose();
            }}
          >
            <img src={characterImg} alt="profile" />
            <div>
              <p>{userInfo?.name}</p>
              <small>
                {userInfo?.position} | {userInfo?.cardinals?.[0] ?? '0'}기
              </small>
            </div>
          </S.UserInfo>
        </S.Footer>
      </S.Sidebar>
    </>
  );
};

export default LNB;
