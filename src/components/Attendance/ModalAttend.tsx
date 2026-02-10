import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { StyledModal, ModalContent } from '@/styles/attend/CommonModal.styled';
import * as S from '@/styles/attend/ModalAttend.styled';

import icClose from '@/assets/images/ic_close.svg';
import Correct from '@/assets/images/ic_correct.svg?react';
import Wrong from '@/assets/images/ic_wrong.svg?react';

import Button from '@/components/Button/Button';
import Tag from '@/components/Event/Tag';
import { toastInfo } from '@/components/common/ToastMessage';
import { colors } from '@/theme/designTokens';
import { ModalAttendProps } from '@/types/attend';
import usePatchAttend from '@/hooks/mutation/usePatchAttend';

// 하위 UI 컴포넌트들
const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <S.ImgButton onClick={onClick}>
    <img src={icClose} alt="닫기" />
  </S.ImgButton>
);

const FeedbackContainer: React.FC<{
  type: 'success' | 'error';
  message: string;
}> = ({ type, message }) => (
  <>
    <S.ImgContainer>
      {type === 'success' ? (
        <Correct stroke={colors.semantic.brand.primary} />
      ) : (
        <Wrong color={colors.semantic.state.error} />
      )}
    </S.ImgContainer>
    <S.TextContainer>{message}</S.TextContainer>
  </>
);

// 출석 모달
const ModalAttend: React.FC<ModalAttendProps> = ({
  title,
  location,
  startDateTime,
  endDateTime,
  open,
  close,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 모달 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setInputValue('');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [open]);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    },
    [],
  );

  const { mutate: patchAttend, isPending } = usePatchAttend({
    onMutate: () => {
      setFeedback({ type: null, message: '' });
    },

    onSuccess: () => {
      setFeedback({
        type: 'success',
        message: '출석 처리가 성공적으로 완료되었습니다.',
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setFeedback({ type: null, message: '' });
        close();
        timeoutRef.current = null;
      }, 2000);
    },

    onError: (message) => {
      setFeedback({
        type: 'error',
        message,
      });
    },
  });

  // 입력 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,4}$/.test(value)) setInputValue(value);
  };

  // 입력 완료 처리
  // eslint-disable-next-line consistent-return
  const handleSubmit = async () => {
    if (!inputValue) return toastInfo('코드를 입력해 주세요');
    if (inputValue.length < 4) return toastInfo('4자리 숫자를 입력해 주세요.');

    patchAttend({ code: inputValue });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleSubmit();
  };

  return (
    <StyledModal $open={open}>
      <ModalContent>
        <CloseButton onClick={close} />

        <S.Title>출석하기</S.Title>
        <S.Highlight>{title}</S.Highlight>

        <S.Content>
          <div>
            날짜: {startDateTime} {endDateTime}
          </div>
          <div>장소: {location}</div>
        </S.Content>
        <Tag />

        <S.Line />

        {/* 입력 영역 */}
        <S.CenterContainer>
          <S.ModalInput
            disabled={isPending}
            type="text"
            placeholder="코드를 입력하세요"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <Button
            color={colors.semantic.button.primary}
            textcolor={colors.semantic.text.inverse}
            disabled={isPending}
            onClick={handleSubmit}
            width="285px"
            height="45px"
          >
            입력완료
          </Button>
        </S.CenterContainer>

        {/* 결과 영역 */}
        {feedback.type && (
          <FeedbackContainer type={feedback.type} message={feedback.message} />
        )}
      </ModalContent>
    </StyledModal>
  );
};

export default ModalAttend;
