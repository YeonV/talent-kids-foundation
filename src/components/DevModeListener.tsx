'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export default function DevModeListener() {
  const { toggleDevMode } = useThemeStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CTRL+ALT+Y to toggle dev mode
      if (e.ctrlKey && e.altKey && e.key === 'y') {
        e.preventDefault();
        toggleDevMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleDevMode]);

  return null;
}
