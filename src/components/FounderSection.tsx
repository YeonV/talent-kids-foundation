'use client';

import { useState } from 'react';
import {
    Box, Grid,
    Container,
    Typography,
    Button,
    Stack,
    useTheme,
    Paper,
    Dialog,
    DialogContent,
    IconButton,
    Avatar,
    Chip
} from '@mui/material';
import { FaArrowRight, FaQuoteLeft, FaTimes } from 'react-icons/fa';
import { withBasePath } from '@/lib/basePath';

const FounderSection = () => {
    const theme = useTheme();
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Box
            id="founder"
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
                            {/* <Box
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
                            /> */}

                            {/* Main Image Frame */}
                            <Paper
                                elevation={theme.palette.mode === 'dark' ? 10 : 4}
                                sx={{
                                    position: 'relative',
                                    zIndex: 1,
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    transform: { xs: 'rotate(0deg)', md: 'rotate(-2deg)' }, // Slight artistic tilt on desktop only
                                    transition: 'transform 0.5s ease',
                                    // '&:hover': { transform: 'rotate(0deg)' }
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
                            {/* <Box
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
                            </Box> */}
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
                                <Typography variant="h2" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
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
                                        fontFamily: theme.typography.h1.fontFamily,
                                        fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                                        lineHeight: 1.6,
                                        mb: 2,
                                        color: 'text.primary'
                                    }}
                                >
                                    Ich habe gelernt: Kinder scheitern nicht am Sport. Sie scheitern daran, dass niemand ihnen die Tür öffnet. Genau das werden wir ändern. Kurz gesagt: Wir schenken Kindern Sport.
                                </Typography>
                                <Typography variant="subtitle1" fontWeight={600} sx={{ textAlign: 'right' }}>
                                    Benny Behrla
                                </Typography>
                            </Box>

                            {/* Core Values */}
                            {/* <Box sx={{ mb: 3 }}>
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
                            </Box> */}

                            {/* The Story Text (Shortened) */}
                            {/* <Typography variant="body1" color="text.secondary" paragraph>
                                Was 2023 als Pilotprojekt &quot;JUDO FÜR ALLE&quot; an Kölner Schulen begann, ist heute eine Mission.
                                Sport ist für mich mehr als Bewegung – es ist eine Schule für das Leben.
                                Mit der Talent Kids Foundation geben wir das weiter, was der Sport mir gegeben hat:
                                Disziplin, Gemeinschaft und den Glauben an die eigene Stärke.
                            </Typography> */}

                            <Box pt={2}>
                                <Button
                                    variant="text"
                                    color="primary"
                                    endIcon={<FaArrowRight />}
                                    onClick={() => setDialogOpen(true)}
                                    sx={{ p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                                >
                                    Zum Profil von Benny
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>

                </Grid>
            </Container>

            {/* --- PROFILE DIALOG --- */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        width: { xs: '100%', sm: 'auto' },
                        height: { xs: '100%', sm: 'auto' },
                        maxHeight: { xs: '100%', sm: 'calc(100% - 64px)' },
                        margin: { xs: 0, sm: 2 },
                        borderRadius: { xs: 0, sm: 4 }
                    }
                }}
                PaperProps={{
                    sx: { p: 1 }
                }}
            >
                <Box sx={{ position: 'absolute', right: 16, top: 16, zIndex: 10 }}>
                    <IconButton onClick={() => setDialogOpen(false)} sx={{ bgcolor: 'background.paper' }}>
                        <FaTimes />
                    </IconButton>
                </Box>

                <DialogContent sx={{ p: { xs: 2, sm: 4 } }}>
                    <Stack alignItems="center" spacing={3}>

                        {/* Avatar */}
                        <Avatar
                            src={withBasePath("/img/team/BennyBehrla.jpg")}
                            sx={{ 
                                width: 120, 
                                height: 120, 
                                border: `4px solid ${theme.palette.background.paper}`, 
                                boxShadow: theme.shadows[3] 
                            }}
                        />

                        <Box textAlign="center">
                            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
                                Benjamin Behrla
                            </Typography>
                            <Typography variant="subtitle1" color="primary" fontWeight={700}>
                                Gründer & Vorstand
                            </Typography>

                            {/* Tags */}
                            <Stack direction="row" spacing={1} justifyContent="center" mt={2} flexWrap="wrap" useFlexGap>
                                <Chip label="Olympian" size="small" variant="outlined" />
                                <Chip label="Judo" size="small" variant="outlined" />
                                <Chip label="Peking 2008" size="small" variant="outlined" />
                            </Stack>
                        </Box>

                        {/* Bio Text */}
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <FaQuoteLeft
                                style={{
                                    position: 'absolute',
                                    top: -10,
                                    left: 0,
                                    opacity: 0.1,
                                    fontSize: '2rem',
                                    color: theme.palette.text.primary
                                }}
                            />
                            <Typography 
                                variant="body1" 
                                color="text.secondary" 
                                paragraph 
                                sx={{ lineHeight: 1.8, position: 'relative', zIndex: 1 }}
                            >
                                Benny Behrla, ehemaliger Judoka. Zu seinen größten Erfolgen zählen zwei Bronzemedaillen bei den Europameisterschaften (2008 &amp; 2010) sowie die Teilnahme an den Olympischen Spielen 2008 in Peking. 2023 begann er mit dem Konzept &quot;Judo für Alle&quot;. Dort vermittelte er Kindern den Judosport und seine Werte auf spielerische und kindgerechte Weise. Das Pilotprojekt der TALENT KIDS FOUNDATION war geboren und es folgten weitere Sportarten mit deren Ambassadoren.
                            </Typography>
                        </Box>

                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default FounderSection;