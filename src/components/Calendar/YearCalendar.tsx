import { FALL_SEMESTER, SPRING_SEMESTER } from '@/constants/dateConstants';
import * as S from '@/styles/calendar/YearCalendar.styled';
import useGetYearlySchedule from '@/api/useGetYearlySchedule';
import useSmartLoading from '@/hooks/useSmartLoading';
import YearlyCard from './YearlyCard';
import Loading from '../common/Loading';

const YearCalendar = ({ year, term }: { year: number; term: number }) => {
  const { data: yearlySchedule, loading } = useGetYearlySchedule({
    year,
    semester: term,
  });

  const { loading: smartLoading } = useSmartLoading(
    new Promise<void>((resolve) => {
      if (!loading) resolve();
    }),
  );
  if (smartLoading) {
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
