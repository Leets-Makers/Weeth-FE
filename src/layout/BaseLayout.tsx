// 헤더 없는 레이아웃

import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 100%;
  max-width: 375px;
  padding: 0 15px;
  box-sizing: border-box;
`;

const BaseLayout = () => {
  return (
    <Wrapper>
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default BaseLayout;
