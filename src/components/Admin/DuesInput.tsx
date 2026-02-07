import styled from 'styled-components';
import { forwardRef } from 'react';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';

interface InputProps {
  width: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  variant?: 'neutral-interaction' | 'neutral';
}

const Input = styled.input<InputProps>`
  ${typography.admin.Body1}
  width: ${(props) => props.width};
  gap: 5%;
  height: 48px;
  border-radius: ${units.radius.sm}px;
  border: none;
  padding-left: 10px;
  cursor: ${(props) => (props.readOnly ? 'not-allowed' : 'text')};
  background-color: ${({ theme, variant }) =>
    variant === 'neutral'
      ? theme.semantic.container.neutral
      : theme.semantic.container['neutral-interaction']};

  &::placeholder {
    color: ${({ theme }) => theme.semantic.text.alternative};
    margin-left: 5px;
  }

  &:focus {
    outline: none;
    border-color: black;
  }
`;

const DuesInput = forwardRef<HTMLInputElement, InputProps>(
  ({ width, placeholder, value, onChange, onBlur, readOnly, variant }, ref) => {
    return (
      <Input
        ref={ref}
        width={width}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        variant={variant}
      />
    );
  },
);

DuesInput.displayName = 'DuesInput';
export default DuesInput;
