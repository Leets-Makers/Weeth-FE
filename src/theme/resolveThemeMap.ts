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
    } else if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      result[key] = resolveThemeMap(value, mode);
    } else {
      // number | boolean | null | array 등은 그대로 둠
      result[key] = value;
    }
  });
  

  return result;
}
