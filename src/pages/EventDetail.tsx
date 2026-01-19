import useGetEventInfo from '@/api/getEventInfo';
import * as S from '@/styles/event/EventDetail.styled';
import EventTitle from '@/components/Event/EventTitle';
import EventContent from '@/components/Event/EventContent';
import useCustomBack from '@/hooks/useCustomBack';
import { useLocation, useParams } from 'react-router-dom';
import { CURRENT_MONTH, CURRENT_YEAR } from '@/constants/dateConstants';
import useUserData from '@/hooks/queries/useUserData';

export interface EventDetailData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  location: string;
  cardinal: number;
  code?: number;
  name: string;
  requiredItem: string;
  start: string;
  end: string;
}

const EventDetail = () => {
  const location = useLocation();
  const year = location.state?.year ?? CURRENT_YEAR;
  const month = location.state?.month ?? CURRENT_MONTH;

  useCustomBack(`/calendar?year=${year}&month=${month}`);

  const { id, type } = useParams();
  const { data: userInfo } = useUserData();
  const isAdmin = userInfo?.role === 'ADMIN';
  const { data: eventDetailData, error } = useGetEventInfo(type, id);

  if (error || !eventDetailData) return <S.Error>{error}</S.Error>;

  return (
    <S.EventDetailWrapper>
      <EventTitle data={eventDetailData} isAdmin={isAdmin} />
      <EventContent data={eventDetailData} />
    </S.EventDetailWrapper>
  );
};

export default EventDetail;
