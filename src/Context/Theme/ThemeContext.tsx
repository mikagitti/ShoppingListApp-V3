'use client'
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';

enum ThemeType {light, dark};

type ThemeContextType = {  
  toggleTheme: () => void;    
}

const defaultState: ThemeContextType = {  
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultState);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  
  const [theme, setTheme] = useState<ThemeType>(ThemeType.dark);
  
  const toggleTheme = () => {    
    setTheme((prevTheme) => (prevTheme === ThemeType.light ? ThemeType.dark : ThemeType.light));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <MUIThemeProvider theme={theme === ThemeType.light ? lightTheme : darkTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
