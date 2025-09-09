/* eslint-disable no-nested-ternary */
import info from '@/assets/images/ic_info.svg';
import icClose from '@/assets/images/ic_close.svg';
import * as S from '@/styles/penalty/ModalPenalty.styled';
import {
  StyledModal,
  ModalContent,
  ModalHeader,
} from '@/styles/attend/CommonModal.styled';

interface ModalPenaltyProps {
  open: boolean;
  close: () => void;
}

const CloseBtn = ({ onClick }: { onClick: () => void }) => (
  <S.ImgButton onClick={onClick}>
    <img src={icClose} alt="닫기" />
  </S.ImgButton>
);

const ModalPenalty: React.FC<ModalPenaltyProps> = ({ open, close }) => {
  return (
    <StyledModal open={open}>
      <ModalContent>
        <ModalHeader>
          <img src={info} alt="info" />
          <CloseBtn onClick={close} />
        </ModalHeader>

        <S.Title>Leets의 페널티 규정</S.Title>
        <S.Divider />

        <S.Section>
          <S.P>페널티를 받는 기준은 아래와 같아요.</S.P>
          <p> </p>
          <S.OL>
            <li>정기 모임에 출석을 하지 않았을 때(= 결석)</li>
            <li>과제를 제출하지 않았을 때</li>
            <li>경고를 2회 받았을 때</li>
          </S.OL>
        </S.Section>

        <S.Section>
          <S.P>경고를 받는 기준은 아래와 같아요.</S.P>
          <p> </p>
          <S.OL>
            <li>과제를 미완성했을 때</li>
          </S.OL>
        </S.Section>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalPenalty;
