import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Title from '@/components/AccountCheck/Title';
import AccountButton from '@/components/AccountCheck/AccountButton';
import useSetHeader from '@/hooks/useSetHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
`;

const AccountCheck: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoId = localStorage.getItem('kakaoId');
    if (!kakaoId) {
      navigate('/');
    }
  }, []);

  useSetHeader({
    rightButtonType: 'none',
    isAccessible: true,
  });
  return (
    <Container>
      <Title />
      <AccountButton />
    </Container>
  );
};

export default AccountCheck;
