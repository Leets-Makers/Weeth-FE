import Caption from '@/components/Button/Caption';
import * as S from '@/styles/dues/DuesInfo.styled';
import theme from '@/styles/theme';

interface DuseInfoProps {
  dues: number;
  category: string;
  date: string;
  memo: string;
  source: string;
}

const DuesInfo: React.FC<DuseInfoProps> = ({
  dues,
  category,
  date,
  memo,
  source,
}) => {
  return (
    <S.DuesWrapper>
      <S.StyledDuesBox>
        <S.StyledCaptionBox>
          {category === '회비' ? (
            <Caption isMargin color={theme.color.positive}>
              회비
            </Caption>
          ) : (
            <Caption isMargin color={theme.color.negative}>
              지출
            </Caption>
          )}
          <S.StyledTextBox>
            <S.Text>{memo}</S.Text>
            <S.SmallText>{date}</S.SmallText>
          </S.StyledTextBox>
        </S.StyledCaptionBox>
        <S.StyledMemoBox>
          <S.Text>{dues.toLocaleString()}원</S.Text>
          <S.SmallText>{source}</S.SmallText>
        </S.StyledMemoBox>
      </S.StyledDuesBox>
    </S.DuesWrapper>
  );
};

export default DuesInfo;
