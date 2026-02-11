import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/hooks/ScrollToTop';
import { Suspense, useMemo } from 'react';
import DelayedFallback from '@/hooks/DelayedFallback';
import { ThemeProvider } from 'styled-components';
import { buildTheme } from '@/theme/buildTheme';
import { baseThemeMap } from '@/theme/baseThemeMap';

const Layout = () => {
  // admin은 항상 light 모드
  const adminTheme = useMemo(() => buildTheme(baseThemeMap, 'light'), []);

  return (
    <ThemeProvider theme={adminTheme}>
      <ScrollToTop />
      <Suspense fallback={<DelayedFallback delay={300} />}>
        <Outlet />
      </Suspense>
    </ThemeProvider>
  );
};

export default Layout;
