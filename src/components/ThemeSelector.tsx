'use client';

import { useState, useMemo } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  Tooltip,
  Divider,
  Typography
} from '@mui/material';
import { useThemeStore, ThemeMode } from '@/store/useThemeStore';

// Icons für die visuelle Unterscheidung
import { 
  FaPalette, 
  FaMoon, 
  FaBolt, 
  FaFeather, 
  FaSun,
  FaWater,
  FaTrophy,
  FaCloud
} from 'react-icons/fa';
import { MdExpandMore } from 'react-icons/md';

interface ThemeOption {
  id: ThemeMode;
  label: string;
  icon: React.ReactNode;
  category: 'Classic' | 'Modern' | 'Brand Colors';
}

const ThemeSelector = () => {
  const { mode, setMode, devMode } = useThemeStore();
  
  // State für das Dropdown-Menü
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newMode: ThemeMode) => {
    setMode(newMode);
    handleClose();
  };

  // Dynamische Konfiguration aller Themes
  const themeOptions: ThemeOption[] = useMemo(() => [
    // Classic Themes
    { 
      id: 'light', 
      label: 'Classic Light', 
      icon: <FaFeather size={16} />,
      category: 'Classic'
    },
    { 
      id: 'dark', 
      label: 'Classic Dark', 
      icon: <FaMoon size={16} />,
      category: 'Classic'
    },
    
    // Modern Themes
    { 
      id: 'modern-light', 
      label: 'Modern Light', 
      icon: <FaBolt size={16} />,
      category: 'Modern'
    },
    { 
      id: 'modern-dark', 
      label: 'Modern Dark', 
      icon: <FaBolt size={16} />,
      category: 'Modern'
    },
    
    // Brand Color Themes
    { 
      id: 'ocean', 
      label: 'Ocean Professional', 
      icon: <FaWater size={16} />,
      category: 'Brand Colors'
    },
    { 
      id: 'ocean-dark', 
      label: 'Ocean Dark', 
      icon: <FaWater size={16} />,
      category: 'Brand Colors'
    },
    { 
      id: 'ocean-dark-b', 
      label: 'Ocean Dark B', 
      icon: <FaWater size={16} />,
      category: 'Brand Colors'
    },
    { 
      id: 'sunrise', 
      label: 'Sunrise Energy', 
      icon: <FaSun size={16} />,
      category: 'Brand Colors'
    },
    { 
      id: 'aqua-sport', 
      label: 'Aqua Sport', 
      icon: <FaWater size={16} />,
      category: 'Brand Colors'
    },
    { 
      id: 'midnight-professional', 
      label: 'Midnight Professional', 
      icon: <FaMoon size={16} />,
      category: 'Brand Colors'
    },
    { 
      id: 'champion-gold', 
      label: 'Champion Gold', 
      icon: <FaTrophy size={16} />,
      category: 'Brand Colors'
    },
    { 
      id: 'deep-ocean', 
      label: 'Deep Ocean', 
      icon: <FaWater size={16} />,
      category: 'Brand Colors'
    },
    { 
      id: 'sky-high', 
      label: 'Sky High', 
      icon: <FaCloud size={16} />,
      category: 'Brand Colors'
    },
  ], []);

  // Gruppiere Themes nach Kategorie
  const groupedThemes = useMemo(() => {
    const groups: Record<string, ThemeOption[]> = {};
    themeOptions.forEach(option => {
      if (!groups[option.category]) {
        groups[option.category] = [];
      }
      groups[option.category].push(option);
    });
    return groups;
  }, [themeOptions]);

  // Label des aktuellen Themes finden
  const currentLabel = themeOptions.find(t => t.id === mode)?.label || 'Theme';

  // Hide selector if dev mode is off
  if (!devMode) return null;

  return (
    <>
      <Tooltip title="Design & Farbe anpassen">
        <Button
          id="theme-button"
          aria-controls={open ? 'theme-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="outlined"
          color="inherit"
          startIcon={<FaPalette />}
          endIcon={<MdExpandMore />}
          sx={{ 
            borderRadius: 8,
            px: 2,
            minWidth: 160,
            justifyContent: 'space-between'
          }}
        >
          {currentLabel}
        </Button>
      </Tooltip>
      
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: { maxHeight: 480 }
          }
        }}
      >
        {Object.entries(groupedThemes).map(([category, options], groupIndex) => (
          <div key={category}>
            {groupIndex > 0 && <Divider />}
            <Typography 
              variant="caption" 
              sx={{ 
                px: 2, 
                py: 1, 
                display: 'block',
                fontWeight: 600,
                color: 'text.secondary'
              }}
            >
              {category}
            </Typography>
            {options.map((option) => (
              <MenuItem 
                key={option.id} 
                onClick={() => handleSelect(option.id)}
                selected={mode === option.id}
                sx={{ gap: 1.5 }}
              >
                <ListItemIcon sx={{ minWidth: 'auto !important' }}>
                  {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default ThemeSelector;