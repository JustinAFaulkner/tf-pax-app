import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeConstants, type AirlineTheme, DEFAULT_AIRLINE } from '@/data/constants/theme';
import type { THEME } from '@/data/constants/soundsprod';

type ThemeType = 'light' | 'dark';

type ThemeColors = typeof THEME[ThemeType];

interface ThemeContextType {
  theme: ThemeType;
  airline: AirlineTheme;
  toggleTheme: () => void;
  setAirline: (airline: AirlineTheme) => void;
  colors: ThemeColors;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  airline: DEFAULT_AIRLINE,
  toggleTheme: () => {},
  setAirline: () => {},
  colors: getThemeConstants(DEFAULT_AIRLINE).THEME.dark,
  isLoading: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [airline, setAirlineState] = useState<AirlineTheme>(DEFAULT_AIRLINE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [savedTheme, savedAirline] = await Promise.all([
        AsyncStorage.getItem('theme'),
        AsyncStorage.getItem('airline'),
      ]);
      
      if (savedTheme) {
        setTheme(savedTheme as ThemeType);
      }
      if (savedAirline) {
        setAirlineState(savedAirline as AirlineTheme);
      }
    } catch (error) {
      console.error('Error loading theme settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const setAirline = async (newAirline: AirlineTheme) => {
    setAirlineState(newAirline);
    try {
      await AsyncStorage.setItem('airline', newAirline);
    } catch (error) {
      console.error('Error saving airline theme:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  const themeConstants = getThemeConstants(airline);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        airline,
        toggleTheme, 
        setAirline,
        colors: themeConstants.THEME[theme],
        isLoading 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);