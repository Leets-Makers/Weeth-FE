import theme from '@/styles/theme';
import { KeyboardEvent } from 'react';
import styled from 'styled-components';

export type RadioOption<T extends string> = { label: string; value: T };

type Props<T extends string> = {
  value: T;
  options: RadioOption<T>[];
  onChange: (next: T) => void;
  disabled?: boolean;
  className?: string;
};

const RadioGroup = <T extends string>({
  value,
  options,
  onChange,
  disabled,
  className,
}: Props<T>) => {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const idx = options.findIndex((o) => o.value === value);
    if (idx < 0) return;
    const nextIdx =
      e.key === 'ArrowLeft'
        ? (idx - 1 + options.length) % options.length
        : (idx + 1) % options.length;
    onChange(options[nextIdx].value);
  };

  return (
    <SegmentGroup
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={className}
      $count={options.length}
      $disabled={!!disabled}
    >
      {options.map((opt, i) => {
        const selected = opt.value === value;
        return (
          <SegmentItem
            key={opt.value}
            role="radio"
            aria-checked={selected}
            type="button"
            onClick={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            $selected={selected}
            $index={i}
            $count={options.length}
          >
            {opt.label}
          </SegmentItem>
        );
      })}
    </SegmentGroup>
  );
};

export default RadioGroup;

const SegmentGroup = styled.div<{ $count: number; $disabled: boolean }>`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, 1fr);
  max-width: 160px;
  gap: 0;

  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 4px;
  overflow: hidden;

  ${({ $disabled }) => $disabled && `opacity: 0.6; pointer-events: none;`}

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(80, 120, 255, 0.28);
  }
`;

const SegmentItem = styled.button<{
  $selected: boolean;
  $index: number;
  $count: number;
}>`
  height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 0;
  font-weight: 700;
  cursor: pointer;

  background: ${({ $selected }) => ($selected ? '#323232' : '#f9f9f9')};
  color: ${({ $selected }) => ($selected ? '#fff' : `${theme.color.gray[65]}`)};

  ${({ $index, $selected }) =>
    $index > 0 && !$selected && `border-left: 1px solid #dedede;`}
`;
