'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Slide } from '@mui/material';
import Link from 'next/link';

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Prüfen, ob schon zugestimmt wurde
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Kurze Verzögerung für bessere UX
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <Paper
        elevation={6}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          m: { xs: 0, md: 2 },
          p: 3,
          borderRadius: { xs: 0, md: 2 },
          zIndex: 1300, // Über allem anderen (ausser Modal/Tooltip)
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          maxWidth: { md: 800 },
          mx: { md: 'auto' }
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            Wir nutzen Cookies 🍪
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Wir nutzen nur essenzielle Cookies, um die Funktionalität der Website zu gewährleisten. 
            Es werden keine persönlichen Daten an Dritte weitergegeben. 
            Details finden Sie in unserer <Link href="/datenschutz" style={{ textDecoration: 'underline' }}>Datenschutzerklärung</Link>.
          </Typography>
        </Box>
        <Box display="flex" gap={2} minWidth="fit-content">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAccept}
          >
            Alles klar!
          </Button>
        </Box>
      </Paper>
    </Slide>
  );
};

export default CookieConsent;