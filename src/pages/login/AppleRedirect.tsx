/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppleRedirect: React.FC = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get('code');
    const rawState = params.get('state');
    const [mode, redirectPath] = rawState?.split('::') ?? ['login', '/home'];

    if (!code) {
      return;
    }

    localStorage.setItem('appleAuthCode', code);

    if (mode === 'login') {
      axios
        .post(`${BASE_URL}/api/v1/users/apple/login`, {
          authCode: code,
        })
        .then((res) => {
          const { status, accessToken, refreshToken } = res.data.data;

          if (res.data.code === 200) {
            if (status === 'LOGIN') {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              navigate(redirectPath, { replace: true });
            } else {
              alert('가입된 계정이 없습니다. 회원가입부터 진행해 주세요.');
              navigate('/register');
            }
          }
        })
        .catch((error) => {
          console.error('Full error:', error);
          if ((error.response.data as { code: number }).code === 401) {
            alert('가입된 계정이 없습니다. 회원가입부터 진행해 주세요.');
            navigate('/register');
            return;
          }
          if ((error.response.data as { code: number }).code === 403) {
            navigate('/waiting-approval');
            return;
          }

          alert('Apple 로그인에 실패했습니다.');
          navigate('/');
        });
    }

    if (mode === 'register') {
      localStorage.setItem('register', 'apple');
      navigate('/profile');
    }
  }, [navigate]);

  return <div />;
};

export default AppleRedirect;
