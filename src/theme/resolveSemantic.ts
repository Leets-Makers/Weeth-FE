import { colors } from './designTokens';
import { Mode } from './buildTheme';

export function resolveSemantic(value: string, mode: Mode): string {
  // 이미 hex 값이면 그대로 사용
  if (value.startsWith('#')) {
    return value;
  }

  const [colorKey, scale] = value.split('.');

  if (!colorKey || !scale) {
    return value;
  }

  const colorGroup = colors[mode][colorKey as keyof typeof colors[typeof mode]];

  if (!colorGroup) {
    return value;
  }

  return (colorGroup as Record<string, string>)[scale] ?? value;
}
