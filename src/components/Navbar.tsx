'use client';

import { useState, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Stack,
  useScrollTrigger,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import { FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import ThemeSelector from '@/components/ThemeSelector';
import { navItems } from '@/data/content';

const Navbar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const scrolled = useMemo(() => {
    return pathname !== '/' ? true : trigger;
  }, [pathname, trigger]);

  const handleNavigation = (targetId: string) => {
    setMobileOpen(false);

    if (pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  const handleLogoClick = () => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  const drawerContent = (
    <Box sx={{ textAlign: 'center', p: 4, height: '100%', bgcolor: 'background.paper' }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton onClick={() => setMobileOpen(false)}>
          <FaTimes />
        </IconButton>
      </Box>
      
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700, color: 'primary.main' }}>
        Talent Kids Foundation
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.target)} sx={{ justifyContent: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2 }}>
           <Button 
             fullWidth 
             variant="contained" 
             color="primary"
             startIcon={<FaHeart />}
             onClick={() => handleNavigation('donate')}
           >
             Spenden
           </Button>
        </ListItem>
      </List>
      
      <Box mt={4} display="flex" justifyContent="center">
        <ThemeSelector />
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: (pathname === '/' && !scrolled) 
            ? 'transparent' 
            : alpha(theme.palette.background.default, 0.95),
          backdropFilter: (scrolled || pathname !== '/') ? 'blur(10px)' : 'none',
          borderBottom: (scrolled || pathname !== '/') ? `1px solid ${theme.palette.divider}` : 'none',
          transition: 'all 0.3s ease',
          py: (pathname === '/' && !scrolled) ? 2 : 0.5
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            
            <Box 
              onClick={handleLogoClick}
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Box sx={{ lineHeight: 1 }}>
                <Typography 
                  variant="h5" 
                  fontWeight={800} 
                  sx={{ 
                    color: (pathname === '/' && !scrolled) ? '#fff' : 'text.primary',
                    letterSpacing: '-0.02em'
                  }}
                >
                  TALENT KIDS
                </Typography>
                <Typography 
                   variant="caption" 
                   sx={{ 
                     display: 'block', 
                     color: theme.palette.primary.main, 
                     fontWeight: 700, 
                     letterSpacing: '0.2em' 
                   }}
                >
                  FOUNDATION
                </Typography>
              </Box>
            </Box>

            <Stack 
              direction="row" 
              spacing={4} 
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => handleNavigation(item.target)}
                  sx={{ 
                    color: (pathname === '/' && !scrolled) ? '#fff' : 'text.primary',
                    fontWeight: 600,
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Box sx={{ 
                 '& button': { 
                   color: (pathname === '/' && !scrolled) ? '#fff' : 'inherit',
                   borderColor: (pathname === '/' && !scrolled) ? 'rgba(255,255,255,0.5)' : 'inherit'
                 } 
              }}>
                <ThemeSelector />
              </Box>

              <Button 
                variant="contained" 
                color="primary"
                startIcon={<FaHeart />}
                onClick={() => handleNavigation('donate')}
                sx={{ px: 3, borderRadius: 50 }}
              >
                Spenden
              </Button>
            </Stack>

            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ 
                display: { md: 'none' }, 
                color: (pathname === '/' && !scrolled) ? '#fff' : 'text.primary' 
              }}
            >
              <FaBars size={24} />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;