import { colors } from './designTokens';
import { resolveThemeMap } from './resolveThemeMap';

export type Mode = 'light' | 'dark';

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
