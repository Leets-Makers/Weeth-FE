import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/hooks/ScrollToTop';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default Layout;
