// 라디오 그룹 공통 컴포넌트(페널티/경고 추가에 사용 )

import theme from '@/styles/theme';
import { units } from '@/theme/designTokens';
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
            onClick={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            $selected={selected}
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
  background: ${({ theme }) => theme.semantic.button.neutral};
  border-radius: ${units.radius.sm}px;
  overflow: auto;
`;

const SegmentItem = styled.button<{ $selected: boolean }>`
  position: relative;
  height: 48px;
  padding: 16 8px;
  box-sizing: border-box;

  font-weight: 700;
  font-size: 16px;

  border: 1px solid transparent;

  &:not(:first-child) {
    margin-left: -1px;
  }

  background: ${({ $selected, theme }) =>
    $selected ? theme.semantic.button.primary : theme.semantic.button.neutral};
  color: ${({ $selected, theme }) =>
    $selected ? theme.semantic.text.inverse : theme.semantic.text.alternative};

  ${({ $selected, theme }) =>
    !$selected && `border-color: ${theme.semantic.line};`}

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
