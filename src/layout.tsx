import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/hooks/ScrollToTop';
import { Suspense } from 'react';
// import DelayedFallback from './hooks/DelayedFallback';
import Loading from './components/common/Loading';

const Layout = () => {
  // const [showLoading, setShowLoading] = useState(false);

  // useEffect(() => {
  //   const showTimer = setTimeout(() => setShowLoading(true), 200);
  //   const hideTimer = setTimeout(() => setShowLoading(false), 1200);

  //   return () => {
  //     clearTimeout(showTimer);
  //     clearTimeout(hideTimer);
  //   };
  // }, []);

  return (
    <>
      <ScrollToTop />
      {/* <Suspense fallback={showLoading ? <Loading /> : null}> */}
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
