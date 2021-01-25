import { createContext } from 'react';
import theme, { Theme } from './theme';

const ThemeContext = createContext<Theme>(theme);

export default ThemeContext;
