import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetGlobaluserInfo, {
  useGetUserInfo,
} from '@/api/useGetGlobaluserInfo';
import useGetDuesInfo from '@/api/useGetDuesInfo';
import { toastError } from '@/components/common/ToastMessage';
import Loading from '@/components/common/Loading';
import Header from '@/components/Header/Header';
import DueCategory from '@/components/Dues/DueCategory';
import DuesInfo from '@/components/Dues/DuesInfo';
import DuesTitle from '@/components/Dues/DuesTitle';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/dues/Dues.styled';

const Dues: React.FC = () => {
  useCustomBack('/home');
  const navigate = useNavigate();

  const { globalInfo, loading: globalLoading } = useGetGlobaluserInfo();
  const { isAdmin } = useGetUserInfo();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cardinal, setCardinal] = useState<number | null>(null);

  useEffect(() => {
    if (globalInfo?.cardinals?.length) {
      setCardinal(globalInfo.cardinals[0]);
    }
  }, [globalInfo]);

  const {
    duesInfo,
    loading: duesLoading,
    duesError,
  } = useGetDuesInfo(cardinal);

  useEffect(() => {
    if (duesError) toastError(duesError);
  }, [duesError]);

  // 기본 선택값 설정 (렌더링 중 setState 방지)
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

  if (globalLoading || duesLoading) return <Loading />;

  const handleAdminClick = () => navigate('/admin/dues');

  return (
    <S.StyledDues>
      <Header
        isAccessible={isAdmin}
        RightButtonType="ADMIN"
        onClickRightButton={handleAdminClick}
      >
        회비
      </Header>

      <DuesTitle time={duesInfo?.time ?? ''} />

      <S.CategoryWrapper>
        <DueCategory setSelectedDues={setSelectedCategory} />
      </S.CategoryWrapper>

      {duesInfo === null ? (
        <S.NullText>등록된 회비가 없습니다.</S.NullText>
      ) : (
        <S.DuesListBox>
          <S.MoneyBoxContainer>
            <S.MoneyBox>{duesInfo.currentAmount.toLocaleString()}원</S.MoneyBox>
          </S.MoneyBoxContainer>

          <S.DuesList>
            {/* 회비 탭일 때 */}
            {(selectedCategory === null || selectedCategory === '회비') && (
              <DuesInfo
                key="dues"
                dues={duesInfo.totalAmount}
                category="회비"
                date="2024-04-01"
                memo={duesInfo.description}
                source={duesInfo.description}
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
