import React, {
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
} from 'react';

interface ThemeContextProps {
  currentTheme: string;
  switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: 'light',
  switchTheme: () => {},
});

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (!storedTheme) {
      localStorage.setItem('theme', currentTheme);
      return;
    }

    setCurrentTheme(storedTheme);
  }, [currentTheme]);

  const switchTheme = (): void => {
    localStorage.setItem('theme', currentTheme === 'light' ? 'dark' : 'light');
    setCurrentTheme(currentTheme =>
      currentTheme === 'light' ? 'dark' : 'light',
    );
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
