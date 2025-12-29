import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface CaptionProps {
  color?: string;
  textcolor?: string;
  children: ReactNode;
  isMargin?: boolean;
}

const BasicCaption = styled.div<{
  $color?: string;
  $textcolor?: string;
  $isMargin?: boolean;
}>`
  ${typography.Caption2};
  width: 47px;
  height: 19px;

  background-color: ${({ $color }) =>
    $color || colors.semantic.icon.alternative};

  color: ${({ $textcolor }) => $textcolor || colors.semantic.text.normal};

  margin: ${({ $isMargin }) => ($isMargin ? '3px' : 0)};

  border: none;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Caption: React.FC<CaptionProps> = ({
  children,
  color,
  textcolor,
  isMargin = false,
}) => (
  <BasicCaption $color={color} $textcolor={textcolor} $isMargin={isMargin}>
    {children}
  </BasicCaption>
);

export default Caption;
