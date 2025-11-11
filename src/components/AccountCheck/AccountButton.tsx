import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import arrow from '@/assets/images/ic_account_arrow.svg';
import { colors } from '@/theme/designTokens';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 25px 20px 25px;
`;

const Button = styled.button`
  all: unset;
  height: 63px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 15px 12px;
  border: 1px solid ${colors.semantic.line};
  background-color: ${colors.semantic.container.neutral};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${colors.semantic.brand.primary};
    box-shadow: 0 0 10px rgba(0, 221, 168, 0.7);
  }

  &:active {
    border-color: ${colors.semantic.brand.primary};
    box-shadow: 0 0 10px rgba(0, 221, 168, 0.8);
  }
`;

const ButtonTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
`;

const ButtonDescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonDescription = styled.div`
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
`;

const AccountButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Button onClick={() => navigate('/login')}>
        <ButtonTitle>이전에 가입한 계정이 있다면</ButtonTitle>
        <ButtonDescriptionWrapper>
          <ButtonDescription>계정 연동하러 가기</ButtonDescription>
          <img src={arrow} alt="화살표" />
        </ButtonDescriptionWrapper>
      </Button>
      <Button onClick={() => navigate('/profile')}>
        <ButtonTitle>새로 가입한 회원이라면</ButtonTitle>
        <ButtonDescriptionWrapper>
          <ButtonDescription>회원 정보 입력하러 가기</ButtonDescription>
          <img src={arrow} alt="화살표" />
        </ButtonDescriptionWrapper>
      </Button>
    </Container>
  );
};

export default AccountButton;
