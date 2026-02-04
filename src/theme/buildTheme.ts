import { colors } from './designTokens';
import { resolveThemeMap } from './resolveThemeMap';
import { Mode } from '@/types/theme';

export function buildTheme(
  themeMap: Record<string, any>,
  mode: Mode,
) {
  return {
    mode,
    palette: colors[mode],
    semantic: resolveThemeMap(themeMap, mode),
  };
}
