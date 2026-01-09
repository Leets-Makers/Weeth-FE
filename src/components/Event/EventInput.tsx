import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.semantic.container.neutral};
  border-radius: ${units.radius.lg}px;
`;

const StyledInput = styled.input`
  width: 345px;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${colors.semantic.text.strong};
  ${typography.Body1};
  padding: ${units.padding['300']}px ${units.padding['400']}px;

  &::placeholder {
    color: ${colors.semantic.text.alternative};
  }
`;

const EventInput = ({
  origValue,
  editValue,
  placeholder,
}: {
  origValue: string;
  editValue: (val: string) => void;
  placeholder?: string;
}) => {
  const [value, setValue] = useState(origValue);

  useEffect(() => {
    setValue(origValue);
  }, [origValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    editValue(newValue);
  };

  return (
    <StyledInput
      placeholder={placeholder}
      value={value as string}
      onChange={handleChange}
    />
  );
};

export default EventInput;

export const EventInputBlock = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};
