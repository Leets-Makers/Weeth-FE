import { colors } from './designTokens';
import { resolveSemantic } from './resolveSemantic';

type Mode = 'light' | 'dark';

export function buildTheme(mode: Mode) {
  const semantic = colors.semantic;

  return {
    mode,

    // primitive 그대로 노출 (필요하면)
    palette: colors[mode],

    semantic: {
      backGround: resolveSemantic(semantic.backGround, mode),

      line: resolveSemantic(semantic.line, mode),

      text: {
        inverse: semantic.text.inverse,
        normal: semantic.text.normal,
        alternative: semantic.text.alternative,
        disabled: semantic.text.disabled,
        strong: semantic.text.strong,
      },

      icon: {
        inverse: semantic.icon.inverse,
        normal: semantic.icon.normal,
        alternative: semantic.icon.alternative,
        disabled: semantic.icon.disabled,
        strong: semantic.icon.strong,
      },

      container: {
        neutral: resolveSemantic(semantic.container.neutral, mode),
        primary: resolveSemantic(semantic.container.primary, mode),
        secondary: resolveSemantic(semantic.container.secondary, mode),

        'primary-alternative': resolveSemantic(
          semantic.container['primary-alternative'],
          mode,
        ),
        'secondary-alternative': resolveSemantic(
          semantic.container['secondary-alternative'],
          mode,
        ),

        'primary-interaction': resolveSemantic(
          semantic.container['primary-interaction'],
          mode,
        ),
        'secondary-interaction': resolveSemantic(
          semantic.container['secondary-interaction'],
          mode,
        ),
        'neutral-interaction': resolveSemantic(
          semantic.container['neutral-interaction'],
          mode,
        ),
      },

      button: {
        neutral: resolveSemantic(semantic.button.neutral, mode),
        primary: resolveSemantic(semantic.button.primary, mode),

        'neutral-interaction': resolveSemantic(
          semantic.button['neutral-interaction'],
          mode,
        ),
        'primary-interaction': resolveSemantic(
          semantic.button['primary-interaction'],
          mode,
        ),

        disabled: semantic.button.disabled, // hex라서 그대로
      },

      brand: {
        primary: resolveSemantic(semantic.brand.primary, mode),
        secondary: resolveSemantic(semantic.brand.secondary, mode),
        purple: resolveSemantic(semantic.brand.purple, mode),
        pink: resolveSemantic(semantic.brand.pink, mode),
      },

      state: {
        success: semantic.state.success,
        caution: semantic.state.caution,
        error: semantic.state.error,
      },
    },
  };
}
