/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  // NEU: Animation Flag
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  // Dev Mode Toggle
  devMode: boolean;
  toggleDevMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'ocean-dark',
      setMode: (mode) => set({ mode }),
      
      // Default: true
      animationsEnabled: true,
      toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
      
      // Dev Mode: Default false (hidden)
      devMode: false,
      toggleDevMode: () => set((state) => ({ devMode: !state.devMode })),
    }),
    {
      name: 'theme-storage',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (version < 2) {
          // Reset to defaults for version 2
          return {
            mode: 'ocean-dark',
            animationsEnabled: true,
            devMode: false,
          };
        }
        return persistedState;
      },
    }
  )
);