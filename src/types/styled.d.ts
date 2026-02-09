import 'styled-components';
import { Mode } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    // 구버전 theme (src/styles/theme.ts)
    color?: {
      main: string;
      mainMiddle: string;
      mainDark: string;
      positive: string;
      positiveDark: string;
      negative: string;
      negativeDark: string;
      pointPurple: string;
      pointPink: string;
      pintYellow: string;
      caution: string;
      gray: {
        100: string;
        9: string;
        12: string;
        18: string;
        20: string;
        30: string;
        65: string;
        80: string;
      };
      lightGray: string;
      kakao: string;
    };
    font?: {
      semiBold: string;
      regular: string;
      medium: string;
    };

    // 신버전 theme (buildTheme)
    mode?: Mode;
    palette?: {
      primary: Record<string, string>;
      neutral: Record<string, string>;
      purple: Record<string, string>;
      pink: Record<string, string>;
      secondary: Record<string, string>;
    };
    semantic: {
      backGround: string;
      backGroundLight: string;
      line: string;
      text: {
        normal: string;
        strong: string;
        alternative: string;
        disabled: string;
        inverse: string;
      };
      container: {
        neutral: string;
        primary: string;
        'primary-alternative': string;
        secondary: string;
        'secondary-alternative': string;
        'primary-interaction': string;
        'secondary-interaction': string;
        'neutral-interaction': string;
        'neutral-alternative': string;
      };
      button: {
        neutral: string;
        'neutral-interaction': string;
        primary: string;
        'primary-interaction': string;
        disabled: string;
      };
      icon: {
        normal: string;
        strong: string;
        alternative: string;
        disabled: string;
        inverse: string;
      };
      brand: {
        primary: string;
        secondary: string;
        purple: string;
        pink: string;
      };
      state: {
        success: string;
        caution: string;
        error: string;
      };
    };
  }
}
