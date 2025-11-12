import { useMemo, useState } from 'react';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import useGetDuesInfo, { Receipt } from '@/api/useGetDuesInfo';
import ReceiptInfo from '@/components/Receipt/ReceiptInfo';
import ReceiptImageModal from '@/components/Receipt/ReceiptImageModal';
import Loading from '@/components/common/Loading';
import * as S from '@/styles/receipt/ReceiptMain.styled';
import { useSmartCombinedLoading } from '@/hooks/useSmartLoading';

interface GroupedByMonth {
  [month: string]: Receipt[];
}

// 월별로 영수증을 그룹화하는 유틸 함수
const groupReceiptsByMonth = (receipts: Receipt[]): GroupedByMonth => {
  return receipts.reduce((acc, receipt) => {
    const date = new Date(receipt.date);
    const monthKey = String(date.getMonth() + 1);

    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(receipt);
    return acc;
  }, {} as GroupedByMonth);
};

// 현재 날짜 기준 학기 월 범위 계산
const getSemesterMonths = (): number[] => {
  const month = new Date().getMonth() + 1;
  return month >= 3 && month <= 8 ? [3, 4, 5, 6, 7, 8] : [9, 10, 11, 12, 1, 2];
};

const ReceiptMain: React.FC = () => {
  const { globalInfo, loading: userLoading } = useGetGlobaluserInfo();
  const cardinal = globalInfo?.cardinals?.[0] ?? null;
  const { duesInfo, loading: duesLoading } = useGetDuesInfo(cardinal);

  const combinedLoading = useSmartCombinedLoading(userLoading, duesLoading);

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  // 데이터 준비
  const groupedReceipts = useMemo(
    () => (duesInfo?.receipts ? groupReceiptsByMonth(duesInfo.receipts) : {}),
    [duesInfo],
  );

  const months = useMemo(() => getSemesterMonths(), []);

  if (combinedLoading && !duesInfo) {
    return (
      <S.StyledReceipt>
        <Loading />
      </S.StyledReceipt>
    );
  }

  return (
    <S.StyledReceipt>
      {months.map((month) => {
        const monthKey = String(month);
        const receipts = groupedReceipts[monthKey] || [];

        return (
          <div key={monthKey}>
            <S.StyledMonth>{month}월</S.StyledMonth>

            {receipts.length > 0 ? (
              receipts.map((receipt) => (
                <div key={receipt.id}>
                  <ReceiptInfo
                    money={receipt.amount}
                    date={new Date(receipt.date).toLocaleDateString('ko-KR')}
                    memo={receipt.description}
                  />
                  <S.ScrollContainer>
                    {receipt.fileUrls.map((file) => (
                      <S.GridItem
                        key={file.fileId}
                        onClick={() => openModal(file.fileUrl)}
                      >
                        <S.GridItemImage src={file.fileUrl} />
                      </S.GridItem>
                    ))}
                  </S.ScrollContainer>
                </div>
              ))
            ) : (
              <div> </div>
            )}

            <S.Line />
          </div>
        );
      })}

      <ReceiptImageModal
        isOpen={isModalOpen}
        selectedImage={selectedImage}
        onRequestClose={closeModal}
      />
    </S.StyledReceipt>
  );
};

export default ReceiptMain;
