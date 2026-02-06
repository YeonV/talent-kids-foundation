'use client';

import { Box, Container, Typography, Grid, useTheme, alpha, Chip } from '@mui/material';
import { FaStar } from 'react-icons/fa';
import { withBasePath } from '@/lib/basePath';

const SuccessStorySection = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${theme.palette.background.default} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          
          {/* LEFT: Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: 2,
                  display: 'block',
                  mb: 2
                }}
              >
                EINE ERFOLGSGESCHICHTE
              </Typography>
              
              <Typography variant="h2" fontWeight={800} gutterBottom sx={{ mb: 3 }}>
                Ein erster Griff – <br />
                <Box component="span" sx={{ color: 'primary.main' }}>
                  und alles verändert sich.
                </Box>
              </Typography>

              <Box
                sx={{
                  mb: 4,
                  pl: 3,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  py: 2
                }}
              >
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ lineHeight: 1.4 }}>
                  Anna-Maria Wagner.
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                  Eine Schul-AG. <br />
                  Ein erstes Training im Judo. <br />
                  Ein Moment, der alles verändert hat.
                </Typography>
              </Box>

              <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 3 }}>
                Heute ist sie <strong>Weltmeisterin und Olympiamedaillengewinnerin</strong> –
                doch angefangen hat es mit einem ganz normalen Schultag.
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Mit einer Chance. <br />
                Mit dem ersten Schritt.
              </Typography>

              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  borderRadius: 3,
                  borderLeft: `3px solid ${theme.palette.primary.main}`
                }}
              >
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Genau solche Momente will die Talent Kids Foundation schaffen –
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  für jedes Kind, in jeder Sportart.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT: Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: theme.shadows[10],
                transform: 'rotate(2deg)',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'rotate(0deg) scale(1.02)'
                }
              }}
            >
              <Box
                component="img"
                src={withBasePath("img/ambassadors/anna-maria-wagner/13.jpg")}
                alt="Anna-Maria Wagner - Success Story"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'contrast(105%) brightness(102%)'
                }}
              />
              
              {/* Overlay Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: 20,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  py: 2,
                  px: 3,
                  borderRadius: 2,
                  boxShadow: theme.shadows[8],
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5
                }}
              >
                <FaStar size={24} color={theme.palette.primary.main} />
                <Box>
                  <Typography variant="subtitle2" fontWeight={800} sx={{ lineHeight: 1.2 }}>
                    Anna-Maria Wagner
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Weltmeisterin • Olympia Silber & Bronze
                  </Typography>
                </Box>
              </Box>

              {/* Achievement Chips */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Chip
                  label="Weltmeisterin"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Chip
                  label="Olympia 🥈🥉"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    fontWeight: 700,
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default SuccessStorySection;
