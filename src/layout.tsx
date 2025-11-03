import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/hooks/ScrollToTop';
import { Suspense } from 'react';
import Loading from './components/common/Loading';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
