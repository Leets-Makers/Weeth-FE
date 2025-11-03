import styled from 'styled-components';

interface SignupTextComponentProps {
  text: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  children?: React.ReactNode;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  width: 370px;
  max-width: 370px;
  margin-top: 0;
`;

const Label = styled.label`
  display: block;
  margin-left: 7%;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.font.semiBold};
  color: ${({ theme }) => theme.color.gray[100]};
  line-height: 1.2;
  white-space: nowrap;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 87%;
  margin: 0 7% 15px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.color.gray[100]};
  background-color: ${({ theme }) => theme.color.gray[18]};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray[65]};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const SignupTextComponent: React.FC<SignupTextComponentProps> = ({
  text,
  value,
  onChange,
  placeholder,
  type = 'text',
  children,
  onKeyPress,
}) => (
  <Container>
    <Label>{text}</Label>
    <InputWrapper>
      <Input
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        type={type}
      />
      {children && <IconWrapper>{children}</IconWrapper>}
    </InputWrapper>
  </Container>
);

export default SignupTextComponent;
