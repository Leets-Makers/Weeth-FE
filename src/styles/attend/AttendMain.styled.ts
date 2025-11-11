import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const StyledBox = styled.div`
  width: 100%;
  background-color: ${colors.semantic.container.neutral};
  border-radius: 10px;
  padding: ${units.padding[400]}px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  box-sizing: border-box;
`;

export const StyledAttend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CaptionText = styled.p`
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};
  margin: 0;
`;

export const TitleText = styled.p`
  ${typography.Sub1};
  margin: 4px 0 0 0;
`;

export const InfoText = styled.p`
  ${typography.Body2};
  color: ${colors.semantic.text.alternative};
  margin: 4px 0 0 0;
`;
