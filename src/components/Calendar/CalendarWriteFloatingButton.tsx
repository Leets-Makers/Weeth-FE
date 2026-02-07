import FloatingWritingIcon from '@/assets/images/ic_calendar_floating_button.svg?react';
import * as S from '@/styles/calendar/Calendar.styled';
import useWindowSize from '@/hooks/useWindowSize';
import { units } from '@/theme/designTokens';
import useUserData from '@/hooks/queries/useUserData';
import { useNavigate } from 'react-router-dom';

const CalendarWriteFloatingButton = () => {
  const { width } = useWindowSize();
  const isMobile = width <= units.device.tablet;
  const navigate = useNavigate();
  const { data: userInfo } = useUserData();
  const isAdmin = userInfo?.role === 'ADMIN';

  if (!isMobile || !isAdmin) return null;

  return (
    <S.FloatingButton
      onClick={() => navigate('/events/create')}
      aria-label="일정추가 메뉴 열기"
    >
      <FloatingWritingIcon aria-hidden />
    </S.FloatingButton>
  );
};

export default CalendarWriteFloatingButton;
