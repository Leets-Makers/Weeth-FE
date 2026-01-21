import { useEffect, useMemo, useState } from 'react';

import DueCategory from '@/components/Dues/DueCategory';
import DuesInfo from '@/components/Dues/DuesInfo';
import DuesTitle from '@/components/Dues/DuesTitle';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/dues/Dues.styled';
import useUserData from '@/hooks/queries/useUserData';
import useDuesData from '@/hooks/queries/useDuesData';

const Dues: React.FC = () => {
  useCustomBack('/home');

  const { data: userInfo } = useUserData();
  const cardinal = userInfo?.cardinals[0];
  console.log(cardinal);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: duesInfo } = useDuesData(cardinal ?? 0);

  // 기본 선택값 설정
  useEffect(() => {
    if (!duesInfo) return;
    const hasDues = duesInfo.receipts?.some(
      (receipt) => receipt.description === `${cardinal}기 회비 등록`,
    );
    if (hasDues && !selectedCategory) setSelectedCategory('회비');
  }, [duesInfo, cardinal, selectedCategory]);

  // 필터링된 데이터 계산
  const filteredReceipts = useMemo(() => {
    if (!duesInfo?.receipts) return [];
    return duesInfo.receipts.filter(
      (receipt) => receipt.description !== `${cardinal}기 회비 등록`,
    );
  }, [duesInfo, selectedCategory, cardinal]);

  return (
    <S.StyledDues>
      <DuesTitle time={duesInfo?.time ?? ''} />

      <DueCategory setSelectedDues={setSelectedCategory} />

      {duesInfo === null ? (
        <S.NullText>등록된 회비가 없습니다.</S.NullText>
      ) : (
        <S.DuesListBox>
          <S.TotalMoney>
            {duesInfo?.currentAmount.toLocaleString()}원
          </S.TotalMoney>

          <S.DuesList>
            {/* 회비 탭일 때 */}
            {(selectedCategory === null || selectedCategory === '회비') && (
              <DuesInfo
                key="dues"
                dues={duesInfo?.totalAmount ?? 0}
                category="회비"
                date="2024-04-01"
                memo={duesInfo?.description ?? ' '}
                source={duesInfo?.description ?? ''}
              />
            )}

            {/* 지출 탭일 때만 렌더링 */}
            {selectedCategory !== '회비' &&
              filteredReceipts.map((receipt) => (
                <DuesInfo
                  key={receipt.id}
                  dues={receipt.amount}
                  category="지출"
                  date={receipt.date}
                  memo={receipt.description}
                  source={receipt.source}
                />
              ))}
          </S.DuesList>
        </S.DuesListBox>
      )}
    </S.StyledDues>
  );
};

export default Dues;
