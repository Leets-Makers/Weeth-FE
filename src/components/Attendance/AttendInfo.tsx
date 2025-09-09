import * as S from '@/styles/attend/AttendMain.styled';
import * as A from '@/styles/attend/AttendInfo.styled';
import theme from '@/styles/theme';
import Button from '@/components/Button/Button';
import checkTitle from '@/hooks/checkTitle';

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
    if (isAttend) return theme.color.mainDark;
    if (!isWithinTimeRange) return theme.color.gray[30];
    return theme.color.main;
  };

  const getTextColor = () => {
    return isAttend || !isWithinTimeRange
      ? theme.color.gray[20]
      : theme.color.gray[100];
  };

  const isDisabled = isAttend || !isWithinTimeRange;

  return (
    <div>
      <S.SemiBold>
        <A.AttendProject>
          오늘은
          <span style={{ color: theme.color.main }}>&quot;{title}&quot;</span>
          {checkTitle(title)} 있는 날이에요
        </A.AttendProject>
      </S.SemiBold>
      <A.AttendDate>
        날짜: {startDateTime} {endDateTime}
      </A.AttendDate>
      <A.AttendPlace>장소: {location}</A.AttendPlace>
      <A.AttendButton>
        <Button
          width="315px"
          height="50px"
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
      <S.SemiBold>
        <A.AttendProject>오늘은 일정이 없어요</A.AttendProject>
      </S.SemiBold>
      <A.AttendPlace>동아리원과 스터디를 하는건 어때요?</A.AttendPlace>
    </div>
  );
};
