import deleteUser from '@/api/deleteUser';
import { toastError, toastInfo } from '@/components/common/ToastMessage';
import MyInfo from '@/components/MyPage/MyInfo';
import useCustomBack from '@/hooks/useCustomBack';
import handleLogout from '@/hooks/handleLogout';
import * as S from '@/styles/mypage/Mypage.styled';

import { useNavigate } from 'react-router-dom';
import {
  useCloseSelectModal,
  useOpenSelectModal,
} from '@/stores/selectModalStore';
import { useCloseMenuModal, useOpenMenuModal } from '@/stores/menuModalStore';
import { ResponsiveContainer } from '@/styles';
import { KebabIcon } from '@/styles/board/PostDetail.styled';
import { PageHeader } from './attend/Penalty';

const MyPage = () => {
  useCustomBack('/home');

  const navigate = useNavigate();
  const openSelectModal = useOpenSelectModal();
  const closeSelectModal = useCloseSelectModal();

  const openMenuModal = useOpenMenuModal();
  const closeMenuModal = useCloseMenuModal();

  const confirmLogout = handleLogout();

  const onClickLeave = async () => {
    try {
      await deleteUser();
      toastInfo('탈퇴가 완료되었습니다');
      setTimeout(() => {
        navigate('/');
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toastError('탈퇴 중 문제가 발생하였습니다.');
    }
    closeSelectModal();
  };

  const handleMenu = () => {
    openMenuModal({
      topPadding: false,
      children: (
        <>
          <S.TextButton
            onClick={() => {
              closeMenuModal();
              navigate('/edit');
            }}
          >
            정보 수정
          </S.TextButton>
          <S.TextButton onClick={confirmLogout}>로그아웃</S.TextButton>
          <S.TextButton
            $isSignOut
            onClick={() => {
              closeMenuModal();
              openSelectModal({
                title: '회원 탈퇴',
                content: '정말 탈퇴하시겠습니까?',
                buttonContent: '탈퇴',
                onDelete: onClickLeave,
              });
            }}
          >
            탈퇴
          </S.TextButton>
        </>
      ),
    });
  };

  return (
    <ResponsiveContainer>
      <PageHeader>
        My
        <KebabIcon onClick={handleMenu} />
      </PageHeader>
      <MyInfo />
    </ResponsiveContainer>
  );
};

export default MyPage;
