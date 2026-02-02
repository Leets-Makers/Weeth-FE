import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import weeth from '@/assets/images/ic_register_weeth.svg';
import wait from '@/assets/images/ic_waiting_approval.svg';
import styled from 'styled-components';
import Header from '@/components/Header/Header';
import { RegisterButton } from './RegistrationSuccess';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  padding-top: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 100%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  text-align: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

const WaitingApproval = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoId = localStorage.getItem('kakaoId');
    if (!kakaoId) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container>
      <Header isWaiting />
      <Content>
        <img
          src={weeth}
          alt="weeth"
          width={109}
          height={49.7}
          style={{ marginBottom: '20px' }}
        />
        <img src={wait} alt="wait" width={283} height={148} />
        <Title>승인 대기중</Title>
        <SubTitle>운영진이 회원님의 정보를 확인 중입니다!</SubTitle>
        <SubTitle>
          오랜기간 승인이 되지 않을 시 운영진에게 문의해주세요.
        </SubTitle>
        <ButtonContainer>
          <RegisterButton
            type="kakao"
            onClick={() => {
              window.location.href = 'https://pf.kakao.com/_LtLyG';
            }}
          >
            문의하기
          </RegisterButton>
          <RegisterButton
            type="login"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            로그인으로 돌아가기
          </RegisterButton>
        </ButtonContainer>
      </Content>
    </Container>
  );
};

export default WaitingApproval;
