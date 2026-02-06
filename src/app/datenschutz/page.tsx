import { Container, Typography, Box, Paper } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Datenschutz() {
  return (
    <main>
      <Navbar />
      <Box sx={{ pt: 15, pb: 10, minHeight: '80vh', bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Paper sx={{ p: { xs: 4, md: 8 }, borderRadius: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
              Datenschutzerklärung
            </Typography>
            <Typography variant="body1" paragraph mt={4}>
              [Hier muss der Datenschutz-Text vom Generator (z.B. e-recht24.de) eingefügt werden.]
            </Typography>
            <Typography variant="body1">
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst...
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </main>
  );
}