import useCustomBack from '@/hooks/useCustomBack';
import styled from 'styled-components';

import React, { useCallback, useState } from 'react';
import ModalPenalty from '@/components/Penalty/ModalPenalty';
import PenaltyInfoBox from '@/components/Penalty/PenaltyInfoBox';
import PenaltyItem from '@/components/Penalty/PenaltyItem';
import useGetPenalty from '@/api/useGetPenalty';
import Loading from '@/components/common/Loading';
import { MOBILE } from '@/styles';
import useSetHeader from '@/hooks/useSetHeader';

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

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  useSetHeader({
    title: '페널티',
    rightButtonType: 'INFO',
    isAccessible: true,
    onClickRightButton: handleOpenModal,
  });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
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
