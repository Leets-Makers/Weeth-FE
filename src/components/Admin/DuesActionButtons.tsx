import Button from '@/components/Admin/Button';
import { useTheme } from 'styled-components';
import { units } from '@/theme/designTokens';

interface DuesActionButtonsProps {
  onReset?: () => void;
  onSubmit?: () => void;
}

const DuesActionButtons: React.FC<DuesActionButtonsProps> = ({
  onReset,
  onSubmit,
}) => {
  const theme = useTheme();

  return (
    <>
      <Button
        description="초기화"
        color={theme.semantic.button.neutral}
        textColor={theme.semantic.text.strong}
        width="74px"
        borderRadius={`${units.radius.md}px`}
        onClick={onReset}
      />
      <Button
        description="추가"
        color={theme.semantic.button.primary}
        textColor={theme.semantic.text.inverse}
        width="60px"
        borderRadius={`${units.radius.md}px`}
        onClick={onSubmit}
      />
    </>
  );
};

export default DuesActionButtons;
