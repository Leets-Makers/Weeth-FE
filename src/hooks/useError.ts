import { AxiosError } from 'axios';
import { toastError } from '@/components/common/ToastMessage';

const useError = () => {
  return (error: unknown) => {
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (status === 401) {
        toastError('로그인이 필요합니다.');
        // logout or redirect 가능
        return;
      }

      if (status === 403) {
        toastError('권한이 없습니다.');
        return;
      }

      toastError(error.response?.data?.message ?? '서버 오류가 발생했습니다.');
    } else {
      toastError('알 수 없는 오류가 발생했습니다.');
    }
  };
};

export default useError;
