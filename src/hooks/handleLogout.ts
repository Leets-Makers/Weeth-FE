import { useOpenSelectModal } from '@/stores/selectModalStore';
import { useNavigate } from 'react-router-dom';

const handleLogout = () => {
  const navigate = useNavigate();
  const openSelectModal = useOpenSelectModal();

  const onClickLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  const confirmLogout = () => {
    openSelectModal({
      title: '로그아웃 하시겠습니까?',
      content: '',
      onDelete: onClickLogout,
      buttonContent: '확인',
    });
  };

  return confirmLogout;
};

export default handleLogout;
