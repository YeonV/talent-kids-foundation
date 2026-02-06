'use client';

import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        bgcolor: 'background.default',
        zIndex: 9999
      }}
    >
      <CircularProgress size={60} color="primary" thickness={4} />
    </Box>
  );
}