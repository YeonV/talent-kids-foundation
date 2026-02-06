'use client';

import { Box, Container, Typography, Button, Stack, useTheme, alpha } from '@mui/material';
import { FaHeart, FaArrowRight } from 'react-icons/fa';
import { withBasePath } from '@/lib/basePath';

interface HeroProps {
    title?: string;
    subtitle?: string;
    videoUrl?: string; // Optional: Local path like '/videos/hero.mp4'
    imageUrl?: string; // Fallback image
}

const Hero = ({
    // title = "Wir machen Kinder stark.",
    title = "Der erste Schritt zählt.",
    // subtitle = "Zugang zu Sport, Wertevermittlung und Talentförderung für jedes Kind – unabhängig von der Herkunft.",
    subtitle = "Alles im Leben beginnt mit einem ersten Schritt. Wir räumen Hindernisse aus dem Weg, damit alle Kinder Sport erleben können – mit Freude, Neugier und einem Lächeln.",
    videoUrl, // If you have a .mp4 later, pass it here
    imageUrl = "/img/hero/Hero.png" // A placeholder Judo/Sport image
}: HeroProps) => {
    const theme = useTheme();
    const resolvedImageUrl = withBasePath(imageUrl);

    return (
        <Box
            sx={{
                position: 'relative',
                height: '90vh', // Nearly full screen
                minHeight: '600px',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
            }}
        >
            {/* --- 1. MEDIA BACKGROUND --- */}
            {/* If videoUrl is provided, show video, otherwise show image */}
            {videoUrl ? (
                <Box
                    component="video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                    }}
                >
                    <source src={videoUrl} type="video/mp4" />
                </Box>
            ) : (
                <Box
                    component="img"
                    src={resolvedImageUrl}
                    alt="Hero Background"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        // Slight zoom effect animation
                        animation: 'kenburns 20s infinite alternate',
                        '@keyframes kenburns': {
                            '0%': { transform: 'scale(1)' },
                            '100%': { transform: 'scale(1.1)' },
                        }
                    }}
                />
            )}

            {/* --- 2. DARK OVERLAY --- */}
            {/* Essential for text readability */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: alpha('#000', 0.5), // 50% Black overlay
                    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
                    zIndex: 1,
                }}
            />

            {/* --- 3. CONTENT --- */}
            <Container
                maxWidth="md"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    animation: 'fadeInUp 1s ease-out',
                    '@keyframes fadeInUp': {
                        '0%': { opacity: 0, transform: 'translateY(20px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' },
                    }
                }}
            >
                {/* Small Badge */}
                <Typography
                    variant="subtitle2"
                    sx={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        mb: 2,
                        fontWeight: 700,
                        color: theme.palette.primary.main // Orange accent
                    }}
                >
                    Talent Kids Foundation
                </Typography>

                {/* Main Headline */}
                <Typography
                    variant="h1"
                    sx={{
                        mb: 3,
                        fontSize: { xs: '2.5rem', md: '4.5rem' }, // Responsive font size
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    {title}
                </Typography>

                {/* Subtitle */}
                <Typography
                    variant="h5"
                    sx={{
                        mb: 5,
                        maxWidth: '800px',
                        mx: 'auto',
                        lineHeight: 1.6,
                        opacity: 0.9,
                        fontSize: { xs: '1rem', md: '1.25rem' }
                    }}
                >
                    {subtitle}
                </Typography>

                {/* Action Buttons */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<FaHeart />}
                        onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
                        sx={{ px: 4, py: 1.5 }}
                    >
                        Jetzt Helfen
                    </Button>

                    <Button
                        variant="outlined"
                        color="inherit"
                        size="large"
                        endIcon={<FaArrowRight />}
                        onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
                        sx={{ px: 4, py: 1.5, borderColor: 'rgba(255,255,255,0.5)' }}
                    >
                        Mehr Erfahren
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default Hero;