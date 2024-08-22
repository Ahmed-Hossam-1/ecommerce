/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface DarkModeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedTheme = (localStorage.getItem('theme') as Theme) || 'light';
  const [theme, setTheme] = useState<Theme>(storedTheme);
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <DarkModeContext.Provider value={{ theme, toggleTheme }}>{children}</DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkModeContextType => {
  return useContext(DarkModeContext);
};
