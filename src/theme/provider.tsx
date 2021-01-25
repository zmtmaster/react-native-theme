import React from 'react';

import ThemeContext from './context';
import defaultTheme, { Theme } from './theme';

interface ThemeProviderProps {
  theme?: Theme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = defaultTheme,
}) => <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;

export default ThemeProvider;
