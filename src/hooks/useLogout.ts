import { useNavigate } from 'react-router-dom';
import { useOpenSelectModal } from '@/stores/selectModalStore';

const useLogout = () => {
  const navigate = useNavigate();
  const openSelectModal = useOpenSelectModal();

  const onClickLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
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
