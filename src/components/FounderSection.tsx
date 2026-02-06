'use client';

import {
    Box, Grid,
    Container,
    Typography,
    Button,
    Stack,
    useTheme,
    Paper
} from '@mui/material';
import { FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { withBasePath } from '@/lib/basePath';

const FounderSection = () => {
    const theme = useTheme();

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12 },
                // A subtle gradient background to separate it from the previous white section
                background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #13181F 0%, #1A2332 100%)'
                    : 'linear-gradient(135deg, #FDFBF7 0%, #F4F6F8 100%)',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">

                    {/* --- LEFT: IMAGE COMPOSITION --- */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ position: 'relative' }}>
                            {/* Decorative Background blob/shape */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -20,
                                    left: -20,
                                    width: '80%',
                                    height: '100%',
                                    bgcolor: 'primary.main',
                                    opacity: 0.1,
                                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', // Organic blob shape
                                    zIndex: 0,
                                    transform: 'rotate(-5deg)'
                                }}
                            />

                            {/* Main Image Frame */}
                            <Paper
                                elevation={theme.palette.mode === 'dark' ? 10 : 4}
                                sx={{
                                    position: 'relative',
                                    zIndex: 1,
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    transform: 'rotate(-2deg)', // Slight artistic tilt
                                    transition: 'transform 0.5s ease',
                                    '&:hover': { transform: 'rotate(0deg)' }
                                }}
                            >
                                {/* 
                  PLACEHOLDER IMAGE:
                  Ideally, this should be a high-quality photo of Benny Behrla.
                  Using a generic "Judo Coach/Athlete" placeholder for now.
                */}
                                <Box
                                    component="img"
                                    src={withBasePath("/img/team/BennyBehrla.jpg")}
                                    alt="Benjamin Behrla - Founder"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        filter: 'grayscale(20%) contrast(110%)' // Subtle artistic filter
                                    }}
                                />
                            </Paper>

                            {/* "Olympian" Badge Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 30,
                                    right: -20,
                                    zIndex: 2,
                                    bgcolor: 'background.paper',
                                    py: 1.5,
                                    px: 3,
                                    borderRadius: 2,
                                    boxShadow: theme.shadows[4],
                                    borderLeft: `4px solid ${theme.palette.primary.main}`
                                }}
                            >
                                <Typography variant="subtitle2" fontWeight={800} letterSpacing={1}>
                                    OLYMPIA 2008
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Beijing • Judo
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* --- RIGHT: TEXT CONTENT --- */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={4}>
                            <Box>
                                <Typography
                                    variant="overline"
                                    color="primary"
                                    fontWeight={700}
                                >
                                    DER GRÜNDER
                                </Typography>
                                <Typography variant="h2" gutterBottom>
                                    Von der Matte <br />
                                    <Box component="span" sx={{ color: 'primary.main' }}>ins Leben.</Box>
                                </Typography>
                            </Box>

                            {/* The Quote */}
                            <Box sx={{ position: 'relative', pl: 4 }}>
                                <FaQuoteLeft
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        color: theme.palette.primary.main,
                                        opacity: 0.3,
                                        fontSize: '2rem'
                                    }}
                                />
                                <Typography
                                    variant="h5"
                                    component="p"
                                    sx={{
                                        fontStyle: 'italic',
                                        fontFamily: theme.typography.h1.fontFamily, // Uses Playfair in Classic, Montserrat in Modern
                                        lineHeight: 1.6,
                                        mb: 2,
                                        color: 'text.primary'
                                    }}
                                >
                                    Ich möchte möglichst vielen Kindern Zugang zu olympischen und paralympischen Sportarten verschaffen, die ihnen sonst vielleicht verschlossen bleiben würden. Dabei Talente zu finden und zu fördern ist mir eine Herzensangelegenheit.
                                </Typography>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    — Benjamin Behrla (Benny)
                                </Typography>
                            </Box>

                            {/* Core Values */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" fontWeight={700} color="text.secondary" gutterBottom>
                                    Seine Werte – unser Fundament:
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {['Respekt', 'Freundschaft', 'Einsatzbereitschaft', 'Ehrlichkeit', 'Spaß'].map((value) => (
                                        <Box
                                            key={value}
                                            sx={{
                                                px: 2,
                                                py: 0.5,
                                                bgcolor: 'primary.main',
                                                color: 'primary.contrastText',
                                                borderRadius: 2,
                                                fontWeight: 700,
                                                fontSize: '0.875rem',
                                                display: 'inline-block',
                                                mb: 1
                                            }}
                                        >
                                            {value}
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>

                            {/* The Story Text (Shortened) */}
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Was 2023 als Pilotprojekt &quot;JUDO FÜR ALLE&quot; an Kölner Schulen begann, ist heute eine Mission.
                                Sport ist für mich mehr als Bewegung – es ist eine Schule für das Leben.
                                Mit der Talent Kids Foundation geben wir das weiter, was der Sport mir gegeben hat:
                                Disziplin, Gemeinschaft und den Glauben an die eigene Stärke.
                            </Typography>

                            <Box pt={2}>
                                <Button
                                    variant="text"
                                    color="primary"
                                    endIcon={<FaArrowRight />}
                                    onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                                    sx={{ p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                                >
                                    Zum Profil von Benny
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default FounderSection;