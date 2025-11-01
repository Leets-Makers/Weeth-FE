import React from 'react';
import Caption from '@/components/Button/Caption';
import * as S from '@/styles/receipt/ReceiptInfo.styled';
import theme from '@/styles/theme';

interface ReceiptInfoProps {
  money: number;
  date: string;
  memo: string;
}

const ReceiptInfo: React.FC<ReceiptInfoProps> = ({ money, date, memo }) => {
  return (
    <S.Container>
      <S.Box>
        <S.LeftSection>
          <Caption color={theme.color.negative}>지출</Caption>
          <S.TextBox>
            <S.MemoText $isTruncated={memo.length >= 10}>{memo}</S.MemoText>
            <S.SubText>{date}</S.SubText>
          </S.TextBox>
        </S.LeftSection>

        <S.RightSection>
          <S.Amount>{money.toLocaleString()}원</S.Amount>
          <S.SubText>&nbsp;</S.SubText>
        </S.RightSection>
      </S.Box>
    </S.Container>
  );
};

export default ReceiptInfo;
