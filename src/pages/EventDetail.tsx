import useEventInfo from '@/hooks/queries/event/useEventInfo';
import * as S from '@/styles/event/EventDetail.styled';
import EventTitle from '@/components/Event/EventTitle';
import EventContent from '@/components/Event/EventContent';
import useCustomBack from '@/hooks/useCustomBack';
import { useLocation, useParams } from 'react-router-dom';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';
import useUserData from '@/hooks/queries/useUserData';
import Loading from '@/components/common/Loading';

export type { EventDetailData } from '@/api/event/getEventInfo';

const EventDetail = () => {
  const location = useLocation();
  const year = location.state?.year ?? CURRENT_YEAR;
  const month = location.state?.month ?? CURRENT_MONTH;

  useCustomBack(`/calendar?year=${year}&month=${month}`);

  const { id, type } = useParams();
  const { data: userInfo } = useUserData();
  const isAdmin = userInfo?.role === 'ADMIN';
  const { data: eventDetailData, error, isLoading } = useEventInfo(type, id);

  if (isLoading) return <Loading />;
  if (!eventDetailData)
    return (
      <S.Error>
        {error instanceof Error
          ? error.message
          : '데이터를 불러오지 못했습니다.'}
      </S.Error>
    );

  return (
    <S.EventDetailWrapper>
      <EventTitle data={eventDetailData} isAdmin={isAdmin} />
      <EventContent data={eventDetailData} />
    </S.EventDetailWrapper>
  );
};

export default EventDetail;
