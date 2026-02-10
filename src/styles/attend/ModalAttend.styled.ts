import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const Line = styled.div`
  border: 1px solid ${colors.semantic.line};
  width: 285px;
  margin-top: 21px;
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
  ${typography.Body1};
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
  ${typography.Body1};
  box-sizing: border-box;
  &::placeholder {
    color: ${colors.semantic.text.alternative};
    ${typography.Body1};
  }
`;

export const Title = styled.div`
  margin-top: 8px;
  ${typography.Sub2};
  color: ${colors.semantic.text.alternative};
  gap: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  ${typography.Body2};
  margin: 8px 0 22px 0;
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Highlight = styled.div`
  ${typography.Sub1};
  color: ${colors.semantic.brand.primary};
  margin-top: 8px;
`;
