/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface ThemeContextType{
  theme : 'dark' | 'light';
  switchTheme : () => void;
}

const initialTheme: ThemeContextType = {
  theme: 'dark',
  switchTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(initialTheme);

type props = {
  children: ReactNode;
};

const ThemeContextProvider = ({ children }: props) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialTheme.theme);

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem('theme') as string) || 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const contextValue = useMemo<ThemeContextType>(() => ({
    theme,
    switchTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const { theme } = useContext(ThemeContext);

  return theme;
};

export const useSwitchTheme = () => {
  const { switchTheme } = useContext(ThemeContext);

  return switchTheme;
};

export default ThemeContextProvider;
