/* eslint-disable no-nested-ternary */
import warning from '@/assets/images/ic_warning.svg';
import icClose from '@/assets/images/ic_close.svg';
import * as A from '@/styles/event/EventEditor.styled';
import * as S from '@/styles/attend/ModalPenalty.styled';

import {
  StyledModal,
  ModalContent,
  ModalHeader,
} from '@/styles/attend/CommonModal.styled';

interface CloseButtonProps {
  onClick: () => void;
}
interface ModalPenaltyProps {
  open: boolean;
  close: () => void;
}
// CloseButton Component
const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <S.ImgButton onClick={onClick}>
      <img src={icClose} alt="Close" />
    </S.ImgButton>
  );
};

// ModalPenalty Component
const ModalPenalty: React.FC<ModalPenaltyProps> = ({ open, close }) => {
  return (
    <StyledModal open={open}>
      <ModalContent>
        <ModalHeader>
          <img src={warning} alt="warning" />
          <CloseButton onClick={close} />
        </ModalHeader>
        <A.Bold>Leets의 페널티 규정</A.Bold>
        <A.Description>
          페널티를 받는 기준은 아래와 같아요.
          <br />
          1. 정기 모임에 출석을 하지 않았을때 (=결석) 2. 과제를 제출하지 않았을
          때 3. 경고를 2회 받았을 때
          <br />
          경고를 받는 기준을 아래와 같아요.
          <br />
          1.과제를 미완성했을 때
        </A.Description>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalPenalty;
