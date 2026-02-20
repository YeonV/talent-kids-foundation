'use client';

import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { withBasePath } from '@/lib/basePath';
import ScrollReveal from './ScrollReveal';

const ParallaxQuote = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        // Parallax Magic
        backgroundImage: 'url(' + withBasePath('/img/backgrounds/together.jpg') + ')',
        backgroundAttachment: { xs: 'scroll', md: 'fixed' }, // Mobile fix vs Desktop Parallax
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        height: '60vh', // Mächtige Höhe
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 
         Overlay: Ein dunkler Verlauf, damit der Text knallt, 
         aber das Bild noch sichtbar ist.
      */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(15, 18, 20, 0.75)', // Sehr dunkles Overlay für Editorial Look
          zIndex: 1
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <ScrollReveal direction="up">
          <Box>
            <Typography 
              variant="h2" 
              component="div" 
              sx={{ 
                color: '#fff', 
                fontWeight: 800,
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: { xs: '2.5rem', md: '4rem' }
              }}
            >
              Alles beginnt mit dem
              <Box component="span" sx={{ color: theme.palette.primary.main }}> ersten Schritt.</Box>
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'grey.300', 
                fontStyle: 'italic',
                fontFamily: theme.typography.h1.fontFamily, // Serif Font (Playfair)
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              Wir schenken Kindern Sport
            </Typography>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  );
};

export default ParallaxQuote;