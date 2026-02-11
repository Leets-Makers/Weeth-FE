import { useNavigate } from 'react-router-dom';
import { useOpenSelectModal } from '@/stores/selectModalStore';
import { useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
  const navigate = useNavigate();
  const openSelectModal = useOpenSelectModal();
  const queryClient = useQueryClient();

  const onClickLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('kakaoId');
    localStorage.removeItem('register');
    localStorage.removeItem('appleAuthCode');

    queryClient.clear();

    navigate('/');
  };

  const confirmLogout = () => {
    openSelectModal({
      title: '로그아웃',
      content: '로그아웃 하시겠습니까?',
      onDelete: onClickLogout,
      buttonContent: '확인',
    });
  };

  return confirmLogout;
};

export default useLogout;
