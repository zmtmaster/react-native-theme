const palette = {
  dodgerblue: '#4d8ff7',
  darkgrey: '#1d1d20',
  blueygrey: '#a2a2a4',
  slategrey: '#5d5d67',
  tomato: '#dc1919',
  purple: '#9477e8',
  white: '#ffffff',
};

const theme = {
  colors: {
    dark: palette.darkgrey,
    grey: palette.blueygrey,
    main: palette.dodgerblue,
    text: palette.white,
    warning: palette.tomato,
    heading: palette.white,
  },
  spacing: {
    xxs: 2,
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    button: {
      fontSize: 20,
      color: 'text',
    },
  },
};

export type Theme = typeof theme;
export type ThemeSpacing = keyof typeof theme.spacing;
export type ThemeVariant = keyof typeof theme.textVariants;
export type ThemeColor = keyof typeof theme.colors;

export default theme;
