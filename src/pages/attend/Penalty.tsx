import useCustomBack from '@/hooks/useCustomBack';
import styled from 'styled-components';

import Header from '@/components/Header/Header';
import React, { useState } from 'react';
import ModalPenalty from '@/components/Penalty/ModalPenalty';
import PenaltyInfoBox from '@/components/Penalty/PenaltyInfoBox';
import PenaltyItem from '@/components/Penalty/PenaltyItem';
import useGetPenalty from '@/api/useGetPenalty';
import Loading from '@/components/common/Loading';
import { MOBILE } from '@/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MOBILE};
  max-width: ${MOBILE};
  margin-bottom: 50px;
`;

const Penalty: React.FC = () => {
  useCustomBack('/attendance');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { penaltyInfo, isLoading } = useGetPenalty();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Header
        RightButtonType="INFO"
        isAccessible
        onClickRightButton={handleOpenModal}
      >
        페널티
      </Header>
      <PenaltyInfoBox
        penaltyCount={penaltyInfo?.penaltyCount || 0}
        warningCount={penaltyInfo?.warningCount || 0}
      />

      {penaltyInfo?.Penalties.map((item) => (
        <PenaltyItem
          key={item.penaltyId}
          penaltyType={item.penaltyType}
          penaltyDescription={item.penaltyDescription}
          time={item.time}
        />
      ))}

      <ModalPenalty open={modalOpen} close={handleCloseModal} />
    </Container>
  );
};

export default Penalty;
