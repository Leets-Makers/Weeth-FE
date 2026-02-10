import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Suspense } from 'react';
import DelayedFallback from '@/hooks/DelayedFallback';
import { units } from '@/theme/designTokens';
import Footer from '@/components/Navigation/Footer';
import MobileGNB from '@/components/Navigation/MobileGNB';
import NoticePopup from '@/components/Popup';

const Wrapper = styled.div`
  width: 375px;
  min-width: ${units.device.mobile}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.main``;

const FixedLayout = () => {
  return (
    <Suspense fallback={<DelayedFallback delay={300} />}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Wrapper>
          <MobileGNB />
          <NoticePopup />
          <Content>
            <Outlet />
          </Content>
        </Wrapper>
        <Footer isMobile />
      </div>
    </Suspense>
  );
};

export default FixedLayout;
