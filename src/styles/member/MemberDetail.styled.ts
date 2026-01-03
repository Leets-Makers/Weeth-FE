import styled from 'styled-components';
import theme from '@/styles/theme';
import { colors } from '@/theme/designTokens';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  height: 100vh;
`;

export const PositionCharacter = styled.img`
  margin-top: 52px;
  width: 14.3rem;
`;

export const ClipContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Clip = styled.img`
  position: absolute;
  top: -10px;
  left: 20px;
`;

export const ContentTop = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.semantic.container.neutral};
  gap: 20px;
  width: 350px;
  height: 136px;
  margin-top: 35px;
  border-radius: 19px 19px 0 0;
  padding: 16px;
  box-sizing: border-box;
`;

export const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
  border: 1px solid ${colors.semantic.container.neutral};
  border-radius: 0 0 19px 19px;
  padding: 17px 14px 34px;
  box-sizing: border-box;
`;

export const CardinalList = styled.div`
  display: flex;
  gap: 4px;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Position = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-family: ${theme.font.semiBold};
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 32px;
  font-family: ${theme.font.semiBold};
`;

export const Department = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Gray = styled.div`
  color: ${colors.semantic.text.alternative};
`;

export const ErrorMessage = styled.div`
  color: ${colors.semantic.text.alternative};
  margin-top: 50px;
  font-size: 16px;
`;
