import Modal from '@/components/Modal/Modal';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { colors } from '@/theme/designTokens';
import { useSelectModalStore } from '@/stores/selectModalStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  margin-left: 4px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 15px;
`;

const Description = styled.div`
  font-size: 14px;
  color: ${colors.semantic.text.alternative};
  font-weight: 500;
  margin-top: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 9px;
`;

const ModalButton = styled.button`
  font-family: ${theme.font.semiBold};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 148px;
  height: 45px;
`;

const CancelButton = styled(ModalButton)`
  background: ${colors.semantic.button.neutral};
  &:hover {
    opacity: 0.7;
  }
`;

const ActionButton = styled(ModalButton)<{
  type: 'positive' | 'negative';
  $visible: boolean;
}>`
  display: ${(props) => (props.$visible ? 'flex' : 'none')};

  color: ${(props) =>
    props.type === 'positive'
      ? colors.semantic.text.inverse
      : colors.semantic.text.normal};

  background: ${(props) =>
    props.type === 'positive'
      ? colors.semantic.brand.primary
      : colors.semantic.state.error};

  &:hover {
    background: ${(props) =>
      props.type === 'positive' ? colors.dark.primary[200] : '#BF4242'};
  }
`;

const SelectModal = () => {
  const { isOpen, modalProps, close } = useSelectModalStore();

  if (!isOpen || !modalProps) return null;

  const {
    title,
    content,
    buttonContent,
    type,
    visibility,
    cancelText,
    onDelete,
  } = modalProps;

  return (
    <Modal isDelete hasCloseButton={false} onClose={close}>
      <Container>
        <Title>{title}</Title>
        <Description>{content}</Description>
      </Container>

      <ButtonContainer>
        <CancelButton onClick={close}>{cancelText}</CancelButton>
        <ActionButton
          type={type ?? 'negative'}
          $visible={visibility ?? true}
          onClick={() => {
            onDelete?.();
            close();
          }}
        >
          {buttonContent}
        </ActionButton>
      </ButtonContainer>
    </Modal>
  );
};

export default SelectModal;
