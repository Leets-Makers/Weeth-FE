import useCustomBack from '@/hooks/useCustomBack';
import React, { useState } from 'react';
import ModalPenalty from '@/components/Penalty/ModalPenalty';
import PenaltyInfoBox from '@/components/Penalty/PenaltyInfoBox';
import PenaltyItem from '@/components/Penalty/PenaltyItem';
import useGetPenalty from '@/api/useGetPenalty';
import Loading from '@/components/common/Loading';
import InfoButton from '@/components/Penalty/InfoButton';
import styled from 'styled-components';
import typography from '@/theme/typography';
import Breadcrumb from '@/components/common/Breadcrumb';
import { AttendContainer } from './Attendance';

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${typography.H2};
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AttendContainer>
      <Breadcrumb
        items={[
          { label: '출석', path: '/attendance' },
          { label: '페널티', path: '/penalty' },
        ]}
        hasTitle
      />
      <PageHeader>
        페널티
        <InfoButton onClick={handleOpenModal} />
      </PageHeader>
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
    </AttendContainer>
  );
};

export default Penalty;
