import { FALL_SEMESTER, SPRING_SEMESTER } from '@/constants/dateConstants';
import * as S from '@/styles/calendar/YearCalendar.styled';
import useGetYearlySchedule from '@/api/useGetYearlySchedule';
import { useEffect, useState } from 'react';
import YearlyCard from './YearlyCard';
import Loading from '../common/Loading';

const YearCalendar = ({ year, term }: { year: number; term: number }) => {
  const { data: yearlySchedule, loading } = useGetYearlySchedule({
    year,
    semester: term,
  });
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setShowLoading(true);
      return undefined;
    }
    const timer = setTimeout(() => setShowLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  if (showLoading && loading) {
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
