import useCustomBack from '@/hooks/useCustomBack';
import styled from 'styled-components';

import Header from '@/components/Header/Header';
import React from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Penalty: React.FC = () => {
  useCustomBack('/attendance');
  return (
    <Container>
      <Header RightButtonType="none" isAccessible>
        페널티
      </Header>
    </Container>
  );
};

export default Penalty;
