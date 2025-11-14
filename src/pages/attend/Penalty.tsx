import useCustomBack from '@/hooks/useCustomBack';
import React, { useEffect, useState } from 'react';
import ModalPenalty from '@/components/Penalty/ModalPenalty';
import PenaltyInfoBox from '@/components/Penalty/PenaltyInfoBox';
import PenaltyItem from '@/components/Penalty/PenaltyItem';
import useGetPenalty from '@/api/useGetPenalty';
import Loading from '@/components/common/Loading';
import { AttendContainer } from './Attendance';

const Penalty: React.FC = () => {
  useCustomBack('/attendance');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { penaltyInfo, isLoading } = useGetPenalty();
  const [showLoading, setShowLoading] = useState(true);

  // const handleOpenModal = () => {
  //   setModalOpen(true);
  // };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
      return undefined;
    }
    const timer = setTimeout(() => setShowLoading(false), 100);
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (showLoading && isLoading) {
    return <Loading />;
  }

  return (
    <AttendContainer>
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
