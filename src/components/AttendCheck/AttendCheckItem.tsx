import * as S from '@/styles/attendCheck/AttendCheckItem.styled';
import Caption from '@/components/Button/Caption';
import { colors } from '@/theme/designTokens';

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
  let captionColor = colors.semantic.icon.alternative;
  let captionTextColor = colors.semantic.text.strong;

  if (attend === 'ATTEND') {
    captionText = '출석';
    captionColor = colors.semantic.brand.primary;
    captionTextColor = colors.semantic.text.inverse;
  } else if (attend === 'ABSENT') {
    captionText = '결석';
    captionColor = colors.semantic.state.error;
  }

  return (
    <S.MeetingInfoBox>
      <S.MeetingHeader>
        <Caption color={captionColor} textcolor={captionTextColor}>
          {captionText}
        </Caption>
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
