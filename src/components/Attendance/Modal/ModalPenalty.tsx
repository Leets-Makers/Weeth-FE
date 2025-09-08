/* eslint-disable no-nested-ternary */
import info from '@/assets/images/ic_info.svg';
import icClose from '@/assets/images/ic_close.svg';
import * as S from '@/styles/attend/ModalPenalty.styled';
import {
  StyledModal,
  ModalContent,
  ModalHeader,
} from '@/styles/attend/CommonModal.styled';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface ModalPenaltyProps {
  open: boolean;
  close: () => void;
}

/* ===== local styles ===== */
const Title = styled.h3`
  margin-top: 10px;
  font-family: ${theme.font.semiBold};
  font-size: 18px;
  color: ${theme.color.gray[100]};
`;

const Divider = styled.hr`
  height: 1px;
  width: 100%;
  border: 0;
  background: #ffffff4d;
  margin: 16px 0;
`;

const Section = styled.section`
  & + & {
    margin-top: 35px;
  }
`;

const P = styled.p`
  margin: 0 0 8px;
  color: #ffffff66;
  font-size: 14px;
  line-height: 1.6;
`;

const OL = styled.ol`
  margin: 0;
  padding-left: 15px;
  color: #ffffff66;
  font-size: 14px;
  line-height: 2;
`;

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

        <Title>Leets의 페널티 규정</Title>
        <Divider />

        <Section>
          <P>페널티를 받는 기준은 아래와 같아요.</P>
          <p> </p>
          <OL>
            <li>정기 모임에 출석을 하지 않았을 때(= 결석)</li>
            <li>과제를 제출하지 않았을 때</li>
            <li>경고를 2회 받았을 때</li>
          </OL>
        </Section>

        <Section>
          <P>경고를 받는 기준은 아래와 같아요.</P>
          <p> </p>
          <OL>
            <li>과제를 미완성했을 때</li>
          </OL>
        </Section>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalPenalty;
