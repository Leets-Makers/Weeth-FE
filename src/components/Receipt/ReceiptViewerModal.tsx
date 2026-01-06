import React, { useState, useMemo } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import 'core-js/full/promise/with-resolvers';

import {
  StyledModal,
  ContentWrapper,
  Controls,
} from '@/styles/receipt/ReceiptViewerModal.styled';

// react-pdf의 Promise.withResolvers를 위한 Polyfill
if (typeof Promise.withResolvers === 'undefined') {
  if (typeof window !== 'undefined') {
    window.Promise.withResolvers = function <T>() {
      let resolve!: (value: T | PromiseLike<T>) => void;
      let reject!: (reason?: any) => void;
      const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  } else {
    global.Promise.withResolvers = function <T>() {
      let resolve!: (value: T | PromiseLike<T>) => void;
      let reject!: (reason?: any) => void;
      const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  }
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

interface ReceiptModalProps {
  isOpen: boolean;
  selectedImage: string;
  onRequestClose: () => void;
}

const ReceiptViewerModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  selectedImage,
  onRequestClose,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // 파일 타입 판별 함수 (확장자 체크)
  const isPdf = useMemo(() => {
    if (!selectedImage) return false;

    // URL에서 쿼리 파라미터(?token=...) 제거 후 확장자 확인
    const cleanUrl = selectedImage.split('?')[0].toLowerCase();
    return cleanUrl.endsWith('.pdf');
  }, [selectedImage]);

  // PDF 로드 성공 핸들러
  const onDocumentLoadSuccess = (info: { numPages: number }) => {
    setNumPages(info.numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber((prev) => prev + offset);
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 9999 },
      }}
      ariaHideApp={false}
    >
      <ContentWrapper>
        {/* PDF면 Document, 아니면 img */}
        {isPdf ? (
          <Document
            file={selectedImage}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(e) => console.error('PDF Load Error:', e)}
            loading={<div>PDF 로딩중...</div>}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        ) : (
          // 이미지일 경우
          <img src={selectedImage} alt="영수증 이미지" />
        )}
      </ContentWrapper>

      {/* PDF일 때만 페이지 컨트롤 노출 */}
      {isPdf && numPages > 0 && (
        <Controls>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() => changePage(-1)}
          >
            &lt; 이전
          </button>
          <span>
            {pageNumber} / {numPages}
          </span>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={() => changePage(1)}
          >
            다음 &gt;
          </button>
        </Controls>
      )}
    </StyledModal>
  );
};

export default ReceiptViewerModal;
