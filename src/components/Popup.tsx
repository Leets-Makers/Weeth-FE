import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getActivePopups } from '@/sainty';
import defaultPopupImg from '@/assets/images/popup/popup_default_img_1.png';

interface PopupData {
  title: string;
  content?: string;
  imageUrl: string;
  linkUrl?: string;
  useDefaultImage?: boolean;
}

const HIDE_KEY = 'popup_hide_until';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);

  /* Mobile: 상단 중앙 */
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;

  /* PC: 우측 하단 */
  @media (min-width: 697px) {
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0 24px 24px 0;
  }
`;

const PopupContainer = styled.div`
  background-color: #1e2021;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  width: 320px;
  max-width: calc(100vw - 32px);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const PopupImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
`;

const TextContainer = styled.div`
  padding: 20px 20px 16px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #f8f8f8;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const Message = styled.p`
  font-size: 13px;
  color: #9fa3a6;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 20px 12px;
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  color: #9fa3a6;
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;

  &:hover {
    color: #f8f8f8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
    &:hover {
      color: #9fa3a6;
    }
  }
`;

const PaginationText = styled.span`
  font-size: 13px;
  color: #9fa3a6;
`;

const CTAButton = styled.a`
  display: block;
  margin: 0 20px 16px;
  padding: 12px 0;
  background-color: #00dda8;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #00c496;
  }
`;

const DismissText = styled.button`
  background: none;
  border: none;
  color: #6e7173;
  font-size: 12px;
  cursor: pointer;
  padding: 0 0 16px;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #9fa3a6;
  }
`;

const getImageUrl = (popup: PopupData): string => {
  if (popup.useDefaultImage || !popup.imageUrl) {
    return defaultPopupImg;
  }
  return popup.imageUrl;
};

const NoticePopup = () => {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkPopup = async () => {
      const hideUntil = localStorage.getItem(HIDE_KEY);
      if (hideUntil) {
        const now = new Date();
        const hideDate = new Date(hideUntil);
        if (now < hideDate) return;
      }

      try {
        const data = await getActivePopups();
        if (data && data.length > 0) {
          setPopups(data);
          setIsVisible(true);
        }
      } catch (error) {
        console.error('팝업 로딩 실패:', error);
      }
    };

    checkPopup();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleDismiss24h = () => {
    const hideUntil = new Date();
    hideUntil.setHours(hideUntil.getHours() + 24);
    localStorage.setItem(HIDE_KEY, hideUntil.toISOString());
    setIsVisible(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(popups.length - 1, prev + 1));
  };

  if (!isVisible || popups.length === 0) return null;

  const currentPopup = popups[currentIndex];
  const showPagination = popups.length > 1;

  return (
    <Overlay onClick={handleClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose} aria-label="닫기">
          ✕
        </CloseButton>

        <PopupImage
          src={getImageUrl(currentPopup)}
          alt={currentPopup.title}
        />

        <TextContainer>
          <Title>{currentPopup.title}</Title>
          {currentPopup.content && <Message>{currentPopup.content}</Message>}
        </TextContainer>

        {showPagination && (
          <PaginationWrapper>
            <PaginationButton
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="이전"
            >
              ‹
            </PaginationButton>
            <PaginationText>
              {currentIndex + 1} / {popups.length}
            </PaginationText>
            <PaginationButton
              onClick={handleNext}
              disabled={currentIndex === popups.length - 1}
              aria-label="다음"
            >
              ›
            </PaginationButton>
          </PaginationWrapper>
        )}

        {currentPopup.linkUrl ? (
          <CTAButton
            href={currentPopup.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            지금 사용해보기
          </CTAButton>
        ) : (
          <CTAButton as="button" onClick={handleClose}>
            지금 사용해보기
          </CTAButton>
        )}

        <DismissText onClick={handleDismiss24h}>
          24시간동안 보이지 않기
        </DismissText>
      </PopupContainer>
    </Overlay>
  );
};

export default NoticePopup;
