import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MobileGNB from '@/components/Navigation/MobileGNB';
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

const FixedLayout = () => {
  return (
    <Suspense fallback={<DelayedFallback delay={300} />}>
      <Wrapper>
        <MobileGNB />
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
    </Suspense>
  );
};

export default FixedLayout;
