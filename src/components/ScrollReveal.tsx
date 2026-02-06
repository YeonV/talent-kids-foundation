'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Slide, Fade } from '@mui/material';
import { useThemeStore } from '@/store/useThemeStore'; // Import Store

interface ScrollRevealProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any>;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  delay?: number;
  mode?: 'slide' | 'fade';
}

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  threshold = 0.2, 
  delay = 0,
  mode = 'slide'
}: ScrollRevealProps) => {
  // 1. Hole den Status aus dem Store
  const animationsEnabled = useThemeStore((state) => state.animationsEnabled);
  
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  // 2. Logic Effect: Nur ausführen, wenn Animationen an sind
  useEffect(() => {
    if (!animationsEnabled) return; // Hook beenden

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, animationsEnabled]);

  // 3. Early Return: Wenn Animationen aus sind, gib einfach das Kind zurück
  // Wir wrappen es trotzdem in eine Box, damit das Layout nicht springt (CSS Grid/Flex)
  if (!animationsEnabled) {
    return <Box>{children}</Box>;
  }

  const style = { transitionDelay: `${delay}ms` };

  if (mode === 'fade') {
    return (
      <div ref={domRef} style={{ overflow: 'hidden' }}>
        <Fade in={isVisible} timeout={1000} style={style}>
          <Box>{children}</Box>
        </Fade>
      </div>
    );
  }

  return (
    <div ref={domRef} style={{ overflow: 'visible' }}>
      <Slide direction={direction} in={isVisible} timeout={800} style={style}>
        <Box>{children}</Box>
      </Slide>
    </div>
  );
};

export default ScrollReveal;