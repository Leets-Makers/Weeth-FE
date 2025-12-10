import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MobileGNB from '@/components/Navigation/MobileGNB';
import { Suspense } from 'react';
import DelayedFallback from '@/hooks/DelayedFallback';
import { units } from '@/theme/designTokens';
import Footer from '@/components/Navigation/Footer';
import useWindowSize from '@/hooks/useWindowSize';

const Wrapper = styled.div`
  width: 375px;
  min-width: ${units.device.mobile}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.main``;

const FixedLayout = () => {
  const { width } = useWindowSize();
  const isMobile = width <= units.device.tablet;

  return (
    <Suspense fallback={<DelayedFallback delay={300} />}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Wrapper>
          <MobileGNB />
          <Content>
            <Outlet />
          </Content>
        </Wrapper>
        <Footer isMobile={isMobile} />
      </div>
    </Suspense>
  );
};

export default FixedLayout;
