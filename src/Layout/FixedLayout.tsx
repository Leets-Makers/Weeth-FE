import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MobileGNB from '@/components/Navigation/MobileGNB';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Content = styled.main`
  width: 375px;
`;

const FixedLayout = () => {
  return (
    <Wrapper>
      <MobileGNB />
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default FixedLayout;
