import * as S from '@/styles/attend/AttendMain.styled';
import * as A from '@/styles/attend/AttendInfo.styled';
import Button from '@/components/Button/Button';
import checkTitle from '@/hooks/checkTitle';
import { colors } from '@/theme/designTokens';

interface AttendInfoProps {
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  isWithinTimeRange: boolean;
  handleOpenModal: () => void;
  isAttend: boolean;
}

export const AttendInfo: React.FC<AttendInfoProps> = ({
  title,
  startDateTime,
  endDateTime,
  location,
  isWithinTimeRange,
  handleOpenModal,
  isAttend,
}) => {
  const getColor = () => {
    if (isAttend) return colors.dark.primary[200];
    if (!isWithinTimeRange) return colors.semantic.button.neutral;
    return colors.semantic.brand.primary;
  };

  const getTextColor = () => {
    return isAttend || !isWithinTimeRange
      ? colors.semantic.text.alternative
      : colors.semantic.text.strong;
  };

  const isDisabled = isAttend || !isWithinTimeRange;

  return (
    <div>
      <S.TitleText>
        <A.AttendProject>
          오늘은
          <span style={{ color: colors.semantic.brand.primary }}>
            &quot;{title}&quot;
          </span>
          {checkTitle(title)} 있는 날이에요
        </A.AttendProject>
      </S.TitleText>
      <A.AttendDate>
        날짜: {startDateTime} {endDateTime}
      </A.AttendDate>
      <A.AttendPlace>장소: {location}</A.AttendPlace>
      <A.AttendButton>
        <Button
          width="100%"
          height="48px"
          color={getColor()}
          textcolor={getTextColor()}
          disabled={isDisabled}
          onClick={!isAttend && isWithinTimeRange ? handleOpenModal : undefined}
        >
          {isAttend ? '출석완료' : '출석하기'}
        </Button>
      </A.AttendButton>
    </div>
  );
};

export const NoAttnedInfo = () => {
  return (
    <div>
      <S.TitleText>오늘은 일정이 없어요</S.TitleText>
      <S.InfoText>동아리원과 스터디를 하는건 어때요?</S.InfoText>
    </div>
  );
};
