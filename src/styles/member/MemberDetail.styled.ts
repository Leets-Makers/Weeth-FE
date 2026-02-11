import styled from 'styled-components';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 ${units.padding['450']}px;
`;

export const PositionCharacter = styled.img`
  margin-top: ${units.margin['500']}px;
  width: 203px;
`;

export const ClipContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Clip = styled.img`
  position: absolute;
  top: 17px;
  left: 30px;
`;

export const ContentTop = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.semantic.container.neutral};
  gap: 12px;
  width: 100%;
  height: 136px;
  margin-top: 40px;
  border-radius: 19px 19px 0 0;
  padding: 40px 0 16px 16px;
  box-sizing: border-box;
  border: 1px solid ${colors.semantic.line};
  border-bottom: none;
`;

export const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  border: 1px solid ${colors.semantic.line};
  border-top: none;
  border-radius: 0 0 19px 19px;
  padding: 16px;
  box-sizing: border-box;
`;

export const CardinalList = styled.div`
  display: flex;
  gap: 3px;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${typography.Body1};
`;

export const Position = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  ${typography.Sub2};
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${typography.H2};
`;

export const Department = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  ${typography.Body1};
`;

export const Gray = styled.div`
  color: ${colors.semantic.text.alternative};
`;

export const ErrorMessage = styled.div`
  color: ${colors.semantic.text.alternative};
  margin-top: 50px;
  font-size: 16px;
`;
