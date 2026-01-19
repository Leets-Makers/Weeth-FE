import { AxiosError } from 'axios';
import { toastError } from '@/components/common/ToastMessage';
import { useNavigate } from 'react-router-dom';

interface ErrorResponse {
  message?: string;
}

const useError = () => {
  const navigate = useNavigate();
  return (error: unknown) => {
    if (!(error instanceof AxiosError)) {
      toastError('알 수 없는 오류가 발생했습니다.');
      return;
    }

    const status = error.response?.status;
    const message = (error.response?.data as ErrorResponse)?.message;

    switch (status) {
      // 인증, 인가
      case 401:
        toastError(message ?? '로그인이 필요합니다.');
        navigate('/');
        return;

      case 403:
        toastError(message ?? '권한이 없습니다.');
        return;

      // 잘못된 요청, 사용자 입력
      case 400:
        toastError(message ?? '잘못된 요청입니다.');
        return;

      // 리소스 없음
      case 404:
        toastError(message ?? '요청한 데이터를 찾을 수 없습니다.');
        return;

      // 서버 오류
      case 500:
      default:
        toastError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };
};

export default useError;
