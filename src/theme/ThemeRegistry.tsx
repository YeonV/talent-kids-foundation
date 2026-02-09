'use client';

import * as React from 'react';
import { ThemeProvider, CssBaseline, Theme } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'; // Oder v15
import { useThemeStore, ThemeMode } from '@/store/useThemeStore';
import { 
  lightTheme, 
  darkTheme, 
  modernLightTheme, 
  modernDarkTheme,
  oceanTheme,
  oceanDarkTheme,
  sunriseTheme,
  aquaSportTheme,
  midnightProfessionalTheme,
  championGoldTheme,
  deepOceanTheme,
  skyHighTheme,
  oceanThemeB
} from './themes';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((state) => state.mode);
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  // Initialize theme based on system preference on mount
  React.useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Mapping-Objekt
  const themeMap: Record<ThemeMode, Theme> = React.useMemo(() => ({
    'light': lightTheme,
    'dark': darkTheme,
    'modern-light': modernLightTheme,
    'modern-dark': modernDarkTheme,
    'ocean': oceanTheme,
    'ocean-dark-b': oceanThemeB,
    'ocean-dark': oceanDarkTheme,
    'sunrise': sunriseTheme,
    'aqua-sport': aquaSportTheme,
    'midnight-professional': midnightProfessionalTheme,
    'champion-gold': championGoldTheme,
    'deep-ocean': deepOceanTheme,
    'sky-high': skyHighTheme,
  }), []);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={themeMap[mode]}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}