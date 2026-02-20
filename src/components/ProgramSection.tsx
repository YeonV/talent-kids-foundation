'use client';


import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  Grid,
  useTheme,
  Button
} from '@mui/material';
import { FaTruck, FaUserNinja, FaTrophy, FaArrowRight } from 'react-icons/fa';
import { steps } from '@/data/content';

const iconMap: Record<string, React.ReactNode> = {
  truck: <FaTruck />,
  ninja: <FaUserNinja />,
  trophy: <FaTrophy />,
};

const ProgramSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 15 }, 
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decoration (Subtle Grid) */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          opacity: 0.4,
          backgroundImage: `radial-gradient(${theme.palette.divider} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          zIndex: 0
        }} 
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        
        {/* --- HEADER --- */}
        <Grid container spacing={4} alignItems="flex-end" sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography 
              variant="overline" 
              color="primary" 
              fontWeight={800} 
              letterSpacing={1.2}
            >
              UNSER KONZEPT
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, fontWeight: 800, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
              Der <span style={{ color: theme.palette.primary.main }}>6-Wochen</span> Weg.
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mt: 2, maxWidth: '90%', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
              Vom ersten Purzelbaum bis zum ersten Gürtel. <br/>
              Wir machen den Einstieg in den Sport so einfach wie möglich.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
             <Button 
                variant="outlined" 
                size="large" 
                color="inherit"
                endIcon={<FaArrowRight />}
                href="mailto:info@talentkidsfoundation.com?subject=Anfrage%20Schulprojekt&body=Hallo%20Team,%20wir%20interessieren%20uns%20f%C3%BCr..."
                sx={{ borderWidth: 2 }}
                >
                Für Schulen anfragen
            </Button>
          </Grid>
        </Grid>

        {/* --- STEPS GRID --- */}
        <Grid container spacing={4}>
          {steps.map((step) => (
            <Grid size={{ xs: 12, md: 4 }} key={step.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  p: 4,
                  bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 4,
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.shadows[10],
                    borderColor: 'primary.main',
                  }
                }}
              >
                {/* Step Number Background */}
                <Typography
                  variant="h1"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 20,
                    fontSize: '6rem',
                    fontWeight: 900,
                    color: theme.palette.text.primary,
                    opacity: 0.05,
                    lineHeight: 1,
                    pointerEvents: 'none'
                  }}
                >
                  {step.id}
                </Typography>

                {/* Icon */}
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: 2, 
                    bgcolor: 'primary.main', 
                    color: '#fff',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    mb: 3,
                    boxShadow: '0 8px 20px rgba(255, 127, 50, 0.3)'
                  }}
                >
                  {iconMap[step.iconKey]}
                </Box>

                <Typography variant="h4" gutterBottom fontWeight={700}>
                  {step.title}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                  {step.text}
                </Typography>

                {/* Highlight Badge */}
                <Box 
                  sx={{ 
                    display: 'inline-block',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'grey.100',
                    color: 'text.primary',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}
                >
                  {step.highlight}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default ProgramSection;