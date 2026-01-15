import { colors } from './designTokens';
import { resolveSemantic } from './resolveSemantic';
import { adminThemeMap } from './adminThemeMap';

type Mode = 'light' | 'dark';

function resolveGroup(obj: any, mode: Mode): any {
  const result: any = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[key] = resolveSemantic(value, mode);
    } else {
      result[key] = resolveGroup(value, mode);
    }
  });

  return result;
}

export function buildAdminTheme(mode: Mode = 'light') {
  return {
    mode,
    palette: colors[mode],
    semantic: resolveGroup(adminThemeMap, mode),
  };
}
