import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { units } from '@/theme/designTokens';

import { useWindowSize } from '@/hooks/useWindowSize';
import DesktopGNB from '@/components/Navigation/DesktopGNB';
import MobileGNB from '@/components/Navigation/MobileGNB';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.main`
  width: 100%;
  max-width: ${units.device.desktop}px;
  min-width: ${units.device.mobile}px;
`;

const ResponsiveLayout = () => {
  const { width } = useWindowSize();
  const isMobile = width <= units.device.mobile;

  return (
    <Wrapper>
      {isMobile ? <MobileGNB /> : <DesktopGNB />}
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
};

export default ResponsiveLayout;
