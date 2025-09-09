import RadioGroup, { type RadioOption } from '@/components/Admin/RadioGroup';

export type PenaltyType = 'penalty' | 'warning';

const OPTIONS: RadioOption<PenaltyType>[] = [
  { label: '패널티', value: 'penalty' },
  { label: '경고', value: 'warning' },
];

type Props = {
  value: PenaltyType;
  onChange: (next: PenaltyType) => void;
  disabled?: boolean;
  className?: string;
};

const PenaltyRadioGroup: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  className,
}) => {
  return (
    <RadioGroup
      value={value}
      options={OPTIONS}
      onChange={onChange}
      disabled={disabled}
      className={className}
    />
  );
};

export default PenaltyRadioGroup;
