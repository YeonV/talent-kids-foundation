'use client';

import { useState } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  Tooltip 
} from '@mui/material';
import { FaLayerGroup, FaImage, FaPalette } from 'react-icons/fa';
import { MdExpandMore } from 'react-icons/md';
import { useThemeStore } from '@/store/useThemeStore';

export type AmbassadorVariant = 
  | 'default'
  | 'overlay-gray'
  | 'overlay-theme'
  | 'overlay-dark'
  | 'split-view'
  | 'minimal'
  | 'compact-chip-top'
  | 'compact-chip-mid'
  | 'compact-chip-bottom';

interface VariantOption {
  id: AmbassadorVariant;
  label: string;
  icon: React.ReactNode;
}

interface AmbassadorVariantSelectorProps {
  variant: AmbassadorVariant;
  onVariantChange: (variant: AmbassadorVariant) => void;
}

const AmbassadorVariantSelector = ({ variant, onVariantChange }: AmbassadorVariantSelectorProps) => {
  const { devMode } = useThemeStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newVariant: AmbassadorVariant) => {
    onVariantChange(newVariant);
    handleClose();
  };

  const variantOptions: VariantOption[] = [
    { 
      id: 'default', 
      label: 'Default (Image Top)', 
      icon: <FaLayerGroup size={16} />
    },
    { 
      id: 'overlay-gray', 
      label: 'Overlay (Gray Fade)', 
      icon: <FaImage size={16} />
    },
    { 
      id: 'overlay-theme', 
      label: 'Overlay (Theme Color)', 
      icon: <FaPalette size={16} />
    },
    { 
      id: 'overlay-dark', 
      label: 'Overlay (Dark)', 
      icon: <FaImage size={16} />
    },
    { 
      id: 'split-view', 
      label: 'Split View', 
      icon: <FaLayerGroup size={16} />
    },
    { 
      id: 'minimal', 
      label: 'Minimal (Small Image)', 
      icon: <FaImage size={16} />
    },
    { 
      id: 'compact-chip-top', 
      label: 'Compact (Chip Top)', 
      icon: <FaImage size={16} />
    },
    { 
      id: 'compact-chip-mid', 
      label: 'Compact (Chip Mid)', 
      icon: <FaImage size={16} />
    },
    { 
      id: 'compact-chip-bottom', 
      label: 'Compact (Chip Bottom)', 
      icon: <FaImage size={16} />
    },
  ];

  const currentLabel = variantOptions.find(v => v.id === variant)?.label || 'Card Variant';

  // Hide selector if dev mode is off
  if (!devMode) return null;

  return (
    <>
      <Tooltip title="Test different card designs">
        <Button
          id="variant-button"
          aria-controls={open ? 'variant-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="outlined"
          size="small"
          startIcon={<FaLayerGroup />}
          endIcon={<MdExpandMore />}
          sx={{ 
            borderRadius: 8,
            px: 2,
            minWidth: 200,
            justifyContent: 'space-between'
          }}
        >
          {currentLabel}
        </Button>
      </Tooltip>
      
      <Menu
        id="variant-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'variant-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {variantOptions.map((option) => (
          <MenuItem 
            key={option.id} 
            onClick={() => handleSelect(option.id)}
            selected={variant === option.id}
            sx={{ gap: 1.5 }}
          >
            <ListItemIcon sx={{ minWidth: 'auto !important' }}>
              {option.icon}
            </ListItemIcon>
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AmbassadorVariantSelector;
