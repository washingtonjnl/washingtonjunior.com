import React, { PropsWithChildren, createContext, useState } from 'react';

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

  const switchTheme = (): void => {
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
