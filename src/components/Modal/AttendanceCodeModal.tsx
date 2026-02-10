import React, { useState } from 'react';
import dayjs from 'dayjs';
import Modal from '@/components/Modal/Modal';
import fullscreen from '@/assets/images/ic_fullscreen.svg';
import smallscreen from '@/assets/images/ic_smallscreen.svg';
import close from '@/assets/images/ic_close.svg';
import * as S from '@/styles/event/EventContent.styled';

interface AttendanceCodeModalProps {
  code: string;
  onClose: () => void;
  open: boolean;
}

const AttendanceCodeModal: React.FC<AttendanceCodeModalProps> = ({
  code,
  onClose,
  open,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!open) return null;

  return (
    <Modal isFullScreen={isFullScreen} hasCloseButton={false} onClose={onClose}>
      <S.ModalSetting>
        {!isFullScreen ? (
          <>
            <S.ImgButton
              src={fullscreen}
              alt="fullscreen"
              onClick={() => setIsFullScreen(true)}
            />
            <S.ImgButton src={close} alt="close" onClick={onClose} />
          </>
        ) : (
          <S.ImgButton
            src={smallscreen}
            alt="smallscreen"
            onClick={() => setIsFullScreen(false)}
          />
        )}
      </S.ModalSetting>

      {isFullScreen && <S.Date>{dayjs().format('YYYY년 M월 D일')}</S.Date>}
      <S.Title $isFullScreen={isFullScreen}>출석코드</S.Title>
      <S.AttendanceCode $isFullScreen={isFullScreen}>{code}</S.AttendanceCode>
    </Modal>
  );
};

export default AttendanceCodeModal;
