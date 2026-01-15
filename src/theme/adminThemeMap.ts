export const adminThemeMap = {
  backGround: 'neutral.200',

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
    primary: 'primary.500',
    'primary-interaction': 'primary.600',
    neutral: 'neutral.400',
    'neutral-interaction': 'neutral.500',
    disabled: '#6e7173',
  },

  line: 'neutral.400',

  brand: {
    primary: 'primary.500',
    purple: 'purple.500',
    secondary: 'secondary.500',
    pink: 'pink.500',
  },

  text: {
    inverse: '#000000',
    normal: '#1e2021',
    alternative: '#909599',
    disabled: '#b7bcbf',
    strong: '#000000',
  },

  icon: {
    inverse: '#000000',
    normal: '#1e2021',
    alternative: '#46494d',
    disabled: '#909599',
    strong: '#000000',
  },

  state: {
    success: '#2370f9',
    caution: '#ffb202',
    error: '#ff5857',
  },
} as const;
