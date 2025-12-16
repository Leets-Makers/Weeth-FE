import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  StyledModal,
  ModalContent,
  ModalHeader,
} from '@/styles/attend/CommonModal.styled';
import * as S from '@/styles/attend/ModalAttend.styled';

import check from '@/assets/images/ic_check.svg';
import icClose from '@/assets/images/ic_close.svg';
import Correct from '@/assets/images/ic_correct.svg?react';
import Wrong from '@/assets/images/ic_wrong.svg?react';

import Button from '@/components/Button/Button';
import patchAttend from '@/api/patchAttend';
import Tag from '@/components/Event/Tag';
import { toastInfo } from '@/components/common/ToastMessage';
import { colors } from '@/theme/designTokens';
import { ModalAttendProps } from '@/types/attend';

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
  onSuccessAttend,
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
      setFeedback({ type: null, message: '' });
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

    try {
      const response = await patchAttend({ code: inputValue });
      const isSuccess = response.data.code === 200;

      if (isSuccess) {
        setFeedback({
          type: 'success',
          message: '출석 처리가 성공적으로 완료되었습니다.',
        });
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          close();

          onSuccessAttend();

          timeoutRef.current = null;
        }, 2000);
      } else {
        setFeedback({
          type: 'error',
          message: response.data.message || '출석 처리에 실패했습니다.',
        });
      }
    } catch (error: any) {
      setFeedback({
        type: 'error',
        message:
          error.response?.data?.message || '출석 처리 중 문제가 발생했습니다.',
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleSubmit();
  };

  return (
    <StyledModal $open={open}>
      <ModalContent>
        <ModalHeader>
          <img src={check} alt="체크" />
          <CloseButton onClick={close} />
        </ModalHeader>

        {/* 상단 정보 */}
        <S.SemiBoldContainer>
          출석하기 <S.Highlight>{title}</S.Highlight>
        </S.SemiBoldContainer>
        <Tag />
        <S.RegularConatiner>
          <div>
            날짜: {startDateTime} {endDateTime}
          </div>
          <div>장소: {location}</div>
        </S.RegularConatiner>

        <S.Line />

        {/* 입력 영역 */}
        <S.CenterContainer>
          <S.ModalInput
            type="text"
            placeholder="코드를 입력하세요"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleSubmit} width="285px" height="45px">
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
