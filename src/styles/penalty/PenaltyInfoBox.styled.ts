import styled from 'styled-components';
import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 100%;
  padding: 17px 0px;
  margin: 20px 0 10px 0;

  background-color: ${colors.dark.neutral[300]};
  border: 1px solid ${colors.semantic.line};
  border-radius: 10px;
`;

export const Half = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const LeftGroup = styled(Half)`
  justify-content: flex-start;
  gap: 8px;
`;

export const RightGroup = styled(Half)`
  justify-content: flex-start;
  gap: 8px;
`;

export const Separator = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 21px;
  background: #ffffff1a;
`;

export const CountText = styled.span`
  ${typography.Sub1};
  color: ${colors.semantic.text.strong};
`;

export const InfoText = styled.span`
  color: ${colors.semantic.text.alternative};
  ${typography.Caption1};
  margin: 2.2px 0 0 15px;
`;
