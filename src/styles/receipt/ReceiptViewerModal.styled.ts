import ReactModal from 'react-modal';
import styled from 'styled-components';
import typography from '@/theme/typography';
import { colors } from '@/theme/designTokens';

export const StyledModal = styled(ReactModal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: auto;
  min-width: 300px;
  max-width: 90vw;
  max-height: 90vh;

  padding: 20px;
  background: none;
  outline: none;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

export const Controls = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;

  ${typography.Button1};

  button {
    background-color: transparent;
    color: ${colors.semantic.button.primary};
    padding: 6px 12px;
    cursor: pointer;
    border: none;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      color: ${colors.semantic.button.disabled};
    }
    &:hover:not(:disabled) {
      color: ${colors.semantic.button['primary-interaction']};
    }
  }
`;
