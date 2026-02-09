'use client';

import { IconButton, Tooltip } from '@mui/material';
import { useThemeStore } from '@/store/useThemeStore';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
  const { mode, setMode } = useThemeStore();
  
  const isDark = mode === 'ocean-dark-b';

  const handleToggle = () => {
    setMode(isDark ? 'ocean' : 'ocean-dark-b');
  };

  return (
    <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton onClick={handleToggle} color="inherit">
        {isDark ? <FaSun size={20} /> : <FaMoon size={20} color='#1F3A60' />}
      </IconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;