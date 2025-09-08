import useCustomBack from '@/hooks/useCustomBack';
import styled from 'styled-components';

import Header from '@/components/Header/Header';
import React, { useState } from 'react';
import ModalPenalty from '@/components/Attendance/Modal/ModalPenalty';
import PenaltyInfoBox from '@/components/Penalty/PenaltyInfoBox';
import PenaltyItem, { PenaltyProps } from '@/components/Penalty/PenaltyItem';
import useGetPenalty from '@/api/useGetPenalty';
import Loading from '@/components/common/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

// Mock data
const mockPenaltyList: PenaltyProps[] = [
  {
    penaltyId: 1,
    penaltyType: 'PENALTY',
    penaltyDescription: '출석 체크 지각',
    time: '2025-09-10T15:54:11.867Z',
  },
  {
    penaltyId: 2,
    penaltyType: 'WARNING',
    penaltyDescription: '스터디 과제 미제출',
    time: '2025-08-23T15:54:11.867Z',
  },
  {
    penaltyId: 3,
    penaltyType: 'PENALTY',
    penaltyDescription: '회의 무단 불참',
    time: '2025-07-08T15:54:11.867Z',
  },
];

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

      {mockPenaltyList.map((item) => (
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
