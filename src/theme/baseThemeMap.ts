export const baseThemeMap = {
  backGround: 'neutral.200',
  line: 'neutral.400',

  text: {
    normal: 'neutral.800',
    strong: 'neutral.900',
    alternative: 'neutral.600',
    disabled: 'neutral.500',
    inverse: 'neutral.0',
  },

  container: {
    neutral: 'neutral.300',
    primary: 'primary.500',
    'primary-alternative': 'primary.100',
    secondary: 'secondary.500',
    'secondary-alternative': 'secondary.100',
    'primary-interaction': 'primary.600',
    'secondary-interaction': 'secondary.700',
    'neutral-interaction': 'neutral.400',
  },

  button: {
    neutral: 'neutral.400',
    'neutral-interaction': 'neutral.500',
    primary: 'primary.500',
    'primary-interaction': 'primary.600',
    disabled: 'neutral.400',
  },

  icon: {
    normal: 'neutral.800',
    strong: 'neutral.900',
    alternative: 'neutral.600',
    disabled: 'neutral.500',
    inverse: 'neutral.0',
  },

  brand: {
    primary: 'primary.500',
    secondary: 'secondary.500',
    purple: 'purple.500',
    pink: 'pink.500',
  },

  state: {
    success: '#2370f9',
    caution: '#ffb202',
    error: '#ff5857',
  },
} as const;
