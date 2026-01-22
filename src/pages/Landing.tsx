import useCustomBack from '@/hooks/useCustomBack';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

import Cover from '@/assets/images/ic_login_cover.svg?react';
import kakao from '@/assets/images/ic_KAKAO_symbol.svg';
import apple from '@/assets/images/ic_apple_symbol.svg';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const ContentCard = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;

  flex-direction: column;
  max-width: 480px;
  padding: 0 20px;
  box-sizing: border-box;

  @media screen and (min-width: ${units.device.desktop}px) {
    flex-direction: row;
    max-width: 900px;
    height: 500px;
    padding: 0;
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;

  margin-top: 40%;
  margin-top: 0;

  @media screen and (min-width: ${units.device.desktop}px) {
    background-color: ${colors.semantic.container['neutral-alternative']};
    padding: 40px;
  }
`;

const Title = styled.div`
  ${typography.Sub2};
  margin-top: 24px;
  white-space: pre-wrap;
  text-align: center;
  color: ${colors.semantic.text.alternative};
`;

const ButtonSection = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 15px;

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeIn} 1s ease-in-out forwards;
    `}

  padding-bottom: 64px;

  margin-top: 40px;
  padding-bottom: 0;

  @media screen and (min-width: ${units.device.desktop}px) {
    flex: 1;
    margin-top: 0;
    padding: 60px;
    background-color: ${colors.semantic.container.neutral};
  }

  & > :last-child {
    margin-top: 20px;
  }
`;

const LoginButton = styled.button<{ $isKakao: boolean }>`
  width: 100%;
  max-width: 335px;
  height: 48px;
  border-radius: ${units.radius.md}px;
  align-items: center;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  background-color: ${({ $isKakao }) => ($isKakao ? '#FEE500' : '#FFFFFF')};
  border: none;
  cursor: pointer;

  color: ${colors.semantic.text.inverse};

  > div {
    ${typography.Button1};
    flex: 1;
    text-align: center;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const SignUpbutton = styled.button`
  ${typography.Button1};
  all: unset;
  color: ${colors.semantic.text.alternative};
  border-bottom: 1px solid ${colors.semantic.text.alternative};
  padding-bottom: 2px;
  margin-top: 20px;

  &:hover {
    cursor: pointer;
    color: ${colors.semantic.text.strong};
    border-color: ${colors.semantic.text.strong};
  }
`;

const Footer = styled.div`
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};

  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  gap: 24px;
  width: 100%;
  &:after {
    content: '';
    position: absolute;
    height: 1px;
    top: -12px;
    width: inherit;
    background-color: ${colors.semantic.line};
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

  const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI;
  const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID;
  const APPLE_REDIRECT_URI_FULL = BASE_URL + APPLE_REDIRECT_URI;
  const mode = 'login';
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
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtonWrapper(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer>
      <ContentCard>
        <LogoSection>
          <Cover width={258} />
          <Title>
            우리 동아리를 더 알차게 즐기는
            <br />
            커뮤니티 플랫폼 Weeth
          </Title>
        </LogoSection>

        <ButtonSection $visible={showButtonWrapper}>
          <LoginButton
            $isKakao
            onClick={() => {
              window.location.href = kakaoURL;
            }}
          >
            <img src={kakao} alt="카카오" />
            <div>카카오로 로그인</div>
            <span style={{ width: 24 }} />
          </LoginButton>

          <LoginButton
            $isKakao={false}
            onClick={() => {
              window.location.href = appleURL;
            }}
          >
            <img src={apple} alt="apple" />
            <div>Apple로 로그인</div>
            <span style={{ width: 24 }} />
          </LoginButton>

          <SignUpbutton onClick={() => navigate('/register')}>
            신규 회원가입
          </SignUpbutton>

          <Footer>
            <span>개인정보보호정책</span>

            <span>이용약관</span>
          </Footer>
        </ButtonSection>
      </ContentCard>
    </PageContainer>
  );
};

export default Landing;
