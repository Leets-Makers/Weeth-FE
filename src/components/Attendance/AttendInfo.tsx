import * as S from '@/styles/attend/AttendMain.styled';
import Button from '@/components/Button/Button';
import checkTitle from '@/hooks/checkTitle';
import { colors } from '@/theme/designTokens';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';

interface AttendInfoProps {
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  isWithinTimeRange: boolean;
  handleOpenModal: () => void;
  handleOpenCodeModal: () => void;
  isAttend: boolean;
}

export const AttendInfo: React.FC<AttendInfoProps> = ({
  title,
  startDateTime,
  endDateTime,
  location,
  isWithinTimeRange,
  handleOpenModal,
  handleOpenCodeModal,
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
      : colors.semantic.text.inverse;
  };

  const isDisabled = isAttend || !isWithinTimeRange;

  const { isAdmin } = useGetGlobaluserInfo();

  return (
    <div>
      <S.TitleText>
        오늘은
        <span style={{ color: colors.semantic.brand.primary }}>
          &quot;{title}&quot;
        </span>
        {checkTitle(title)} 있는 날이에요
      </S.TitleText>

      <S.InfoText style={{ margin: '10px 0 32px 0', color: 'white' }}>
        날짜: {startDateTime} {endDateTime}
        <br />
        장소: {location}
      </S.InfoText>

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
      {isAdmin ? (
        <Button
          width="100%"
          height="48px"
          color={colors.semantic.button.neutral}
          textcolor={colors.semantic.text.normal}
          onClick={handleOpenCodeModal}
        >
          {isAttend ? '출석완료' : '출석하기'}
        </Button>
      ) : (
        <div></div>
      )}
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
