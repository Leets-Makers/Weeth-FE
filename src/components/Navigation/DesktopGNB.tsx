import logo from '@/assets/images/ic_name_logo.svg';
import useSetPosition from '@/hooks/useSetPosition';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from '@/styles/navigation/Navigation.styled';
import useUserData from '@/hooks/queries/useUserData';
import FloatingWritingIcon from '@/assets/images/ic_header_floating_writing.svg?react';
import CalendarPostingIcon from '@/assets/images/ic_calendar_posting.svg?react';
import { useRef } from 'react';
import { useBoardWriteMenu } from '@/components/Board/useBoardWriteMenu';

const DesktopGNB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userInfo } = useUserData();
  const { characterImg } = useSetPosition(userInfo?.position || '');
  const { openFromHeaderButton } = useBoardWriteMenu();

  const menus = [
    { name: '게시판', path: '/board' },
    { name: '출석', path: '/attendance' },
    { name: '캘린더', path: '/calendar' },
    { name: '멤버', path: '/member' },
    { name: '회비', path: '/dues' },
  ];

  const isBoardPage = (() => {
    const path = location.pathname;
    if (path === '/board') return true;
    if (!path.startsWith('/board/')) return false;

    // 상세 글 페이지 패턴 제외: 숫자로 끝나는 경로
    const pathSegments = path.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const isDetailPage = /^\d+$/.test(lastSegment);

    return !isDetailPage;
  })();
  const isCalendarPage = location.pathname.startsWith('/calendar');
  const isAdmin = userInfo?.role === 'ADMIN';
  const writeButtonRef = useRef<HTMLButtonElement>(null);

  const handlePosting = () => {
    if (writeButtonRef.current) {
      openFromHeaderButton(writeButtonRef.current);
    }
  };

  return (
    <S.Container>
      <S.Left>
        <S.Logo src={logo} alt="Weeth" onClick={() => navigate('/home')} />
        <S.GNBMenu>
          {menus.map((menu) => (
            <S.GNBMenuItem
              key={menu.name}
              $active={location.pathname.startsWith(menu.path)}
              onClick={() => navigate(menu.path)}
            >
              {menu.name}
            </S.GNBMenuItem>
          ))}
        </S.GNBMenu>
      </S.Left>
      <S.Right>
        {isBoardPage && (
          <S.WriteButton ref={writeButtonRef} onClick={handlePosting}>
            <FloatingWritingIcon width={20} height={20} />
            글쓰기
          </S.WriteButton>
        )}
        {isCalendarPage && isAdmin && (
          <S.WriteButton onClick={() => navigate('/events/create')}>
            <CalendarPostingIcon width={20} height={20} />
            일정추가
          </S.WriteButton>
        )}
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
