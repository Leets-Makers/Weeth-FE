import { Outlet } from 'react-router-dom';
import { units } from '@/theme/designTokens';
import useWindowSize from '@/hooks/useWindowSize';
import { Suspense } from 'react';
import DelayedFallback from '@/hooks/DelayedFallback';
import Footer from '@/components/Navigation/Footer';
import { Content, Wrapper } from './ResponsiveLayout';

const PostLayout = () => {
  const { width } = useWindowSize();
  const isMobile = width <= units.device.tablet;

  return (
    <Suspense fallback={<DelayedFallback delay={300} />}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Wrapper>
          <Content>
            <Outlet />
          </Content>
        </Wrapper>
        <Footer isMobile={isMobile} />
      </div>
    </Suspense>
  );
};

export default PostLayout;
