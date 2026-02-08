import Button from '@/components/Admin/Button';
import { useTheme } from 'styled-components';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';

interface DuesActionButtonsProps {
  onReset?: () => void;
  onSubmit?: () => void;
  resetText?: string;
  submitText?: string;
  resetWidth?: string;
  submitWidth?: string;
}

const DuesActionButtons: React.FC<DuesActionButtonsProps> = ({
  onReset,
  onSubmit,
  resetText = '초기화',
  submitText = '추가',
  resetWidth = '74px',
  submitWidth = '60px',
}) => {
  const theme = useTheme();

  return (
    <>
      <Button
        description={resetText}
        color={theme.semantic.button.neutral}
        textColor={theme.semantic.text.strong}
        width={resetWidth}
        borderRadius={`${units.radius.md}px`}
        onClick={onReset}
        $typo={typography.admin.Button1}
      />
      <Button
        description={submitText}
        color={theme.semantic.button.primary}
        textColor={theme.semantic.text.inverse}
        width={submitWidth}
        borderRadius={`${units.radius.md}px`}
        onClick={onSubmit}
        $typo={typography.admin.Button1}
      />
    </>
  );
};

export default DuesActionButtons;
