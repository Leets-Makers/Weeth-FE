import { colors } from '@/theme/designTokens';
import styled from 'styled-components';
import typography from '@/theme/typography';

export const MyInfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 19px;
`;
export const TextButton = styled.div<{ $isSignOut?: boolean }>`
  width: calc(100% - 8px);
  box-sizing: border-box;
  padding: 12px 0 12px 16px;
  margin: 0 4px;
  border-bottom: ${({ $isSignOut }) =>
    $isSignOut ? 'none' : `1px solid ${colors.semantic.line}`};
  color: ${({ $isSignOut }) =>
    $isSignOut ? colors.semantic.state.error : 'white'};
  cursor: pointer;
`;

export const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 25px 0px 0px;
  cursor: pointer;
`;

export const Section = styled.section`
  width: 100%;
`;

export const Title = styled.div`
  ${typography.Sub1};
  color: ${colors.semantic.text.alternative};
  margin: 18px 0 12px 0;
`;

export const Box = styled.div`
  width: 100%;
  background-color: ${colors.semantic.container.neutral};
  border: 1px solid ${colors.semantic.line};
  border-radius: 14px;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  ${typography.Body1};
`;
