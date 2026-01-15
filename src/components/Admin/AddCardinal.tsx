import theme from '@/styles/theme';
import styled from 'styled-components';
import plusIcon from '@/assets/images/ic_admin_plus.svg';
import { useState } from 'react';
import CardinalModal from '@/components/Admin/Modal/CardinalModal';
import { colors, units } from '@/theme/designTokens';

export const AddCardinalWrapper = styled.div`
  min-width: 80px;
  height: 164px;
  box-sizing: border-box;
  /* background-color: ${theme.color.gray[100]}; */
  /* background-color: ${colors.semantic.button.primary}; */
  background-color: ${({ theme }) => theme.semantic.button.primary};

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${units.radius.lg}px;
`;

const AddCardinal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddCardinalWrapper onClick={handleOpenModal}>
        <img src={plusIcon} alt="plus" />
      </AddCardinalWrapper>

      <CardinalModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default AddCardinal;
