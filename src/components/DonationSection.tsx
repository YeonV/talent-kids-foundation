'use client';

import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Tabs,
    Tab,
    Button,
    Stack,
    useTheme,
    Slider,
    Chip,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import { FaHeart, FaBuilding, FaCopy, FaCheckCircle, FaHandHoldingHeart } from 'react-icons/fa';
import { impactLevels } from '@/data/content';

const DonationSection = ({ ...props }) => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0); // 0 = Privat, 1 = Firma
    const [amount, setAmount] = useState<number>(50); // Default 50€
    const [copied, setCopied] = useState(false);

    // Bankdaten (Platzhalter)
    const iban = "DE12 3456 7890 1234 5678 90";

    const handleCopy = () => {
        navigator.clipboard.writeText(iban);
        setCopied(true);
    };

    // Finde den passenden Impact-Text zum Betrag (ungefähr)
    const currentImpact = impactLevels.reduce((prev, curr) => {
        return (Math.abs(curr.value - amount) < Math.abs(prev.value - amount) ? curr : prev);
    });

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 12 },
                bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#FDFBF7', // Warmes Weiß im Light Mode
                position: 'relative'
            }}
            {...props}
        >
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">

                    {/* --- LEFT: EMOTION & ARGUMENTE --- */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                <FaHandHoldingHeart color={theme.palette.primary.main} size={20} />
                                <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={1}>
                                    MITMACHEN
                                </Typography>
                            </Box>

                            <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
                                Investiere in <br />
                                <span style={{ color: theme.palette.primary.main }}>echte Zukunft.</span>
                            </Typography>

                            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
                                Die Talent Kids Foundation finanziert sich zu 100% aus Spenden.
                                Wir sorgen dafür, dass jeder Euro dort ankommt, wo er gebraucht wird:
                                Auf der Matte, bei den Kindern.
                            </Typography>

                            {/* USP Liste */}
                            <Stack spacing={2} sx={{ mb: 4 }}>
                                {[
                                    'Steuerlich absetzbar (Gemeinnützige gGmbH)',
                                    'Direkte Förderung von sozial benachteiligten Kindern',
                                    'Transparente Mittelverwendung'
                                ].map((item, index) => (
                                    <Box key={index} display="flex" alignItems="center" gap={2}>
                                        <FaCheckCircle color={theme.palette.success.main} />
                                        <Typography variant="body1" fontWeight={500}>{item}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>

                    {/* --- RIGHT: INTERACTIVE DONATION CARD --- */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Paper
                            elevation={theme.palette.mode === 'dark' ? 4 : 12}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                bgcolor: 'background.paper',
                                border: `1px solid ${theme.palette.divider}`,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Header Tabs */}
                            <Tabs
                                value={tabValue}
                                onChange={(e, v) => setTabValue(v)}
                                variant="fullWidth"
                                sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
                            >
                                <Tab icon={<FaHeart />} label="Privat" iconPosition="start" />
                                <Tab icon={<FaBuilding />} label="Unternehmen" iconPosition="start" />
                            </Tabs>

                            {/* Interactive Slider Area */}
                            <Box textAlign="center" mb={4}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Ich möchte spenden:
                                </Typography>
                                <Typography variant="h2" color="primary" fontWeight={800} sx={{ my: 1 }}>
                                    {amount} €
                                </Typography>

                                <Slider
                                    value={amount}
                                    min={10}
                                    max={200}
                                    step={5}
                                    onChange={(e, v) => setAmount(v as number)}
                                    sx={{ color: 'primary.main', height: 8 }}
                                />

                                <Box display="flex" justifyContent="center" gap={1} mt={2} flexWrap="wrap">
                                    {impactLevels.slice(0, 3).map((level) => (
                                        <Chip
                                            key={level.value}
                                            label={`${level.value}€`}
                                            onClick={() => setAmount(level.value)}
                                            variant={amount === level.value ? 'filled' : 'outlined'}
                                            color="primary"
                                            clickable
                                        />
                                    ))}
                                </Box>
                            </Box>

                            {/* The "Impact" Feedback */}
                            <Alert
                                severity="info"
                                icon={false}
                                sx={{
                                    mb: 4,
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,127,50,0.1)' : 'rgba(255,127,50,0.05)',
                                    color: 'text.primary',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    opacity: 0.8
                                }}
                            >
                                <Typography variant="subtitle2" fontWeight={700} color="primary" gutterBottom>
                                    Dein Impact: {currentImpact.label}
                                </Typography>
                                <Typography variant="body2">
                                    {currentImpact.text}
                                </Typography>
                            </Alert>

                            {/* Action Buttons */}
                            <Stack spacing={2}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    onClick={() => window.open('https://www.paypal.com/donate/?hosted_button_id=YOUR_PAYPAL_ID', '_blank')}
                                    sx={{
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        boxShadow: `0 8px 20px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : `rgba(${parseInt(theme.palette.primary.main.slice(1,3), 16)}, ${parseInt(theme.palette.primary.main.slice(3,5), 16)}, ${parseInt(theme.palette.primary.main.slice(5,7), 16)}, 0.4)`}`
                                    }}
                                >
                                    Jetzt Spenden (PayPal / Karte)
                                </Button>

                                {/* Bank Transfer Accordion / Simple View */}
                                <Box
                                    sx={{
                                        p: 2,
                                        border: '1px dashed',
                                        borderColor: 'text.disabled',
                                        borderRadius: 2,
                                        textAlign: 'center'
                                    }}
                                >
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        Oder per Überweisung an:
                                    </Typography>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        gap={1}
                                        mt={0.5}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={handleCopy}
                                    >
                                        <Typography variant="body2" fontWeight={600}>
                                            {iban}
                                        </Typography>
                                        <IconButton size="small">
                                            {copied ? <FaCheckCircle color="green" /> : <FaCopy size={14} />}
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Stack>

                        </Paper>
                    </Grid>

                </Grid>
            </Container>

            {/* Copied Snackbar */}
            <Snackbar
                open={copied}
                autoHideDuration={2000}
                onClose={() => setCopied(false)}
                message="IBAN kopiert!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default DonationSection;