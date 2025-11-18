import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';
import { toastError } from '@/components/common/ToastMessage';

const AppleRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get('code');
    const redirectPath = params.get('state') || '/home';

    if (!code) return;
    localStorage.setItem('appleAuthCode', code);
    api
      .post(`/api/v1/users/apple/login`, {
        authCode: code,
      })
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { status, accessToken, refreshToken, appleIdToken } =
          res.data.data;
        localStorage.setItem('register', 'apple');

        if (status === 'LOGIN') {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          navigate(redirectPath, { replace: true });
        } else {
          navigate('/accountcheck');
        }
      })
      .catch(() => {
        toastError('Apple 로그인에 실패했습니다.');
        navigate('/');
      });
  }, [navigate]);

  return <div />;
};

export default AppleRedirect;
