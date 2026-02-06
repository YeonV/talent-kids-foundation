'use client';

import { Box, Typography, useTheme } from '@mui/material';

interface FallbackProfileProps {
  name: string;
  width?: string | number;
  height?: string | number;
}

const FallbackProfile = ({ name, width = '100%', height = '100%' }: FallbackProfileProps) => {
  const theme = useTheme();

  // Extract initials (e.g., "Benny Behrla" -> "BB")
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    if (names.length === 0) return '';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(name);
  const primaryColor = theme.palette.primary.main; // Orange
  const secondaryColor = theme.palette.secondary.main; // Dark Blue

  return (
    <Box
      sx={{
        width: width,
        height: height,
        bgcolor: '#f0f2f5', // Light grey background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* 
         SVG PATTERN 
         A stylized abstract "Gi" / Athletic shape 
      */}
      <svg
        viewBox="0 0 400 500"
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background Gradient */}
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e0e0" />
            <stop offset="100%" stopColor="#cfcfcf" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#bgGrad)" />

        {/* Abstract Shoulder / Body Shape */}
        <path
          d="M-50,550 C50,400 350,400 450,550 L450,600 L-50,600 Z"
          fill={secondaryColor}
          opacity="0.8"
        />
        
        {/* Geometric Accent (The "Belt" or Motion line) */}
        <path
          d="M0,500 Q200,350 400,500"
          fill="none"
          stroke={primaryColor}
          strokeWidth="20"
          opacity="0.6"
        />

        {/* Abstract Head Circle (Subtle) */}
        <circle cx="200" cy="220" r="90" fill="#fff" opacity="0.3" />
      </svg>

      {/* INITIALS OVERLAY */}
      <Typography
        variant="h3"
        sx={{
          position: 'relative',
          zIndex: 2,
          fontWeight: 900,
          color: theme.palette.text.primary,
          opacity: 0.4,
          fontSize: 'clamp(2rem, 5vw, 4rem)', // Responsive font size
          letterSpacing: '0.05em',
          textShadow: '2px 2px 0px rgba(255,255,255,0.5)'
        }}
      >
        {initials}
      </Typography>
    </Box>
  );
};

export default FallbackProfile;