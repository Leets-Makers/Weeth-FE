import theme from '@/styles/theme';
import { colors } from '@/theme/designTokens';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface CaptionProps {
  color?: string;
  textcolor?: string;
  children: ReactNode;
}

const BasicCaption = styled.button<{ $color?: string; $textcolor?: string }>`
  width: 47px;
  height: 19px;
  background-color: ${({ $color }) =>
    $color || colors.semantic.icon.alternative};
  font-family: ${theme.font.semiBold};
  color: ${({ $textcolor }) => $textcolor || colors.semantic.text.normal};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Caption: React.FC<CaptionProps> = ({ children, color, textcolor }) => (
  <BasicCaption $color={color} $textcolor={textcolor}>
    {children}
  </BasicCaption>
);

export default Caption;
