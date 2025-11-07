import styled, { keyframes } from 'styled-components';
import theme from '@/styles/theme';

export const flowing = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const SCROLL_DURATION = 20;

export const AnimationLayout = styled.div`
  display: flex;
  background-color: ${theme.color.negativeDark};
  cursor: pointer;
  height: 1.875rem;
  align-items: center;
`;

export const FlowBox = styled.div`
  position: relative;
  width: 100%;
  height: 1.875rem;
  overflow: hidden;
`;

export const FlowText = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 1rem;
  position: relative;
`;

export const Label = styled.div`
  display: flex;
  font-family: ${theme.font.semiBold};
  font-size: 0.8125rem;
  color: white;
`;

export const TextWrapper = styled.div`
  position: absolute;
  left: 4.0625rem;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const TextTrack = styled.div`
  display: inline-flex;
  white-space: nowrap;
  animation: ${flowing} ${SCROLL_DURATION}s linear infinite;
  animation-delay: 0.5s;
  font-size: 0.8125rem;
`;

export const BoldText = styled.span`
  font-family: ${theme.font.semiBold};
  color: white;
`;

export const NormalText = styled.span`
  font-family: ${theme.font.regular};
  margin-left: 0.375rem;
  color: white;
`;

export const Spacer = styled.span`
  display: inline-block;
  width: 0.9375rem;
`;
