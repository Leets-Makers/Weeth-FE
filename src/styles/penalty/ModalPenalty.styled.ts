import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const Title = styled.h3`
  margin-top: 10px;
  color: ${colors.semantic.text.normal};
  ${typography.Sub1}
`;

export const Divider = styled.hr`
  height: 1px;
  width: 100%;
  border: 0;
  background: #ffffff4d;
  margin: 16px 0;
`;

export const Section = styled.section`
  & + & {
    margin-top: 35px;
  }
`;

export const P = styled.p`
  margin: 0 0 8px;
  color: ${colors.semantic.text.alternative};
  ${typography.Body2};
`;

export const OL = styled.ol`
  margin: 0;
  padding-left: 15px;
  color: ${colors.semantic.text.alternative};
  ${typography.Body2};
`;

export const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;
