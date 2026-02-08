import styled from 'styled-components';
import Button from '@/components/Button/Button';
import { units } from '@/theme/designTokens';
import { useTheme } from 'styled-components';
import typography from '@/theme/typography';

interface ButtonItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: string;
  style?: React.CSSProperties;
  isHeader?: boolean;
}

interface ButtonGroupProps {
  buttons: ButtonItem[];
}

const ButtonGroupContainer = styled.div<{ isHeader?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  overflow-x: visible;
  white-space: nowrap;

  ${({ isHeader }) =>
    isHeader &&
    `
    margin-right: 70px;
  `}

  &::-webkit-scrollbar {
    height: 3px;
  }

  @media (max-width: 900px) {
    gap: 9px;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  white-space: nowrap;

  @media (max-width: 1300px) {
    ${typography.admin.Button1};
    width: fit-content;
  }

  @media (max-width: 1000px) {
    ${typography.admin.Caption1};
    padding: 1px;
    width: fit-content;
  }
`;

const ButtonGroup: React.FC<ButtonGroupProps & { isHeader?: boolean }> = ({
  buttons,
  isHeader,
}) => {
  const theme = useTheme();

  return (
    <ButtonGroupContainer isHeader={isHeader}>
      {buttons.map(({ label, onClick, disabled, style }) => (
        <Button
          key={label}
          color={theme.semantic.button.neutral}
          textcolor={
            disabled
              ? theme.semantic.text.disabled
              : style?.color || theme.semantic.text.normal
          }
          width="auto"
          height="40px"
          borderRadius={`${units.radius.md}px`}
          onClick={onClick}
          disabled={disabled}
        >
          <ButtonContent>{label}</ButtonContent>
        </Button>
      ))}
    </ButtonGroupContainer>
  );
};

export default ButtonGroup;
