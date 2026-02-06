'use client';

import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    CardActionArea,
    Dialog,
    DialogContent,
    IconButton,
    Chip,
    Grid,
    useTheme
} from '@mui/material';
import { FaTimes, FaRunning, FaMedal } from 'react-icons/fa';
import { GiKimono, GiRibbonMedal } from 'react-icons/gi'; // Spezifische Sport-Icons
import { Trainer } from '@/types';
import { trainerData } from '@/data/content';
import FallbackProfile from './FallbackProfile';
import { withBasePath } from '@/lib/basePath';

// Helper für Icons je nach Sportart
const getSportIcon = (sport: string) => {
    switch (sport) {
        case 'Judo': return <GiKimono />;
        case 'Gymnastik': return <GiRibbonMedal />;
        default: return <FaRunning />;
    }
};

const TrainersSection = () => {
    const theme = useTheme();
    const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12 },
                bgcolor: 'background.paper' // Abwechslung zum grauen Hintergrund der Team-Section
            }}
        >
            <Container maxWidth="lg">

                {/* --- HEADER --- */}
                <Box mb={8}>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={1.2}>
                                COACHES & VORBILDER
                            </Typography>
                            <Typography variant="h2" gutterBottom>
                                Unsere <span style={{ color: theme.palette.primary.main }}>Trainer:innen</span>.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" maxWidth={600}>
                                Keine Theoretiker, sondern Macher. Unsere Coaches sind aktive oder ehemalige
                                Wettkampfathleten, die wissen, wovon sie sprechen.
                            </Typography>
                        </Grid>
                        {/* Optional: Statistik oder Badge rechts */}
                        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                            <Chip
                                icon={<FaMedal />}
                                label="Zertifizierte Ausbildung"
                                color="secondary"
                                variant="outlined"
                                sx={{ py: 3, px: 1, borderRadius: 4, fontWeight: 700 }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* --- TRAINER GRID --- */}
                <Grid container spacing={3}>
                    {trainerData.map((trainer) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={trainer.id}>
                            {/* lg: 2.4 sorgt für 5 Spalten in einer Reihe bei großen Screens! */}

                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    bgcolor: 'transparent',
                                    overflow: 'visible'
                                }}
                            >
                                <CardActionArea
                                    onClick={() => setSelectedTrainer(trainer)}
                                    sx={{
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': { transform: 'translateY(-8px)' },
                                        '&:hover .trainer-image': { filter: 'grayscale(0%)' },
                                    }}
                                >
                                    {/* Image & Sport Badge */}
                                    <Box sx={{ position: 'relative', pt: '130%', bgcolor: 'grey.300' }}>
                                        {trainer.image ? (
                                            <Box
                                                component="img"
                                                className="trainer-image"
                                                src={withBasePath(trainer.image)}
                                                alt={trainer.name}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    filter: 'grayscale(100%)',
                                                    transition: 'filter 0.4s ease',
                                                }}
                                            />
                                        ) : (
                                            // RENDER FALLBACK IF NO IMAGE
                                            <Box
                                                className="trainer-image" // Keep class for hover effects
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    filter: 'grayscale(100%)', // Optional: Keep B&W effect
                                                    transition: 'filter 0.4s ease',
                                                }}
                                            >
                                                <FallbackProfile name={trainer.name} />
                                            </Box>
                                        )}

                                        {/* Sport Icon Badge (oben rechts) */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                bgcolor: 'background.paper',
                                                color: 'primary.main',
                                                width: 36,
                                                height: 36,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.2rem',
                                                boxShadow: theme.shadows[2]
                                            }}
                                        >
                                            {getSportIcon(trainer.sport)}
                                        </Box>
                                    </Box>

                                    {/* Info Condensed */}
                                    <CardContent sx={{ p: 2, textAlign: 'left' }}>
                                        <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2} mb={0.5}>
                                            {trainer.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            {trainer.role}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* --- MODAL --- */}
                <Dialog
                    open={!!selectedTrainer}
                    onClose={() => setSelectedTrainer(null)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{ sx: { borderRadius: 4 } }}
                >
                    {selectedTrainer && (
                        <>
                            <Box sx={{ position: 'relative', height: 200 }}>
                                <Box
                                    component="img"
                                    src={withBasePath(selectedTrainer.image || '/Logo.jpg')}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <IconButton
                                    onClick={() => setSelectedTrainer(null)}
                                    sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'black' } }}
                                >
                                    <FaTimes />
                                </IconButton>
                            </Box>

                            <DialogContent sx={{ p: 4 }}>
                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <Chip label={selectedTrainer.sport} color="primary" size="small" />
                                    {selectedTrainer.tags.map(tag => (
                                        <Chip key={tag} label={tag} variant="outlined" size="small" />
                                    ))}
                                </Box>

                                <Typography variant="h4" gutterBottom fontWeight={700}>
                                    {selectedTrainer.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                                    {selectedTrainer.role}
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    {selectedTrainer.bio}
                                </Typography>
                            </DialogContent>
                        </>
                    )}
                </Dialog>

            </Container>
        </Box>
    );
};

export default TrainersSection;