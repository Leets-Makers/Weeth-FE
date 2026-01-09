import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${colors.semantic.text.strong};
`;

export const Header = styled.div`
  margin-top: ${units.margin['200']}px;
  ${typography.H2};
`;

export const Sub2Text = styled.div`
  ${typography.Sub2};
  margin-top: 2.2px;
`;

export const Body1Text = styled.div`
  ${typography.Body1};
`;

export const StyledBox = styled.div`
  background-color: ${colors.semantic.container.neutral};
  border-radius: 14px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-top: 18px;
`;

export const SmallStyledBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  margin-bottom: 40px;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: ${colors.semantic.line};
    bottom: -20px;
  }
`;

export const NullBox = styled.div`
  margin: 20px 0;
`;
