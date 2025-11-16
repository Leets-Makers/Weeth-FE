import useCustomBack from '@/hooks/useCustomBack';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import Logo from '@/assets/images/logo/logo_full_Origin.svg?react';
import kakao from '@/assets/images/ic_KAKAO_symbol.svg';
import apple from '@/assets/images/ic_apple_symbol.svg';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

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
  margin-top: 40%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Title = styled.div`
  ${typography.Sub1};
`;

const ButtonWrapper = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: 64px;
  left: 0;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeIn} 2s ease-in-out forwards;
    `}

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
  color: ${colors.dark.neutral[900]};
  border-bottom: 1px solid ${colors.dark.neutral[900]};

  &:hover {
    cursor: pointer;
  }
`;

const Landing: React.FC = () => {
  useCustomBack('/');

  const location = useLocation();
  const navigate = useNavigate();
  const [showButtonWrapper, setShowButtonWrapper] = useState(false);

  const params = new URLSearchParams(location.search);
  const redirectPath = params.get('redirect') || '/home';

  const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const BASE_URL = window.location.origin;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const REDIRECT_URI = BASE_URL + KAKAO_REDIRECT_URI;
  const stateParam = encodeURIComponent(redirectPath);
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${stateParam}`;

  const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID;
  const APPLE_REDIRECT_URI = `${BASE_URL}/auth/apple/callback`;

  const appleURL =
    `https://appleid.apple.com/auth/authorize?` +
    `client_id=${APPLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(APPLE_REDIRECT_URI)}` +
    `&response_type=code%20id_token` +
    `&scope=name%20email`;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate(redirectPath, {
        replace: true,
      });
    }
  }, [navigate, redirectPath]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtonWrapper(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <TitleWrapper>
        <Logo />
        <Title>
          Leets를 더 알차게 즐기는
          <br />
          동아리 관리 플랫폼
        </Title>
      </TitleWrapper>
      <ButtonWrapper $visible={showButtonWrapper}>
        <LoginButton
          $isKakao
          onClick={() => {
            window.location.href = `${kakaoURL}`;
          }}
        >
          <img src={kakao} alt="카카오" />
          <div>카카오로 로그인</div>
          <span> </span>
        </LoginButton>
        <LoginButton
          $isKakao={false}
          onClick={() => {
            window.location.href = `${appleURL}`;
          }}
        >
          <img src={apple} alt="apple" />
          <div>Apple로 로그인</div>
          <span> </span>
        </LoginButton>
        <SignUpbutton onClick={() => navigate('/register')}>
          신규 회원가입
        </SignUpbutton>
      </ButtonWrapper>
    </Container>
  );
};

export default Landing;
