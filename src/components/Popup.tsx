import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getActivePopups } from '@/sainty';
import defaultPopupImg from '@/assets/images/popup/popup_default_img_1.png';
import CloseIcon from '@/assets/images/ic_close.svg?react';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import { useLocation } from 'react-router-dom';

interface PopupPage {
  title: string;
  content?: string;
  imageUrl?: string;
  linkUrl?: string;
  useDefaultImage?: boolean;
}

interface PopupDocument {
  headerLabel?: string;
  pages: PopupPage[];
}

const HIDE_KEY = 'popup_hide_until';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  pointer-events: none;
  z-index: 50;

  display: flex;
  flex-direction: column;

  /* Mobile: 상단 중앙 */
  align-items: center;
  justify-content: flex-start;
  padding-top: 60px;

  /* PC: 우측 하단 */
  @media (min-width: 697px) {
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0 24px 24px 0;
  }
`;

const PopupContainer = styled.div`
  background-color: ${colors.semantic.backGround};
  border-radius: 16px;
  overflow: hidden;
  width: 320px;
  max-width: calc(100vw - 32px);
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px ${colors.semantic.line} solid;
  box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.3);
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  background-color: ${colors.semantic.backGround};
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: ${units.radius.sm}px;
  border: none;
  background-color: ${colors.semantic.button.neutral};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${colors.semantic.button['neutral-interaction']};
  }
`;

const HeaderLabel = styled.span`
  ${typography.Sub2};

  color: ${colors.semantic.text.normal};
`;

const PopupImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
`;

const Title = styled.h3`
  ${typography.Sub1};
  color: ${colors.semantic.text.normal};
  margin: 0 0 8px 0;
`;

const Message = styled.p`
  ${typography.Body2};
  color: ${colors.semantic.text.alternative};
  margin: 0;
  white-space: pre-wrap;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0 32px 0;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const PaginationButton = styled.button`
  background: none;
  border: none;
  color: ${colors.semantic.text.normal};
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
`;

const PaginationText = styled.span`
  ${typography.Caption1};
  color: ${colors.semantic.text.normal};
`;

const CTAButton = styled.a`
  all: unset;
  display: inline-block;

  min-width: 120px;
  padding: 12px 20px;
  background-color: ${colors.semantic.button.primary};
  color: ${colors.semantic.text.inverse};
  ${typography.Button1};
  text-align: center;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  pointer-events: auto;
`;

const DismissText = styled.button`
  ${typography.Button2};
  background: none;
  border: none;
  color: ${colors.semantic.text.alternative};
  cursor: pointer;
  padding: 8px 18px;
  text-decoration: underline;
  text-underline-offset: 3px;

  align-self: flex-start;

  &:hover {
    color: ${colors.semantic.text.strong};
  }
`;

const getImageUrl = (page: PopupPage): string => {
  if (page.useDefaultImage || !page.imageUrl) {
    return defaultPopupImg;
  }
  return page.imageUrl;
};

const NoticePopup = () => {
  const [popup, setPopup] = useState<PopupDocument | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

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
        if (data && data.pages && data.pages.length > 0) {
          setPopup(data);
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
    if (!popup) return;
    setCurrentIndex((prev) => Math.min(popup.pages.length - 1, prev + 1));
  };

  if (location.pathname !== '/home') return null;
  if (!isVisible || !popup || popup.pages.length === 0) return null;

  const currentPage = popup.pages[currentIndex];
  const showPagination = popup.pages.length > 1;
  const headerText = popup.headerLabel || 'Weeth의 새로운 기능';

  return (
    <Overlay>
      <PopupWrapper onClick={(e) => e.stopPropagation()}>
        <PopupContainer>
          <HeaderWrapper>
            <HeaderLabel>{headerText}</HeaderLabel>
            <CloseButton onClick={handleClose} aria-label="닫기">
              <CloseIcon height={10} width={10} />
            </CloseButton>
          </HeaderWrapper>

          <PopupImage src={getImageUrl(currentPage)} alt={currentPage.title} />

          <ContentContainer>
            <Title>{currentPage.title}</Title>
            {currentPage.content && <Message>{currentPage.content}</Message>}
            {showPagination && (
              <PaginationWrapper>
                <PaginationButton
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  ‹
                </PaginationButton>
                <PaginationText>
                  {currentIndex + 1} / {popup.pages.length}
                </PaginationText>
                <PaginationButton
                  onClick={handleNext}
                  disabled={currentIndex === popup.pages.length - 1}
                >
                  ›
                </PaginationButton>
              </PaginationWrapper>
            )}

            <ButtonRow>
              {currentPage.linkUrl ? (
                <CTAButton
                  href={currentPage.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  지금 사용해보기
                </CTAButton>
              ) : (
                <CTAButton as="button" onClick={handleClose}>
                  확인
                </CTAButton>
              )}
            </ButtonRow>
          </ContentContainer>
        </PopupContainer>
        <DismissText onClick={handleDismiss24h}>
          24시간동안 보이지 않기
        </DismissText>
      </PopupWrapper>
    </Overlay>
  );
};

export default NoticePopup;
