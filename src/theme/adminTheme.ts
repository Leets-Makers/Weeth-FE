import legacyTheme from '@/styles/theme';
import { buildAdminTheme } from './buildAdminTheme';

export const adminTheme = {
  ...legacyTheme, // 기존 theme
  ...buildAdminTheme('light'), // semantic만 Admin 전용
};
