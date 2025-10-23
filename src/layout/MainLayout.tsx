// 헤더 있는 레이아웃

import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.main`
  width: 100%;
  max-width: 375px;
  padding: 0 15px;
  box-sizing: border-box;
`;
const MainLayout = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

export default MainLayout;
