import * as BoardS from '@/styles/board/Board.styled';
import { useCloseMenuModal, useOpenMenuModal } from '@/stores/menuModalStore';
import { useNavigate } from 'react-router-dom';
import useUserData from '@/hooks/queries/useUserData';

export const BOARD_WRITE_MENU_ITEMS = [
  { label: '스터디로그', path: '/board/study/post' },
  { label: '아티클', path: '/board/article/post' },
  { label: '공지사항', path: '/board/notices/post' },
  { label: '교육자료', path: '/board/education/post' },
] as const;

const USER_BOARD_WRITE_MENU_ITEMS = [
  { label: '스터디로그', path: '/board/study/post' },
  { label: '아티클', path: '/board/article/post' },
] as const;

export const useBoardWriteMenu = () => {
  const openMenuModal = useOpenMenuModal();
  const closeMenuModal = useCloseMenuModal();
  const navigate = useNavigate();
  const { data: userInfo } = useUserData();
  const isAdmin = userInfo?.role === 'ADMIN';
  const menuItems = isAdmin
    ? BOARD_WRITE_MENU_ITEMS
    : USER_BOARD_WRITE_MENU_ITEMS;
  const children = (
    <>
      {menuItems.map((item, index) => (
        <BoardS.TextButton
          key={item.label}
          $isFirst={index === 0}
          $isLast={index === menuItems.length - 1}
          onClick={() => {
            navigate(item.path);
            closeMenuModal();
          }}
        >
          {item.label}
        </BoardS.TextButton>
      ))}
    </>
  );

  const openFromFloating = () => {
    openMenuModal({
      floatingButtonPosition: true,
      children,
    });
  };

  const openFromHeaderButton = (anchorEl: HTMLElement) => {
    const rect = anchorEl.getBoundingClientRect();
    const top = rect.bottom + 8;
    const right = window.innerWidth - rect.right;

    openMenuModal({
      headerButtonTop: top,
      headerButtonRight: right,
      children,
    });
  };

  return { openFromFloating, openFromHeaderButton };
};
