/* eslint-disable no-nested-ternary */
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { units } from '@/theme/designTokens';

import useWindowSize from '@/hooks/useWindowSize';
import DesktopGNB from '@/components/Navigation/DesktopGNB';
import MobileGNB from '@/components/Navigation/MobileGNB';
import { pcResponsive } from '@/styles';
import { Suspense } from 'react';
import DelayedFallback from '@/hooks/DelayedFallback';
import Footer from '@/components/Navigation/Footer';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.main`
  width: 100%;
  min-width: ${units.device.mobile}px;
  ${pcResponsive};
  box-sizing: border-box;
`;

const ResponsiveLayout = () => {
  const { width } = useWindowSize();
  const isMobile = width <= units.device.tablet;

  return (
    <Suspense fallback={<DelayedFallback delay={300} />}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Wrapper>
          {isMobile ? <MobileGNB /> : <DesktopGNB />}
          <Content>
            <Outlet />
          </Content>
        </Wrapper>
        <Footer isMobile={isMobile} />
      </div>
    </Suspense>
  );
};

export default ResponsiveLayout;
