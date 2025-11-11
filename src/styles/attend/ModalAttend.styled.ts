import theme from '@/styles/theme';
import { colors } from '@/theme/designTokens';
import styled from 'styled-components';

export const Line = styled.div`
  border: 1px solid ${colors.semantic.line};
  width: 285px;
  margin: 0 auto;
`;

export const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13px;
  font-size: 16px;
`;

export const ModalInput = styled.input`
  width: 285px;
  height: 45px;
  margin: 0 auto;
  padding: 13px;
  margin: 15px auto;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: ${colors.dark.neutral[200]};
  color: ${colors.semantic.text.strong};
  font-size: 16px;
  box-sizing: border-box;
  &::placeholder {
    color: ${colors.semantic.text.alternative};
    font-size: 16px;
  }
`;

export const SemiBoldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  font-family: ${theme.font.semiBold};
  font-size: 16px;
  gap: 20px;
`;

export const RegularConatiner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0 30px 0;
  font-size: 14px;
  gap: 8px;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Highlight = styled.div`
  font-family: ${theme.font.semiBold};
  font-size: 20px;
  color: ${colors.semantic.brand.primary};
  margin-bottom: 5px;
`;
