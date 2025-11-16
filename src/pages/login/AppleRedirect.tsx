import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';
import { toastError } from '@/components/common/ToastMessage';

const AppleRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get('code');
    const idToken = params.get('id_token');
    const redirectPath = params.get('state') || '/home';

    if (!code) return;

    api
      .post(`/api/v1/users/apple/login`, {
        authCode: code,
        idToken,
      })
      .then((res) => {
        const { status, accessToken, refreshToken, appleId } = res.data.data;

        localStorage.setItem('appleId', appleId);

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
