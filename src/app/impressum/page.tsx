import { Container, Typography, Box, Paper } from '@mui/material';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Impressum() {
  return (
    <main>
      <Navbar />
      <Box sx={{ pt: 15, pb: 10, minHeight: '80vh', bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Paper sx={{ p: { xs: 4, md: 8 }, borderRadius: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
              Impressum
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
              <Box>
                <Typography variant="h6" gutterBottom>Angaben gemäß § 5 TMG</Typography>
                <Typography variant="body1">
                  <strong>EduProSports gGmbH</strong><br />
                  Friedrich Schmidt Str. 6<br />
                  50931 Köln
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>Vertreten durch:</Typography>
                <Typography variant="body1">
                  Benjamin Behrla (Geschäftsführer)
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>Kontakt</Typography>
                <Typography variant="body1">
                  Telefon: +49 172 7512087<br />
                  E-Mail: info@talentkidsfoundation.com
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>Registereintrag</Typography>
                <Typography variant="body1">
                  Eintragung im Handelsregister.<br />
                  Registergericht: Amtsgericht Köln<br />
                  Registernummer: HRB [Nummer einfügen]
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</Typography>
                <Typography variant="body1">
                  Benjamin Behrla<br />
                  Friedrich Schmidt Str. 6<br />
                  50931 Köln
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </main>
  );
}