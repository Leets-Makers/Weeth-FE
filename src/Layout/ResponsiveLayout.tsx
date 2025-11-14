import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { units } from '@/theme/designTokens';

import useWindowSize from '@/hooks/useWindowSize';
import DesktopGNB from '@/components/Navigation/DesktopGNB';
import MobileGNB from '@/components/Navigation/MobileGNB';
import { pcResponsive } from '@/styles';
import { Suspense } from 'react';
import DelayedFallback from '@/hooks/DelayedFallback';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.main`
  width: 100%;
  min-width: ${units.device.mobile}px;
  ${pcResponsive};
  padding: 0 15px;
  box-sizing: border-box;
`;

const ResponsiveLayout = () => {
  const { width } = useWindowSize();
  const isMobile = width <= units.device.tablet;

  return (
    <Suspense fallback={<DelayedFallback delay={300} />}>
      <Wrapper>
        {isMobile ? <MobileGNB /> : <DesktopGNB />}
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
    </Suspense>
  );
};

export default ResponsiveLayout;
