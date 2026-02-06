'use client';

import { ecosystem, partners } from '@/data/content';
import { withBasePath } from '@/lib/basePath';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    useTheme,
    Divider,
    Grid,
    alpha
} from '@mui/material';
import { FaBuilding, FaUsers, FaGraduationCap, FaHandshake } from 'react-icons/fa';

// --- DATA: DAS ÖKOSYSTEM ---
const iconMap: Record<string, React.ReactNode> = {
    building: <FaBuilding />,
    users: <FaUsers />,
    graduation: <FaGraduationCap />,
};

const NetworkSection = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12 },
                bgcolor: 'background.default',
                position: 'relative'
            }}
        >
            <Container maxWidth="lg">

                {/* --- TEIL 1: DAS ÖKOSYSTEM --- */}
                <Box mb={10}>
                    <Typography
                        variant="overline"
                        color="primary"
                        fontWeight={800}
                        letterSpacing={1.2}
                        display="block"
                        mb={2}
                        textAlign="center"
                    >
                        TRANSPARENZ & STRUKTUR
                    </Typography>
                    <Typography variant="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
                        Ein starkes <span style={{ color: theme.palette.primary.main }}>Netzwerk</span>.
                    </Typography>

                    <Grid container spacing={4}>
                        {ecosystem.map((item, index) => (
                            <Grid size={{ xs: 12, md: 4 }} key={index}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column', // Damit das Logo nach unten rutschen kann
                                        bgcolor: isDark ? alpha(theme.palette.primary.main, 0.05) : '#fff',
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 4,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: 'primary.main',
                                            transform: 'translateY(-5px)'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 4, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>

                                        {/* 1. ICON OBEN (Konsistent mit Mission) */}
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                alignSelf: 'center',
                                                p: 2,
                                                borderRadius: '50%',
                                                bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'grey.100',
                                                color: 'primary.main',
                                                fontSize: '1.8rem',
                                                mb: 3
                                            }}
                                        >
                                            {iconMap[item.iconKey] || <FaUsers />}
                                        </Box>

                                        {/* 2. TEXT INHALT */}
                                        <Typography variant="h6" fontWeight={700} gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="caption" color="primary" fontWeight={700} display="block" mb={2} textTransform="uppercase">
                                            {item.role}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                            {item.desc}
                                        </Typography>

                                        {/* Spacer drückt Logo nach unten */}
                                        <Box sx={{ flexGrow: 1 }} />

                                        {/* 3. ECHTES LOGO UNTEN (Wenn vorhanden) */}
                                        {item.logo && (
                                            <Box
                                                sx={{
                                                    mt: 2,
                                                    pt: 3,
                                                    borderTop: `1px dashed ${theme.palette.divider}`,
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundImage: `url(${withBasePath(item.logo)})`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'center',
                                                        backgroundSize: '100%',
                                                        width: '100%',
                                                        height: 150, // Dezentere Höhe
                                                        '@media (max-width: 900px)': {
                                                            height: 200,
                                                            backgroundSize: '50%',
                                                        },
                                                        maxWidth: '100%',
                                                        objectFit: 'contain',
                                                        opacity: 0.8,
                                                        filter: isDark ? 'brightness(0.9)' : 'none', // Leichte Anpassung für Darkmode
                                                        transition: 'opacity 0.3s',
                                                        '&:hover': { opacity: 1 }
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ mb: 10, opacity: 0.5 }} />

                {/* --- TEIL 2: PARTNER & SPONSOREN --- */}
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h4" gutterBottom fontWeight={700}>
                            Unsere Partner
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Große Ziele erreicht man nicht allein. Wir danken unseren Unterstützern, die den Sport zu den Kindern bringen.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<FaHandshake />}
                            href="mailto:info@talentkidsfoundation.com?subject=Partnerschaft%20Anfrage"
                            sx={{ mt: 1 }}
                        >
                            Partner werden
                        </Button>
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <Grid container spacing={4} justifyContent="center" alignItems="center">
                            {partners.map((partner, i) => (
                                <Grid size={{ xs: 6, sm: 3 }} key={i}>
                                    <Box
                                        sx={{
                                            height: 80,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            opacity: 0.4, // Standardmäßig stark ausgeblendet -> wirkt edel
                                            transition: 'all 0.4s ease',
                                            cursor: 'default',
                                            '&:hover': {
                                                opacity: 1,
                                                transform: 'scale(1.05)'
                                            }
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight={900}
                                            sx={{
                                                color: partner.color, // Farbe kommt erst beim Hover durch opacity change zur Geltung
                                                textTransform: 'uppercase',
                                                textAlign: 'center',
                                                letterSpacing: 1 // Hinzufügen für Look
                                            }}
                                        >
                                            {partner.name}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default NetworkSection;