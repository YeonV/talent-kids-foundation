'use client';

import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Stack,
  useTheme 
} from '@mui/material';
import { FaChild, FaHandHoldingHeart, FaMedal } from 'react-icons/fa';
import { missionItems } from '@/data/content';

const iconMap: Record<string, React.ReactNode> = {
  child: <FaChild />,
  heart: <FaHandHoldingHeart />,
  medal: <FaMedal />,
};

const MissionSection = ({...props}) => {
  const theme = useTheme();

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 12 }, 
        bgcolor: 'background.default' 
      }}
      {...props}
    >
      <Container maxWidth="lg">
        
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 800, mx: 'auto' }}>
          <Typography 
            variant="overline" 
            color="primary" 
            fontWeight={700}
            letterSpacing={1.5}
            display="block"
            mb={1}
          >
            UNSERE MISSION
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ mb: 2, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
            Wir machen den ersten Schritt zusammen.
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3, fontWeight: 500, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Mehr als nur Bewegung.
          </Typography>
          <Typography variant="body1" color="text.secondary" fontSize={{ xs: '1rem', md: '1.1rem' }} sx={{ mb: 2 }}>
            Wir glauben, dass jedes Kind das Recht hat, sich zu bewegen, Neues zu probieren und seine Leidenschaft zu finden.
          </Typography>
          <Typography variant="body1" color="text.secondary" fontSize={{ xs: '1rem', md: '1.1rem' }}>
            Die Talent Kids Foundation schließt die Lücke zwischen Schulsport und Vereinsleben. 
            Wir holen die Kinder dort ab, wo sie sind.
          </Typography>
        </Box>

        {/* The 3 Pillars Grid */}
        <Grid container spacing={4}>
          {missionItems.map((pillar, index) => (
            <Grid size={{ xs: 12, md: 4}} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  // Modern Card Styling
                  bgcolor: 'background.paper',
                  transition: 'all 0.3s ease-in-out',
                  border: `1px solid ${theme.palette.divider}`,
                  // Hover Effect: Lift up + Shadow + Border Color
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[10],
                    borderColor: 'primary.main',
                    '& .icon-box': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      transform: 'scale(1.1) rotate(-5deg)'
                    }
                  }
                }}
                elevation={0} // Flat by default, shadow on hover
              >
                <CardContent sx={{ p: 4, textAlign: 'center', flexGrow: 1 }}>
                  {/* Icon Circle */}
                  <Stack 
                    className="icon-box"
                    alignItems="center" 
                    justifyContent="center"
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%', 
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'primary.light', // Subtle background
                      color: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.dark',
                      fontSize: '2rem',
                      mx: 'auto',
                      mb: 3,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {iconMap[pillar.iconKey] || <FaChild />} 
                  </Stack>

                  <Typography variant="h4" component="h3" gutterBottom sx={{ mb: 2 }}>
                    {pillar.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary">
                    {pillar.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Closing Statement */}
        <Box sx={{ textAlign: 'center', mt: 8, maxWidth: 700, mx: 'auto' }}>
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: 'primary.main' }}>
            Unser Ziel:
          </Typography>
          <Typography variant="body1" color="text.secondary" fontSize="1.1rem">
            Kinder sollen Sport nicht nur als immer wiederkehrendes Schulfach kennenlernen, 
            sondern als möglichen lebensverändernden Moment.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MissionSection;