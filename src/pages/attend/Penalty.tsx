import useCustomBack from '@/hooks/useCustomBack';
import styled from 'styled-components';

import Header from '@/components/Header/Header';
import React, { useState } from 'react';
import ModalPenalty from '@/components/Attendance/Modal/ModalPenalty';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Penalty: React.FC = () => {
  useCustomBack('/attendance');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <Container>
      <Header
        RightButtonType="INFO"
        isAccessible
        onClickRightButton={handleOpenModal}
      >
        페널티
      </Header>
      <ModalPenalty open={modalOpen} close={handleCloseModal} />
    </Container>
  );
};

export default Penalty;
