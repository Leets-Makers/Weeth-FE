import React, { FC } from 'react';
import styled from 'styled-components';
import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';

interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  textcolor?: string;
  onClick?: () => void;
  height?: string;
  width?: string;
  borderRadius?: string;
  disabled?: boolean;
  isSemibold?: boolean;
}

interface StyledButtonProps {
  color?: string;
  $textColor?: string;
  height?: string;
  width?: string;
  $borderRadius?: string;
  disabled?: boolean;
  $isSemibold?: boolean;
}

const BasicButton = styled.button<StyledButtonProps>`
  background-color: ${({ color }) => color || colors.semantic.button.neutral};
  font-family: ${({ $isSemibold }) =>
    $isSemibold ? typography.Button1 : typography.Button2};
  color: ${({ $textColor }) => $textColor || colors.semantic.text.normal};
  border: none;
  border-radius: ${({ $borderRadius }) => $borderRadius || '10px'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '50px'};

  &:disabled {
    cursor: not-allowed;
  }
`;

const Button: FC<ButtonProps> = ({
  children,
  color,
  textcolor,
  onClick,
  height,
  width,
  borderRadius,
  disabled,
  isSemibold = true,
}) => {
  return (
    <BasicButton
      color={color}
      $textColor={textcolor}
      onClick={onClick}
      height={height}
      width={width}
      $borderRadius={borderRadius}
      disabled={disabled}
      $isSemibold={isSemibold}
    >
      {children}
    </BasicButton>
  );
};

export default Button;
