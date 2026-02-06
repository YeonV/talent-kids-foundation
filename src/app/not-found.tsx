'use client';

import Link from 'next/link';
import { Box, Typography, Button, Container } from '@mui/material';
import { FaHome } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      
      <Container 
        maxWidth="md" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          py: 10
        }}
      >
        <Box 
          sx={{ 
            fontSize: '8rem', 
            fontWeight: 900, 
            color: 'primary.light',
            opacity: 0.2,
            lineHeight: 1
          }}
        >
          404
        </Box>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Hoppla, diese Seite fehlt.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph maxWidth={500}>
          Vielleicht wurde sie geworfen? Wie beim Judo. 
          Aber keine Sorge, wir bringen dich wieder sicher auf die Matte.
        </Typography>
        
        <Button 
          component={Link} 
          href="/" 
          variant="contained" 
          size="large" 
          startIcon={<FaHome />}
          sx={{ mt: 2 }}
        >
          Zurück zur Startseite
        </Button>
      </Container>
      
      <Footer />
    </Box>
  );
}