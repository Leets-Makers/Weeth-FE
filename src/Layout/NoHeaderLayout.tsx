import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Suspense } from 'react';
import DelayedFallback from '@/hooks/DelayedFallback';
import { units } from '@/theme/designTokens';

const Wrapper = styled.div`
  width: 375px;
  min-width: ${units.device.mobile};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.main``;

const NoHeaderLayout = () => {
  return (
    <Suspense fallback={<DelayedFallback delay={300} />}>
      <Wrapper>
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
    </Suspense>
  );
};

export default NoHeaderLayout;
