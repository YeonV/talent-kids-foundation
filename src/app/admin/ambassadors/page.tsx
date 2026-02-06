'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Chip,
  Alert,
  Snackbar
} from '@mui/material';
import { FaEdit, FaTrash, FaPlus, FaSave, FaGithub, FaCopy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ambassadorsData from '@/data/ambassadors.json';
import { withBasePath } from '@/lib/basePath';

interface Ambassador {
  id: string;
  name: string;
  sport: string;
  specialization?: string;
  images: string[];
  profession?: string;
  birthDate?: string;
  birthYear?: string;
  city?: string;
  height?: string;
  social?: {
    instagram?: string;
  };
  website?: string;
  email?: string;
  achievements: string[];
  bio?: string;
  family?: string;
  hobbies?: string[];
  beliefs?: string;
  relationship?: string;
  status?: string;
  current?: string;
  partner?: string;
  age?: string;
  disability?: string;
  nickname?: string;
  birthPlace?: string;
}

const emptyAmbassador: Ambassador = {
  id: '',
  name: '',
  sport: '',
  images: ['/img/ambassadors/placeholder.jpg'],
  achievements: []
};

function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <Box
        sx={{
          height: 250,
          backgroundImage: `url(${withBasePath(images[0])})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      />
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        height: 250,
        backgroundImage: `url(${withBasePath(images[currentIndex])})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      <IconButton
        size="small"
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
        }}
      >
        <FaChevronLeft />
      </IconButton>
      <IconButton
        size="small"
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
          color: '#fff',
          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' }
        }}
      >
        <FaChevronRight />
      </IconButton>
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 0.5
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: index === currentIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default function AmbassadorEditor() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>(ambassadorsData as Ambassador[]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentAmbassador, setCurrentAmbassador] = useState<Ambassador | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isCreatingPR, setIsCreatingPR] = useState(false);

  const handleEdit = (ambassador: Ambassador) => {
    setCurrentAmbassador({ ...ambassador });
    setEditDialogOpen(true);
  };

  const handleAdd = () => {
    setCurrentAmbassador({ ...emptyAmbassador });
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Do you really want to delete this ambassador?')) {
      setAmbassadors(ambassadors.filter(a => a.id !== id));
      setSnackbarMessage('Ambassador deleted');
      setSnackbarOpen(true);
    }
  };

  const handleSave = () => {
    if (!currentAmbassador) return;

    if (!currentAmbassador.id || !currentAmbassador.name) {
      alert('ID and Name are required!');
      return;
    }

    const index = ambassadors.findIndex(a => a.id === currentAmbassador.id);
    if (index >= 0) {
      // Update existing
      const updated = [...ambassadors];
      updated[index] = currentAmbassador;
      setAmbassadors(updated);
      setSnackbarMessage('Ambassador updated');
    } else {
      // Add new
      setAmbassadors([...ambassadors, currentAmbassador]);
      setSnackbarMessage('Ambassador added');
    }
    
    setEditDialogOpen(false);
    setSnackbarOpen(true);
  };

  const handleCreatePR = async () => {
    setIsCreatingPR(true);
    
    // Copy JSON to clipboard
    const jsonContent = JSON.stringify(ambassadors, null, 2);
    navigator.clipboard.writeText(jsonContent);
    
    // Open GitHub to create a new branch and PR
    const repoOwner = 'YeonV';
    const repoName = 'talent-kids-foundation';
    const filePath = 'src/data/ambassadors.json';
    
    // GitHub's web interface for creating a new branch and editing a file
    const githubUrl = `https://github.com/${repoOwner}/${repoName}/edit/main/${filePath}`;
    
    setSnackbarMessage('JSON copied to clipboard! Opening GitHub...');
    setSnackbarOpen(true);
    
    // Wait a moment then open GitHub
    setTimeout(() => {
      window.open(githubUrl, '_blank');
      setIsCreatingPR(false);
    }, 1000);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(ambassadors, null, 2));
    setSnackbarMessage('JSON copied to clipboard!');
    setSnackbarOpen(true);
  };

  const handleSaveJSON = () => {
    const jsonContent = JSON.stringify(ambassadors, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ambassadors.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSnackbarMessage('JSON file downloaded!');
    setSnackbarOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFieldChange = (field: keyof Ambassador, value: any) => {
    if (!currentAmbassador) return;
    setCurrentAmbassador({ ...currentAmbassador, [field]: value });
  };

  const handleAchievementChange = (index: number, value: string) => {
    if (!currentAmbassador) return;
    const achievements = [...currentAmbassador.achievements];
    achievements[index] = value;
    setCurrentAmbassador({ ...currentAmbassador, achievements });
  };

  const handleAddAchievement = () => {
    if (!currentAmbassador) return;
    setCurrentAmbassador({
      ...currentAmbassador,
      achievements: [...currentAmbassador.achievements, '']
    });
  };

  const handleRemoveAchievement = (index: number) => {
    if (!currentAmbassador) return;
    const achievements = currentAmbassador.achievements.filter((_, i) => i !== index);
    setCurrentAmbassador({ ...currentAmbassador, achievements });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" fontWeight={700}>
          Ambassador Editor
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FaCopy />}
            onClick={handleCopyJSON}
          >
            Copy JSON
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaSave />}
            onClick={handleSaveJSON}
          >
            Save JSON
          </Button>
          <Button
            variant="outlined"
            startIcon={<FaGithub />}
            onClick={handleCreatePR}
            disabled={isCreatingPR}
          >
            {isCreatingPR ? 'Opening GitHub...' : 'Open in GitHub'}
           assador
          </Button>
        </Stack>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Changes are stored in browser. Click &quot;Copy JSON&quot; to copy to clipboard, &quot;Save JSON&quot; to download the file, or &quot;Open in GitHub&quot; to edit directly on GitHub.
      </Alert>

      <Grid container spacing={3}>
        {ambassadors.map((ambassador) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={ambassador.id}>
            <Card>
              <Box sx={{ position: 'relative' }}>
                <ImageSlider images={ambassador.images} />
                <Chip
                  label={ambassador.sport}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    bgcolor: '#1f3a60',
                    color: '#fff'
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {ambassador.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {ambassador.profession}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {ambassador.achievements.length} Erfolge
                </Typography>
                <Stack direction="row" spacing={1} mt={2}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(ambassador)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(ambassador.id)}
                  >
                    <FaTrash />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentAmbassador?.name || 'New Ambassador'}
        </DialogTitle>
        <DialogContent>
          {currentAmbassador && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="ID (URL-freundlich)"
                    value={currentAmbassador.id}
                    onChange={(e) => handleFieldChange('id', e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={currentAmbassador.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Sportart"
                    value={currentAmbassador.sport}
                    onChange={(e) => handleFieldChange('sport', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Spezifikation"
                    value={currentAmbassador.specialization || ''}
                    onChange={(e) => handleFieldChange('specialization', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Bilder
                  </Typography>
                  <Stack spacing={1}>
                    {currentAmbassador.images.map((image, index) => (
                      <Box key={index} display="flex" gap={1}>
                        <TextField
                          fullWidth
                          size="small"
                          value={image}
                          onChange={(e) => {
                            const images = [...currentAmbassador.images];
                            images[index] = e.target.value;
                            handleFieldChange('images', images);
                          }}
                          helperText="z.B. /img/ambassadors/name/1.jpg"
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            const images = currentAmbassador.images.filter((_, i) => i !== index);
                            handleFieldChange('images', images);
                          }}
                        >
                          <FaTrash />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FaPlus />}
                      onClick={() => {
                        handleFieldChange('images', [...currentAmbassador.images, '']);
                      }}
                    >
                      Bild hinzufügen
                    </Button>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Beruf"
                    value={currentAmbassador.profession || ''}
                    onChange={(e) => handleFieldChange('profession', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Stadt"
                    value={currentAmbassador.city || ''}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Größe"
                    value={currentAmbassador.height || ''}
                    onChange={(e) => handleFieldChange('height', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Instagram"
                    value={currentAmbassador.social?.instagram || ''}
                    onChange={(e) => handleFieldChange('social', { instagram: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Website"
                    value={currentAmbassador.website || ''}
                    onChange={(e) => handleFieldChange('website', e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Bio"
                    value={currentAmbassador.bio || ''}
                    onChange={(e) => handleFieldChange('bio', e.target.value)}
                  />
                </Grid>
                
                {/* Achievements */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Erfolge
                  </Typography>
                  <Stack spacing={1}>
                    {currentAmbassador.achievements.map((achievement, index) => (
                      <Box key={index} display="flex" gap={1}>
                        <TextField
                          fullWidth
                          size="small"
                          value={achievement}
                          onChange={(e) => handleAchievementChange(index, e.target.value)}
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveAchievement(index)}
                        >
                          <FaTrash />
                        </IconButton>
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FaPlus />}
                      onClick={handleAddAchievement}
                    >
                      Erfolg hinzufügen
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>
            Abbrechen
          </Button>
          <Button
            variant="contained"
            startIcon={<FaSave />}
            onClick={handleSave}
          >
            Speichern
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
}
