import * as S from '@/styles/attendCheck/AttendCheck.styled';
import useGetAttendCheck from '@/api/useGetAttendCheck';
import useGetUserName from '@/hooks/useGetUserName';
import { formatMeetingDates } from '@/hooks/formatDate';
import Loading from '@/components/common/Loading';
import AttendCheckItem from '@/components/AttendCheck/AttendCheckItem';
import AttendCheckInfoBox from './AttendCheckInfoBox';

interface MeetingProps {
  id: number;
  title: string;
  start: string;
  end: string;
  status: 'ATTEND' | 'PENDING' | 'ABSENT';
  location: string;
}

const AttendCheckMain: React.FC = () => {
  const { attendCheckInfo, error } = useGetAttendCheck();
  const userName = useGetUserName();

  if (error) {
    return <S.SemiBold>error</S.SemiBold>;
  }

  if (!attendCheckInfo) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.Header>
        <S.SemiTitle>
          <S.SemiBold>{userName}</S.SemiBold>
          &nbsp;님의 출석횟수
        </S.SemiTitle>
        <S.AttendCount>{attendCheckInfo.attendanceCount}회</S.AttendCount>
      </S.Header>
      <S.StyledBox>
        <S.SmallStyledBoxContainer>
          <AttendCheckInfoBox
            title="정기 모임"
            num={`${attendCheckInfo.total}회`}
          />
          <AttendCheckInfoBox
            title="출석"
            num={`${attendCheckInfo.attendanceCount}회`}
          />
          <AttendCheckInfoBox
            title="결석"
            num={`${attendCheckInfo.absenceCount}회`}
          />
        </S.SmallStyledBoxContainer>
        {attendCheckInfo.attendances.length > 0 ? (
          attendCheckInfo.attendances.map((meeting: MeetingProps) => {
            return (
              <AttendCheckItem
                key={meeting.id}
                attend={meeting.status}
                title={meeting.title}
                date={formatMeetingDates(meeting.start, meeting.end)}
                place={meeting.location}
              />
            );
          })
        ) : (
          <S.NullBox>출석 정보가 없습니다.</S.NullBox>
        )}
      </S.StyledBox>
    </S.Container>
  );
};

export default AttendCheckMain;
