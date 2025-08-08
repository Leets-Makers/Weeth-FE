import theme from '@/styles/theme';

const MarkdownLink = ({ href = '' }: { href?: string }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {href}
    </a>
  );
};

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomCheckbox = ({ checked, onChange }: CustomCheckboxProps) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    style={{
      transform: 'scale(0.85)',
      accentColor: `${theme.color.main}`,
    }}
  />
);

export { MarkdownLink, CustomCheckbox };
