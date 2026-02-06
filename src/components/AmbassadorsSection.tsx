'use client';

import { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Chip, Stack, useTheme, alpha, IconButton, Collapse, TextField, Button } from '@mui/material';
import { FaMedal, FaInstagram, FaGlobe, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ambassadorsData from '@/data/ambassadors.json';
import ScrollReveal from './ScrollReveal';
import AmbassadorVariantSelector, { AmbassadorVariant } from './AmbassadorVariantSelector';
import AmbassadorDialog from './AmbassadorDialog';
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

function ImageSlider({ images, hideControls = false }: { images: string[]; hideControls?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${withBasePath(images[0])})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${withBasePath(images[currentIndex])})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 0.3s ease'
        }}
      />
      {!hideControls && (
        <>
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
              zIndex: 2,
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
              zIndex: 2,
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
              gap: 0.5,
              zIndex: 2
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
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
}

const AmbassadorsSection = () => {
  const theme = useTheme();
  const ambassadors = ambassadorsData as Ambassador[];
  const [variant, setVariant] = useState<AmbassadorVariant>('compact-chip-bottom');
  const [selectedAmbassador, setSelectedAmbassador] = useState<Ambassador | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCardClick = (ambassador: Ambassador) => {
    setSelectedAmbassador(ambassador);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const renderAmbassadorCard = (ambassador: Ambassador) => {
    const commonCardProps = {
      sx: { 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`
        }
      }
    };

    // Helper to render social links
    const renderSocialLinks = (position: 'absolute' | 'relative' = 'absolute', zIndex = 2) => (
      <Stack 
        direction="row" 
        spacing={1}
        sx={{ 
          position,
          ...(position === 'absolute' ? {
            bottom: 16,
            right: 16,
            zIndex
          } : {})
        }}
      >
        {ambassador.social?.instagram && (
          <Box
            component="a"
            href={`https://instagram.com/${ambassador.social.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'primary.main',
                transform: 'scale(1.1)'
              }
            }}
          >
            <FaInstagram size={18} />
          </Box>
        )}
        {ambassador.website && (
          <Box
            component="a"
            href={ambassador.website}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'primary.main',
                transform: 'scale(1.1)'
              }
            }}
          >
            <FaGlobe size={18} />
          </Box>
        )}
      </Stack>
    );

    // Overlay variants with full-bleed images
    if (variant === 'overlay-gray' || variant === 'overlay-theme' || variant === 'overlay-dark') {
      const backdropColor = 
        variant === 'overlay-gray' ? 'rgba(0, 0, 0, 0.85)' :
        variant === 'overlay-theme' ? alpha(theme.palette.primary.main, 0.85) :
        'rgba(0, 0, 0, 0.9)';

      return (
        <Card 
          {...commonCardProps}
          onClick={() => handleCardClick(ambassador)}
          sx={{ 
            ...commonCardProps.sx, 
            cursor: 'pointer'
          }}
        >
          <Box sx={{ position: 'relative', height: '100%', minHeight: 500 }}>
            {/* Background Image */}
            <CardMedia
              component="div"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                overflow: 'hidden',
                zIndex: 0
              }}
            >
              <ImageSlider images={ambassador.images} />
            </CardMedia>

            {/* Backdrop Overlay - Stronger gradient for text readability */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(to top, ${backdropColor} 0%, ${alpha(backdropColor, 0.4)} 40%, transparent 100%)`,
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Sport Badge - Top Left */}
            <Chip 
              label={ambassador.sport}
              size="small"
              sx={{ 
                position: 'absolute',
                top: 16,
                left: 16,
                bgcolor: '#1f3a60', // variant === 'overlay-theme' ? 'rgba(255,255,255,0.95)' : 'primary.main',
                color: '#fff', // variant === 'overlay-theme' ? 'primary.main' : '#fff',
                fontWeight: 700,
                zIndex: 2,
                backdropFilter: 'blur(8px)'
              }}
            />

            {/* Social Links - Top Right */}
            <Stack 
              direction="row" 
              spacing={1}
              sx={{ 
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 2
              }}
            >
              {ambassador.social?.instagram && (
                <Box
                  component="a"
                  href={`https://instagram.com/${ambassador.social.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(8px)',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: '#fff',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <FaInstagram size={20} />
                </Box>
              )}
              {ambassador.website && (
                <Box
                  component="a"
                  href={ambassador.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.95)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(8px)',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: '#fff',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <FaGlobe size={20} />
                </Box>
              )}
            </Stack>

            {/* Content Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                zIndex: 2,
                color: '#fff'
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                {ambassador.name}
              </Typography>
              
              {ambassador.profession && (
                <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                  {ambassador.profession}
                </Typography>
              )}

              {ambassador.achievements.length > 0 && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 1, 
                    alignItems: 'flex-start',
                    p: 2,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 2,
                    borderLeft: `3px solid rgba(255,255,255,0.6)`
                  }}
                >
                  <FaMedal 
                    size={18} 
                    color="#fff"
                    style={{ marginTop: 2, flexShrink: 0 }} 
                  />
                  <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                    {ambassador.achievements[0]}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      );
    }

    // Minimal variant - small image, focus on content
    if (variant === 'minimal') {
      return (
        <Card 
          {...commonCardProps}
          onClick={() => handleCardClick(ambassador)}
          sx={{ 
            ...commonCardProps.sx, 
            cursor: 'pointer'
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, p: 3 }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                overflow: 'hidden',
                flexShrink: 0,
                position: 'relative',
                bgcolor: alpha(theme.palette.primary.main, 0.1)
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${withBasePath(ambassador.images[0])})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Chip 
                label={ambassador.sport}
                size="small"
                sx={{ 
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 700,
                  mb: 1
                }}
              />
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {ambassador.name}
              </Typography>
              {ambassador.profession && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {ambassador.profession}
                </Typography>
              )}
            </Box>
          </Box>
        </Card>
      );
    }

    // Compact variants - Chip Top (no social, no achievements, no chevrons, clickable)
    if (variant === 'compact-chip-top') {
      return (
        <Card 
          {...commonCardProps}
          onClick={() => handleCardClick(ambassador)}
          sx={{ 
            ...commonCardProps.sx, 
            cursor: 'pointer'
          }}
        >
          <Box sx={{ position: 'relative', height: '100%', minHeight: 450 }}>
            {/* Background Image */}
            <CardMedia
              component="div"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                overflow: 'hidden',
                zIndex: 0
              }}
            >
              <ImageSlider images={ambassador.images} hideControls />
            </CardMedia>

            {/* Backdrop Overlay - Dark gradient */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 100%)`,
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Sport Badge - Top Left */}
            <Chip 
              label={ambassador.sport}
              size="small"
              sx={{ 
                position: 'absolute',
                top: 16,
                left: 16,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 700,
                zIndex: 2,
                backdropFilter: 'blur(8px)'
              }}
            />

            {/* Content Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                zIndex: 2,
                color: '#fff'
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                {ambassador.name}
              </Typography>
              
              {ambassador.profession && (
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                  {ambassador.profession}
                </Typography>
              )}
            </Box>
          </Box>
        </Card>
      );
    }

    // Compact variants - Chip Bottom (no social, no achievements, no chevrons, clickable)
    if (variant === 'compact-chip-mid') {
      return (
        <Card 
          {...commonCardProps}
          onClick={() => handleCardClick(ambassador)}
          sx={{ 
            ...commonCardProps.sx, 
            cursor: 'pointer'
          }}
        >
          <Box sx={{ position: 'relative', height: '100%', minHeight: 450 }}>
            {/* Background Image */}
            <CardMedia
              component="div"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                overflow: 'hidden',
                zIndex: 0
              }}
            >
              <ImageSlider images={ambassador.images} hideControls />
            </CardMedia>

            {/* Backdrop Overlay - Dark gradient */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 100%)`,
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Content Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                zIndex: 2,
                color: '#fff'
              }}
            >
              <Chip 
                label={ambassador.sport}
                size="small"
                sx={{ 
                  bgcolor: '#1f3a60', //primary.main',
                  color: '#fff',
                  fontWeight: 700,
                  mb: 1.5,
                  backdropFilter: 'blur(8px)'
                }}
              />
              
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                {ambassador.name}
              </Typography>
              
              {ambassador.profession && (
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                  {ambassador.profession}
                </Typography>
              )}
            </Box>
          </Box>
        </Card>
      );
    }

    // Compact variants - Chip Bottom (no social, no achievements, no chevrons, no profession, clickable)
    if (variant === 'compact-chip-bottom') {
      return (
        <Card 
          {...commonCardProps}
          onClick={() => handleCardClick(ambassador)}
          sx={{ 
            ...commonCardProps.sx, 
            cursor: 'pointer'
          }}
        >
          <Box sx={{ position: 'relative', height: '100%', minHeight: 450 }}>
            {/* Background Image */}
            <CardMedia
              component="div"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                overflow: 'hidden',
                zIndex: 0
              }}
            >
              <ImageSlider images={ambassador.images} hideControls />
            </CardMedia>

            {/* Backdrop Overlay - Dark gradient */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 100%)`,
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Content Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                zIndex: 2,
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
              }}
            >
              <Typography variant="h5" fontWeight={700} sx={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                {ambassador.name}
              </Typography>
              
              <Chip 
                label={ambassador.sport}
                size="small"
                sx={{ 
                  bgcolor: 'primary.main',
                  color: '#fff',
                  fontWeight: 700,
                  backdropFilter: 'blur(8px)',
                  alignSelf: 'flex-start'
                }}
              />
            </Box>
          </Box>
        </Card>
      );
    }

    // Split view variant
    if (variant === 'split-view') {
      return (
        <Card 
          {...commonCardProps}
          onClick={() => handleCardClick(ambassador)}
          sx={{ 
            ...commonCardProps.sx, 
            flexDirection: 'row', 
            minHeight: 250,
            cursor: 'pointer'
          }}
        >
          <Box sx={{ width: '40%', position: 'relative', bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${ambassador.images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <Chip 
              label={ambassador.sport}
              size="small"
              sx={{ 
                position: 'absolute',
                top: 16,
                left: 16,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 700,
                zIndex: 1
              }}
            />
          </Box>
          <CardContent sx={{ flex: 1, p: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              {ambassador.name}
            </Typography>
            {ambassador.profession && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {ambassador.profession}
              </Typography>
            )}
            {ambassador.achievements.length > 0 && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 1, 
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
                  style={{ marginTop: 2, flexShrink: 0 }} 
                />
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  {ambassador.achievements[0]}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      );
    }

    // Default variant - Image top, content below
    return (
      <Card 
        {...commonCardProps}
        onClick={() => handleCardClick(ambassador)}
        sx={{ 
          ...commonCardProps.sx, 
          cursor: 'pointer'
        }}
      >
        {/* Image */}
        <CardMedia
          component="div"
          sx={{
            height: 350,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              zIndex: 1
            }
          }}
        >
          <ImageSlider images={ambassador.images} />
          {/* Sport Badge */}
          <Chip 
            label={ambassador.sport}
            size="small"
            sx={{ 
              position: 'absolute',
              top: 16,
              left: 16,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 700,
              zIndex: 1
            }}
          />
          
          {renderSocialLinks()}
        </CardMedia>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {ambassador.name}
          </Typography>
          
          {ambassador.specialization && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {ambassador.specialization}
            </Typography>
          )}
          
          {ambassador.profession && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {ambassador.profession}
            </Typography>
          )}

          {/* Top Achievement */}
          {ambassador.achievements.length > 0 && (
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 1, 
                alignItems: 'flex-start',
                p: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
                borderLeft: `3px solid ${theme.palette.primary.main}`
              }}
            >
              <FaMedal 
                size={18} 
                color={theme.palette.primary.main} 
                style={{ marginTop: 2, flexShrink: 0 }} 
              />
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                {ambassador.achievements[0]}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Box 
      id="ambassadors" 
      sx={{ 
        py: { xs: 8, md: 12 },
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`
      }}
    >
      <Container maxWidth="lg">
        
        {/* Section Header */}
        <ScrollReveal mode="fade">
          <Box textAlign="center" mb={4}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: 'primary.main', 
                fontWeight: 700, 
                letterSpacing: 2,
                display: 'block',
                mb: 1
              }}
            >
              Our Ambassadors
            </Typography>
            <Typography variant="h2" fontWeight={800} gutterBottom>
              Champions für die <Box component="span" sx={{ color: 'primary.main' }}>nächste Generation</Box>
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.7 }}
            >
              Olympiasieger, Weltmeister und Profisportler unterstützen unsere Mission, 
              Kinder durch Sport stark zu machen.
            </Typography>
          </Box>
        </ScrollReveal>

        {/* Variant Selector */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <AmbassadorVariantSelector
            variant={variant}
            onVariantChange={setVariant}
          />
        </Box>

        {/* Ambassadors Grid */}
        <Grid container spacing={4}>
          {ambassadors.map((ambassador, index) => (
            <Grid size={{ xs: 12 , sm: 6, md: 4 }} key={ambassador.id}>
              <ScrollReveal mode="fade" delay={index * 50}>
                {renderAmbassadorCard(ambassador)}
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <ScrollReveal mode="fade" delay={100}>
          <Box 
            textAlign="center" 
            mt={8}
            p={4}
            sx={{
              borderRadius: 3,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                border: `2px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
                transform: 'translateY(-2px)'
              }
            }}
            onClick={() => setFormOpen(!formOpen)}
          >
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Willst Du Teil unserer Mission werden?
            </Typography>

            <Collapse in={formOpen}>
              <Box 
                sx={{ 
                  mt: 3, 
                  pt: 3, 
                  borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  textAlign: 'left'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Kontaktiere uns
                </Typography>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    label="E-Mail"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    label="Nachricht"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <Button 
                    variant="contained" 
                    size="large"
                    component="a"
                    href={`mailto:yeonhtc@gmail.com?subject=Neuer Ambessador?&body=Name: ${encodeURIComponent(formData.name)}%0D%0AE-Mail: ${encodeURIComponent(formData.email)}%0D%0A%0D%0ANachricht:%0D%0A${encodeURIComponent(formData.message)}`}
                    onClick={() => {
                      setTimeout(() => {
                        setFormData({ name: '', email: '', message: '' });
                        setFormOpen(false);
                      }, 1000);
                    }}
                  >
                    Absenden
                  </Button>
                </Stack>
              </Box>
            </Collapse>
          </Box>

        </ScrollReveal>

      </Container>

      {/* Ambassador Detail Dialog */}
      <AmbassadorDialog
        ambassador={selectedAmbassador}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </Box>
  );
};

export default AmbassadorsSection;
