import { KeyboardEvent } from 'react';

export type RadioOption<T extends string> = { label: string; value: T };

type Props<T extends string> = {
  value: T;
  options: RadioOption<T>[];
  onChange: (next: T) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

const RadioGroup = <T extends string>({
  value,
  options,
  onChange,
  disabled,
  className,
  ariaLabel,
}: Props<T>) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();

    const idx = options.findIndex((opt) => opt.value === value);
    if (idx < 0) return;

    const nextIdx =
      e.key === 'ArrowLeft'
        ? (idx - 1 + options.length) % options.length
        : (idx + 1) % options.length;

    onChange(options[nextIdx].value);
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      className={className}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ display: 'flex', gap: '8px' }}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => !disabled && onChange(opt.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              cursor: disabled ? 'not-allowed' : 'pointer',
              background: selected ? '#333' : '#fff',
              color: selected ? '#fff' : '#555',
              fontWeight: 600,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export default RadioGroup;
