import { resolveSemantic } from './resolveSemantic';
import { Mode } from '@/types/theme';

export function resolveThemeMap(
  obj: Record<string, any>,
  mode: Mode,
): any {
  const result: any = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'string') {
      result[key] = resolveSemantic(value, mode);
    } else {
      result[key] = resolveThemeMap(value, mode);
    }
  });

  return result;
}
