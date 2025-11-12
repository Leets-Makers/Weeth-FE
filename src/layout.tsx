import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/hooks/ScrollToTop';
import { Suspense } from 'react';
import DelayedFallback from './hooks/DelayedFallback';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<DelayedFallback delay={300} minDuration={1000} />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
