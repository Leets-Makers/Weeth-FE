import { lazy, Suspense } from 'react';
import AdminOnly from '@/components/common/AdminOnly';
import useCustomBack from '@/hooks/useCustomBack';
import Loading from '@/components/common/Loading';

const EventEditor = lazy(() => import('@/components/Event/EventEditor'));

const EventPost = () => {
  useCustomBack('/calendar');

  return (
    <>
      <AdminOnly />
      <Suspense fallback={<Loading />}>
        <EventEditor />
      </Suspense>
    </>
  );
};

export default EventPost;
