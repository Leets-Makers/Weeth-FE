import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/hooks/ScrollToTop';
import { Suspense } from 'react';
import DelayedFallback from '@/hooks/DelayedFallback';
import { ThemeProvider } from 'styled-components';
import { adminTheme } from '@/theme/adminTheme';

const Layout = () => {
  return (
    <>
      <ThemeProvider theme={adminTheme}>
        <ScrollToTop />
        <Suspense fallback={<DelayedFallback delay={300} />}>
          <Outlet />
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default Layout;
