import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getActivePopup } from '@/sainty'; // 경로 확인 필요

// 데이터 타입 정의 (content 추가됨)
interface PopupData {
  title: string;
  content?: string; // 👈 추가됨 (없을 수도 있으니 ? 붙임)
  imageUrl: string;
  linkUrl?: string;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
`;

const PopupContainer = styled.div`
  background-color: white;
  border-radius: 16px; // 둥근 모서리 조금 더 키움
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 20rem; // 텍스트가 들어가니 너비 조정 (320px 정도)
  width: 90%; // 모바일 대응
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
`;

const ImageLink = styled.a`
  display: block;
  width: 100%;
  max-height: 300px; // 이미지가 너무 길어지는 것 방지
  overflow: hidden;
`;

const PopupImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// 👇 텍스트 영역 스타일 추가
const TextContainer = styled.div`
  padding: 20px 24px;
  text-align: left; // 왼쪽 정렬 (중앙 정렬 원하면 center)
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const Message = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap; // 줄바꿈(\n)을 화면에 반영해줌
`;
// 👆 텍스트 영역 스타일 끝

const ButtonGroup = styled.div`
  display: flex;
  border-top: 1px solid #f3f4f6;
`;

const ActionButton = styled.button<{ $isBold?: boolean }>`
  flex: 1;
  padding: 14px 0;
  font-size: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  color: ${(props) => (props.$isBold ? '#1f2937' : '#6b7280')};
  font-weight: ${(props) => (props.$isBold ? '600' : '400')};
  border-left: ${(props) => (props.$isBold ? '1px solid #f3f4f6' : 'none')};

  &:hover {
    background-color: #f9fafb;
  }
`;

const NoticePopup = () => {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkPopup = async () => {
      const hideUntil = localStorage.getItem('popup_hide_until');
      if (hideUntil) {
        const now = new Date();
        const hideDate = new Date(hideUntil);
        if (now < hideDate) return;
      }

      try {
        const data = await getActivePopup();
        if (data) {
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

  const handleDontShowToday = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem('popup_hide_until', tomorrow.toISOString());
    setIsVisible(false);
  };

  if (!isVisible || !popup) return null;

  return (
    <Overlay>
      <PopupContainer>
        {/* 1. 이미지 영역 */}
        {popup.linkUrl ? (
          <ImageLink
            href={popup.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PopupImage src={popup.imageUrl} alt={popup.title} />
          </ImageLink>
        ) : (
          <PopupImage src={popup.imageUrl} alt={popup.title} />
        )}

        {/* 2. 텍스트 영역 (제목 + 내용) */}
        <TextContainer>
          <Title>{popup.title}</Title>
          {popup.content && <Message>{popup.content}</Message>}
        </TextContainer>

        {/* 3. 버튼 영역 */}
        <ButtonGroup>
          <ActionButton onClick={handleDontShowToday}>
            오늘 그만 보기
          </ActionButton>
          <ActionButton onClick={handleClose} $isBold>
            닫기
          </ActionButton>
        </ButtonGroup>
      </PopupContainer>
    </Overlay>
  );
};

export default NoticePopup;
