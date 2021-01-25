import { useContext } from 'react';
import ThemeContext from './context';
import { Theme } from './theme';

export default function useTheme(): Theme {
  return useContext(ThemeContext);
}
