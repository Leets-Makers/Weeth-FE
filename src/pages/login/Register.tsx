import useCustomBack from '@/hooks/useCustomBack';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import kakao from '@/assets/images/ic_KAKAO_symbol.svg';
import apple from '@/assets/images/ic_apple_symbol.svg';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import Header from '@/components/Header/Header';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 375px;
  min-height: 100vh;
  padding: 0 15px;
  box-sizing: border-box;
`;

const TitleWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const HeaderTitle = styled.div`
  ${typography.H1};
`;

const Title = styled.div`
  margin-top: 12px;
  ${typography.Sub1};
  color: ${colors.semantic.text.alternative};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 64px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;

  & > :last-child {
    margin-top: 33px;
  }
`;

const LoginButton = styled.button<{ $isKakao: boolean }>`
  width: 100%;
  height: 48px;
  border-radius: ${units.radius.md}px;
  align-items: center;
  display: flex;
  padding-left: 14px;
  justify-content: space-between;
  background-color: ${({ $isKakao }) =>
    $isKakao ? '#FEE500' : colors.dark.neutral[900]};

  color: ${colors.semantic.text.inverse};

  > div {
    ${typography.Button1};
  }
`;

const SignUpbutton = styled.button`
  ${typography.Button1};
  margin-top: 48px;
  all: unset;
  color: ${colors.semantic.text.alternative};
  border-bottom: 1px solid ${colors.semantic.text.alternative};

  &:hover {
    cursor: pointer;
  }
`;

const Register: React.FC = () => {
  useCustomBack('/');

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const redirectPath = params.get('redirect') || '/home';

  const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const BASE_URL = window.location.origin;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const REDIRECT_URI = BASE_URL + KAKAO_REDIRECT_URI;
  const stateParam = encodeURIComponent(redirectPath);
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${stateParam}`;

  const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI;
  const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID;
  const APPLE_REDIRECT_URI_FULL = BASE_URL + APPLE_REDIRECT_URI;
  const mode = 'register';
  const appleState = `${mode}::${redirectPath}`;

  const appleURL =
    `https://appleid.apple.com/auth/authorize?` +
    `client_id=${APPLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(APPLE_REDIRECT_URI_FULL)}` +
    `&response_type=code` +
    `&state=${appleState}`;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate(redirectPath, {
        replace: true,
      });
    }
  }, [navigate, redirectPath]);

  return (
    <Container>
      <div style={{ marginLeft: -15 }}>
        <Header />
      </div>

      <TitleWrapper>
        <HeaderTitle>회원가입</HeaderTitle>
        <Title>
          Weeth가 처음이신가요?
          <br />
          회원가입하고, 정보를 실시간으로 받아보세요!
        </Title>
      </TitleWrapper>
      <ButtonWrapper>
        <LoginButton
          $isKakao
          onClick={() => {
            window.location.href = kakaoURL;
          }}
        >
          <img src={kakao} alt="카카오" />
          <div>카카오로 회원가입</div>
          <span> </span>
        </LoginButton>
        <LoginButton
          $isKakao={false}
          onClick={() => {
            window.location.href = appleURL;
          }}
        >
          <img src={apple} alt="apple" />
          <div>Apple로 회원가입</div>
          <span> </span>
        </LoginButton>
        <SignUpbutton onClick={() => navigate('/')}>
          로그인으로 돌아가기
        </SignUpbutton>
      </ButtonWrapper>
    </Container>
  );
};

export default Register;
