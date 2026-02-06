import { FALL_SEMESTER, SPRING_SEMESTER } from '@/constants/dateConstants';
import * as S from '@/styles/calendar/YearCalendar.styled';
import useYearlySchedule from '@/hooks/queries/schedule/useYearlySchedule';
import { useEffect, useState } from 'react';
import YearlyCard from './YearlyCard';
import Loading from '../common/Loading';

const YearCalendar = ({ year, term }: { year: number; term: number }) => {
  const { data: yearlySchedule = {}, isLoading } = useYearlySchedule(
    year,
    term,
  );
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      return undefined;
    }
    const timer = setTimeout(() => setShowLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (showLoading && isLoading) {
    return <Loading />;
  }

  return (
    <S.MonthlyBox>
      {term === 1 &&
        SPRING_SEMESTER.map((monthItem) => (
          <YearlyCard
            key={monthItem}
            thisMonth={monthItem}
            year={year}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
      {term === 2 &&
        FALL_SEMESTER.map((monthItem) => (
          <YearlyCard
            key={monthItem}
            thisMonth={monthItem}
            year={year}
            events={yearlySchedule[monthItem] || []}
          />
        ))}
    </S.MonthlyBox>
  );
};

export default YearCalendar;
