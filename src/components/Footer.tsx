'use client';

import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Stack, 
  IconButton, 
  Divider,
  useTheme,
  Grid,
  alpha,
  FormControlLabel,
  Switch
} from '@mui/material';
import { FaInstagram, FaLinkedin, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { usePathname, useRouter } from 'next/navigation';
import { legalLinks, navLinks } from '@/data/content';
import { useThemeStore } from '@/store/useThemeStore';

const Footer = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
const { animationsEnabled, toggleAnimations } = useThemeStore();

  const handleNavClick = (target: string) => {
    if (target === 'top') {
      if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
      else router.push('/');
      return;
    }

    if (pathname === '/') {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${target}`);
    }
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#0F1214', // Immer Dunkelgrau/Schwarz, egal welches Theme
        color: '#fff',
        pt: 10,
        pb: 4,
        borderTop: `1px solid ${alpha('#fff', 0.1)}`
      }}
    >
      <Container maxWidth="lg">
        
        {/* --- MAIN COLUMNS --- */}
        <Grid container spacing={6}>
          
          {/* COL 1: BRAND & MISSION */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#fff' }}>
              Talent Kids <Box component="span" sx={{ color: theme.palette.primary.main }}>Foundation</Box>
            </Typography>
            {/* <Typography variant="body2" sx={{ color: 'grey.400', mb: 3, lineHeight: 1.6, maxWidth: 300 }}>
              Wir bringen olympischen Sport in Schulen und Kitas. 
              Für mehr Bewegung, starke Werte und echte Chancengleichheit.
            </Typography> */}
            
            <Stack direction="row" spacing={1} mt={3}>
              <IconButton sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: theme.palette.primary.main } }}>
                <FaInstagram size={20} />
              </IconButton>
              <IconButton sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: theme.palette.primary.main } }}>
                <FaLinkedin size={20} />
              </IconButton>
              <IconButton sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: theme.palette.primary.main } }}>
                <FaFacebook size={20} />
              </IconButton>
            </Stack>
          </Grid>

          {/* COL 2: QUICK LINKS */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            {/* <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
              Menü
            </Typography>
            <Stack spacing={1.5}>
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  component="button"
                  onClick={() => handleNavClick(link.target)}
                  underline="none"
                  sx={{ 
                    color: 'grey.400', 
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    transition: 'color 0.2s',
                    '&:hover': { color: theme.palette.primary.main } 
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack> */}
          </Grid>

          {/* COL 3: LEGAL */}
          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
              Rechtliches
            </Typography>
            <Stack spacing={1.5}>
              {legalLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  underline="none"
                  sx={{ 
                    color: 'grey.400', 
                    fontSize: '0.9rem',
                    transition: 'color 0.2s',
                    '&:hover': { color: theme.palette.primary.main } 
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* COL 4: KONTAKT (Die echten Daten!) */}
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
              Kontakt
            </Typography>
            <Stack spacing={2.5}>
              
              {/* Adresse */}
              <Box display="flex" gap={2}>
                <FaMapMarkerAlt size={18} color={theme.palette.primary.main} style={{ marginTop: 2 }} />
                <Box>
                  <Typography variant="body2" color="white" fontWeight={600}>
                    EduProSports gGmbH
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    Friedrich Schmidt Str. 6 <br/>
                    50931 Köln
                  </Typography>
                </Box>
              </Box>

              {/* Email */}
              <Box display="flex" gap={2}>
                <FaEnvelope size={18} color={theme.palette.primary.main} style={{ marginTop: 2 }} />
                <Link 
                  href="mailto:info@talentkidsfoundation.com" 
                  underline="hover" 
                  sx={{ color: 'grey.400', '&:hover': { color: '#fff' } }}
                >
                  info@talentkidsfoundation.com
                </Link>
              </Box>

              {/* Telefon */}
              <Box display="flex" gap={2}>
                <FaPhone size={18} color={theme.palette.primary.main} style={{ marginTop: 2 }} />
                <Link 
                  href="tel:+491727512087" 
                  underline="hover" 
                  sx={{ color: 'grey.400', '&:hover': { color: '#fff' } }}
                >
                  +49 172 7512087
                </Link>
              </Box>

            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* --- BOTTOM BAR --- */}
         <Box 
          display="flex" 
          flexDirection={{ xs: 'column', md: 'row' }} 
          justifyContent="space-between" 
          alignItems="center"
          gap={2}
        >
          <Box display="flex" flexDirection="row" alignItems={{ xs: 'center', md: 'flex-start' }} gap={0.5}>
            <Typography variant="caption" color="grey.600" display="block">
              © {new Date().getFullYear()} Talent Kids Foundation.
            </Typography>
            <Typography variant="caption" color="grey.600">
              Designed with ❤️ for Kids.
            </Typography>
          </Box>

          {/* NEU: Animation Toggle */}
          {/* <FormControlLabel
            control={
              <Switch
                checked={animationsEnabled} 
                onChange={toggleAnimations} 
                size="small" 
                color="primary"
              />
            }
            label={
              <Typography variant="caption" color="grey.600">
                Animationen {animationsEnabled ? 'An' : 'Aus'}
              </Typography>
            }
          /> */}
          
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;