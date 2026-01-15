// styles/theme/adminTheme.ts
import legacyTheme from '@/styles/theme';
import { buildTheme } from './buildTheme';

export const adminTheme = {
  ...legacyTheme, // 기존 컬러 유지
  ...buildTheme('light'), // semantic + palette (light)
};
