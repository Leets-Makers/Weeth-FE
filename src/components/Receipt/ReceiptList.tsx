import { useMemo, useState } from 'react';
import useGetDuesInfo, { Receipt } from '@/api/useGetDuesInfo';
import ReceiptItem from '@/components/Receipt/ReceiptItem';
import Loading from '@/components/common/Loading';
import * as S from '@/styles/receipt/ReceiptList.styled';
import ReceiptViewerModal from '@/components/Receipt/ReceiptViewerModal';
import useUserData from '@/hooks/queries/useUserData';

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

const ReceiptList: React.FC = () => {
  const { data: userInfo } = useUserData();

  const cardinal = userInfo?.cardinals?.[0] ?? null;
  const { duesInfo, loading } = useGetDuesInfo(cardinal);

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

  // 이미지인지 pdf인지 판단
  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  if (loading) return <Loading />;

  return (
    <div>
      {months.map((month) => {
        const monthKey = String(month);
        const receipts = groupedReceipts[monthKey] || [];

        return (
          <S.StyledReceipt key={monthKey}>
            <S.StyledMonth>{month}월</S.StyledMonth>

            {receipts.length > 0 ? (
              receipts.map((receipt) => (
                <div key={receipt.id}>
                  <ReceiptItem
                    money={receipt.amount}
                    date={new Date(receipt.date).toLocaleDateString('ko-KR')}
                    memo={receipt.description}
                  />
                  <S.ScrollContainer>
                    {receipt.fileUrls.map((file) => {
                      const url = file.fileUrl;

                      if (!isImage(url)) {
                        return (
                          <S.PdfBox
                            key={file.fileId}
                            onClick={() => openModal(url)}
                          >
                            PDF 보기
                          </S.PdfBox>
                        );
                      }

                      return (
                        <S.GridItem
                          key={file.fileId}
                          onClick={() => openModal(url)}
                        >
                          <S.GridItemImage src={url} />
                        </S.GridItem>
                      );
                    })}
                  </S.ScrollContainer>
                </div>
              ))
            ) : (
              <div> </div>
            )}
          </S.StyledReceipt>
        );
      })}

      <ReceiptViewerModal
        isOpen={isModalOpen}
        selectedImage={selectedImage}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default ReceiptList;
