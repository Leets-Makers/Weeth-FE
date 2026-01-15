import { colors } from './designTokens';

type Mode = 'light' | 'dark';
type ColorKey = keyof typeof colors.light;
type ScaleKey = keyof typeof colors.light.primary;

/**
 * semantic token value를 실제 hex 값으로 변환
 * ex) 'primary.500' -> colors[mode].primary['500']
 */
export function resolveSemantic(value: string, mode: Mode): string {
  // 이미 hex 값이면 그대로 반환 (text, icon 등)
  if (value.startsWith('#')) {
    return value;
  }

  const [colorKey, scale] = value.split('.');
  if (
    !colorKey ||
    !scale ||
    !(colorKey in colors[mode]) ||
    !(scale in colors[mode][colorKey as keyof (typeof colors)[typeof mode]])
  ) {
    throw new Error(
      `Invalid semantic value: "${value}". colorKey: "${colorKey}" or scale: "${scale}" not found for mode: "${mode}".`,
    );
  }

  // Type safely cast for colorKey and scale
  const colorObj = colors[mode][colorKey as keyof (typeof colors)[typeof mode]];
  const resolved = (colorObj as Record<string, string>)[scale];

  if (!resolved) {
    throw new Error(
      `Scale "${scale}" not found in color "${colorKey}" for mode "${mode}".`,
    );
  }

  return resolved;
}
