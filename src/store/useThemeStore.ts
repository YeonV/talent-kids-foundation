/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

export type ThemeMode = 
  | 'light' 
  | 'dark' 
  | 'modern-light' 
  | 'modern-dark'
  | 'ocean'
  | 'ocean-dark'
  | 'ocean-dark-b'
  | 'sunrise'
  | 'aqua-sport'
  | 'midnight-professional'
  | 'champion-gold'
  | 'deep-ocean'
  | 'sky-high';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  initializeTheme: () => void;
  // NEU: Animation Flag
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  // Dev Mode Toggle
  devMode: boolean;
  toggleDevMode: () => void;
}

export const useThemeStore = create<ThemeState>()((set) => ({
  mode: 'ocean', // Safe SSR default
  setMode: (mode) => set({ mode }),
  initializeTheme: () => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      set({ mode: prefersDark ? 'ocean-dark-b' : 'ocean' });
    }
  },
  
  // Default: true
  animationsEnabled: true,
  toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
  
  // Dev Mode: Default false (hidden)
  devMode: false,
  toggleDevMode: () => set((state) => ({ devMode: !state.devMode })),
}));