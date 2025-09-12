import AttendCheckMain from '@/components/AttendCheck/AttendCheckMain';
import useCustomBack from '@/hooks/useCustomBack';
import styled from 'styled-components';

import Header from '@/components/Header/Header';
import React from 'react';
import { MOBILE } from '@/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MOBILE};
  max-width: ${MOBILE};
  margin-bottom: 50px;
`;

const AttendCheck: React.FC = () => {
  useCustomBack('/attendance');
  return (
    <Container>
      <Header RightButtonType="none" isAccessible>
        출석 조회
      </Header>
      <AttendCheckMain />
    </Container>
  );
};

export default AttendCheck;
