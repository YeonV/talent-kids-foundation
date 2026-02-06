'use client';

import { 
  Dialog, 
  DialogContent, 
  IconButton, 
  Box, 
  Typography, 
  Chip,
  Stack,
  Divider,
  alpha,
  useTheme
} from '@mui/material';
import { MdClose } from 'react-icons/md';
import { FaMedal, FaInstagram, FaGlobe } from 'react-icons/fa';
import { useState } from 'react';
import { withBasePath } from '@/lib/basePath';

interface Ambassador {
  id: string;
  name: string;
  sport: string;
  specialization?: string;
  images: string[];
  profession?: string;
  city?: string;
  social?: {
    instagram?: string;
  };
  website?: string;
  achievements: string[];
  bio?: string;
}

interface AmbassadorDialogProps {
  ambassador: Ambassador | null;
  open: boolean;
  onClose: () => void;
}

const ImageSliderDialog = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        minHeight: 400
      }}
    >
      <Box
        sx={{          width: '100%',
          height: '100%',
          backgroundImage: `url(${withBasePath(images[currentIndex])})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 20%',
          transition: 'background-image 0.3s ease'
        }}
      />
      
      {images.length > 1 && (
        <>
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              zIndex: 2
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
              }}
            >
              ‹
            </IconButton>
            
            <Box
              sx={{
                display: 'flex',
                gap: 0.75
              }}
            >
              {images.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: 'white', transform: 'scale(1.2)' }
                  }}
                />
              ))}
            </Box>
            
            <IconButton
              onClick={handleNext}
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
              }}
            >
              ›
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

const AmbassadorDialog = ({ ambassador, open, onClose }: AmbassadorDialogProps) => {
  const theme = useTheme();

  if (!ambassador) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: theme.palette.background.default,
          maxHeight: '90vh'
        }
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(8px)',
          '&:hover': {
            bgcolor: 'primary.main',
            color: 'white'
          }
        }}
      >
        <MdClose size={20} />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: { md: 500 },
            maxHeight: { md: '85vh' }
          }}
        >
          {/* Left Side - Content */}
          <Box 
            sx={{ 
              flex: 1,
              p: { xs: 3, sm: 4, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              overflowY: 'auto'
            }}
          >
            <Box>
              <Chip 
                label={ambassador.sport}
                size="small"
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 700,
                  mb: 2
                }}
              />
              
              <Typography variant="h3" fontWeight={800} gutterBottom>
                {ambassador.name}
              </Typography>
              
              {ambassador.profession && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {ambassador.profession}
                </Typography>
              )}
              
              {ambassador.specialization && (
                <Typography variant="body1" color="text.secondary">
                  {ambassador.specialization}
                </Typography>
              )}

              {/* Social Links */}
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                {ambassador.social?.instagram && (
                  <Box
                    component="a"
                    href={`https://instagram.com/${ambassador.social.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    <FaInstagram size={18} />
                    <Typography variant="body2" fontWeight={600}>
                      {ambassador.social.instagram}
                    </Typography>
                  </Box>
                )}
                {ambassador.website && (
                  <Box
                    component="a"
                    href={ambassador.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white'
                      }
                    }}
                  >
                    <FaGlobe size={18} />
                    <Typography variant="body2" fontWeight={600}>
                      Website
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>

            <Divider />

            {/* Achievements Section */}
            {ambassador.achievements.length > 0 && (
              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
                  Erfolge & Auszeichnungen
                </Typography>
                <Stack spacing={1.5}>
                  {ambassador.achievements.map((achievement: string, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'flex-start',
                        p: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 2,
                        borderLeft: `3px solid ${theme.palette.primary.main}`
                      }}
                    >
                      <FaMedal 
                        size={16} 
                        color={theme.palette.primary.main}
                        style={{ marginTop: 3, flexShrink: 0 }} 
                      />
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        {achievement}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
            
            <Divider />
            
            {ambassador.bio && (
              <Box>
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
                  Biografie
                </Typography>
                <Stack spacing={1.5}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {ambassador.bio}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Box>

          {/* Right Side - Image Slider */}
          <Box 
            sx={{ 
              width: { xs: '100%', md: '42%' },
              minHeight: { xs: 350, md: 500 },
              maxHeight: { md: '85vh' },
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              flexShrink: 0,
              overflow: 'hidden',
              borderTopRightRadius: { md: 'inherit' },
              borderBottomRightRadius: { md: 'inherit' },
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: { xs: 0, md: 0 },
                background: `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
                zIndex: 1,
                pointerEvents: 'none'
              }
            }}
          >
            <ImageSliderDialog images={ambassador.images} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AmbassadorDialog;
