import deleteUser from '@/api/deleteUser';
import MenuModal from '@/components/common/MenuModal';
import { toastError, toastInfo } from '@/components/common/ToastMessage';
import Header from '@/components/Header/Header';
import SelectModal from '@/components/Modal/SelectModal';
import MyInfo from '@/components/MyPage/MyInfo';
import useCustomBack from '@/hooks/useCustomBack';
import useLogout from '@/hooks/useLogout';
import * as S from '@/styles/mypage/Mypage.styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  useCustomBack('/home');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const navigate = useNavigate();

  const openSelectModal = () => {
    setIsSelectModalOpen(true);
  };

  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
  };

  const confirmLogout = useLogout();

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

  return (
    <S.Container>
      {isModalOpen && (
        <MenuModal
          mobileOnly
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <S.TextButton
            onClick={() => {
              navigate('/edit');
            }}
          >
            정보 수정
          </S.TextButton>
          <S.TextButton onClick={confirmLogout}>로그아웃</S.TextButton>
          <S.TextButton isSignOut onClick={openSelectModal}>
            탈퇴
          </S.TextButton>
        </MenuModal>
      )}
      {isSelectModalOpen && (
        <SelectModal
          title="회원 탈퇴"
          content="정말 탈퇴하시겠습니까?"
          buttonContent="탈퇴"
          onClose={closeSelectModal}
          onDelete={onClickLeave}
        />
      )}
      <Header
        RightButtonType="MENU"
        onClickRightButton={() => {
          setIsModalOpen(true);
        }}
        isAccessible
      >
        MY
      </Header>
      <MyInfo />
    </S.Container>
  );
};

export default MyPage;
