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
    Avatar,
    Chip,
    Stack,
    useTheme,
    Grid
} from '@mui/material';
import { FaLinkedin, FaInstagram, FaTimes, FaQuoteLeft } from 'react-icons/fa';
import { TeamMember } from '@/types';
import { teamData } from '@/data/content';
import FallbackProfile from './FallbackProfile';
import { withBasePath } from '@/lib/basePath';

const TeamSection = ({ ...props }) => {
    const theme = useTheme();
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const handleOpen = (member: TeamMember) => setSelectedMember(member);
    const handleClose = () => setSelectedMember(null);

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

                {/* --- HEADER --- */}
                <Box textAlign="center" mb={8}>
                    <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={1.2}>
                        DAS TEAM
                    </Typography>
                    <Typography variant="h2" gutterBottom>
                        Gesichter der <span style={{ color: theme.palette.primary.main }}>Foundation</span>.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                        Ein Mix aus Olympioniken, Pädagogen, Medizinern und Finanzier.<br />
                        Wir vereinen Expertise mit Herzblut.
                    </Typography>
                </Box>

                {/* --- GRID LAYOUT --- */}
                <Grid container spacing={4}>
                    {teamData.map((member) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={member.id}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    bgcolor: 'transparent',
                                    overflow: 'visible' // Allow hover effects to scale out
                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleOpen(member)}
                                    sx={{
                                        borderRadius: 4,
                                        overflow: 'hidden',
                                        group: 'true', // For grouping hover effects
                                        '&:hover .member-image': {
                                            transform: 'scale(1.05)',
                                            filter: 'grayscale(0%)', // Color on hover
                                        },
                                        '&:hover .overlay': {
                                            opacity: 1
                                        }
                                    }}
                                >
                                    {/* Image Container */}
                                    <Box sx={{ position: 'relative', pt: '120%', bgcolor: 'grey.200' }}>
                                        {member.image ? (
                                            <Box
                                                component="img"
                                                className="trainer-image"
                                                src={withBasePath(member.image)}
                                                alt={member.name}
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
                                                <FallbackProfile name={member.name} />
                                            </Box>
                                        )}

                                        {/* Overlay with "Read Bio" */}
                                        <Box
                                            className="overlay"
                                            sx={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '100%',
                                                p: 2,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease',
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Typography variant="body2" color="white" fontWeight={600}>
                                                Profil ansehen
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Text Info */}
                                    <CardContent sx={{ pt: 2, px: 1, textAlign: 'center' }}>
                                        <Typography variant="h6" fontWeight={700}>
                                            {member.name}
                                        </Typography>
                                        <Typography variant="body2" color="primary" fontWeight={600} gutterBottom>
                                            {member.role}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* --- BIO MODAL (DIALOG) --- */}
                <Dialog
                    open={!!selectedMember}
                    onClose={handleClose}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: { borderRadius: 4, p: 1 }
                    }}
                >
                    {selectedMember && (
                        <>
                            <Box sx={{ position: 'absolute', right: 16, top: 16, zIndex: 10 }}>
                                <IconButton onClick={handleClose} sx={{ bgcolor: 'background.paper' }}>
                                    <FaTimes />
                                </IconButton>
                            </Box>

                            <DialogContent sx={{ p: { xs: 2, sm: 4 } }}>
                                <Stack alignItems="center" spacing={3}>

                                    {/* Avatar in Modal */}
                                    <Avatar
                                        src={withBasePath(selectedMember.image || '/Logo.png')}
                                        sx={{ width: 120, height: 120, border: `4px solid ${theme.palette.background.paper}`, boxShadow: theme.shadows[3] }}
                                    />

                                    <Box textAlign="center">
                                        <Typography variant="h4" gutterBottom>
                                            {selectedMember.name}
                                        </Typography>
                                        <Typography variant="subtitle1" color="primary" fontWeight={700}>
                                            {selectedMember.role}
                                        </Typography>

                                        {/* Tags */}
                                        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
                                            {selectedMember.tags?.map(tag => (
                                                <Chip key={tag} label={tag} size="small" variant="outlined" />
                                            ))}
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
                                        <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.8, position: 'relative', zIndex: 1 }}>
                                            {selectedMember.bio}
                                        </Typography>
                                    </Box>

                                    {/* Socials */}
                                    <Stack direction="row" spacing={2}>
                                        <IconButton color="primary"><FaLinkedin /></IconButton>
                                        <IconButton color="primary"><FaInstagram /></IconButton>
                                    </Stack>

                                </Stack>
                            </DialogContent>
                        </>
                    )}
                </Dialog>

            </Container>
        </Box>
    );
};

export default TeamSection;