import theme from '@/styles/theme';
import * as S from '@/styles/attendCheck/AttendCheckItem.styled';
import Caption from '@/components/Button/Caption';

interface AttendCheckItemProps {
  attend: 'ATTEND' | 'ABSENT' | 'PENDING';
  title: string;
  date: string;
  place: string;
}

const AttendCheckItem: React.FC<AttendCheckItemProps> = ({
  attend,
  title,
  date,
  place,
}) => {
  let captionText = '미결';
  let captionColor = theme.color.gray[65];

  if (attend === 'ATTEND') {
    captionText = '출석';
    captionColor = theme.color.main;
  } else if (attend === 'ABSENT') {
    captionText = '결석';
    captionColor = theme.color.negative;
  }

  return (
    <S.MeetingInfoBox>
      <S.MeetingHeader>
        <Caption color={captionColor}>{captionText}</Caption>
        <S.MeetingTitle>{title}</S.MeetingTitle>
      </S.MeetingHeader>
      <S.MeetingInfo>
        <div>
          날짜: {date}
          <br />
          장소: {place}
        </div>
      </S.MeetingInfo>
    </S.MeetingInfoBox>
  );
};

export default AttendCheckItem;
