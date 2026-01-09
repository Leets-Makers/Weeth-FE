import * as S from '@/styles/attendCheck/AttendCheck.styled';
import useGetAttendCheck from '@/api/useGetAttendCheck';
import { formatMeetingDates } from '@/hooks/formatDate';
import Loading from '@/components/common/Loading';
import AttendCheckItem from '@/components/AttendCheck/AttendCheckItem';
import { MeetingProps } from '@/types/attend';
import AttendCheckInfoBox from '@/components/AttendCheck/AttendCheckInfoBox';

const AttendCheckMain: React.FC = () => {
  const { attendCheckInfo, error } = useGetAttendCheck();

  if (error) {
    return <S.Sub2Text>error</S.Sub2Text>;
  }

  if (!attendCheckInfo) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.Header>출석 조회</S.Header>
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
