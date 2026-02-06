import { createTheme, ThemeOptions } from '@mui/material/styles';
import { Inter, Playfair_Display, Montserrat } from 'next/font/google';

// --- FONTS ---
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
});

// Neu: Montserrat für den "Modern Sporty" Look
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

// --- BRAND COLORS ---
const brandColors = {
  // Original colors
  orange: '#FF7F32',
  electricOrange: '#FF5E00',
  blue: '#2D3E50',
  midnightBlue: '#1a2332',
  
  // New brand colors
  navy: '#1F3A60',        // Deep professional blue
  cyan: '#6ECFF6',        // Bright, energetic cyan
  yellow: '#FFD559',      // Warm, optimistic yellow
  navyDark: '#152840',    // Darker variant
  navyLight: '#2B4B75',   // Lighter variant
  cyanDark: '#4AB8E5',    // Darker cyan
  yellowDark: '#F5C842',  // Darker yellow
};

// --- SEMANTIC COLORS (Global across all themes) ---
const semanticColors = {
  success: { main: '#27D4C6' },
  warning: { main: '#FFD559' },
  error: { main: '#FF6F61' },
};

// --- CLASSIC BASE (Deine bisherigen Settings) ---
const classicBase: ThemeOptions = {
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: { fontFamily: playfair.style.fontFamily, fontWeight: 700 },
    h2: { fontFamily: playfair.style.fontFamily, fontWeight: 700 },
    h3: { fontFamily: playfair.style.fontFamily, fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 }, // Leicht abgerundet
      },
    },
  },
};

// --- MODERN BASE (Neu) ---
const modernBase: ThemeOptions = {
  typography: {
    fontFamily: inter.style.fontFamily,
    // Alles Sans-Serif, Headings fett und geometrisch
    h1: { fontFamily: montserrat.style.fontFamily, fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontFamily: montserrat.style.fontFamily, fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontFamily: montserrat.style.fontFamily, fontWeight: 700 },
    button: { 
      fontFamily: montserrat.style.fontFamily, 
      textTransform: 'uppercase', // Sportlicher Look
      fontWeight: 700,
      letterSpacing: '0.05em'
    },
  },
  shape: {
    borderRadius: 16, // Stärker abgerundet ("Friendly/Modern")
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { 
          borderRadius: 50, // Pill-Shape Buttons
          padding: '12px 28px',
          boxShadow: 'none',
        },
        contained: {
          '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Kein MUI Default Overlay
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Weicherer Schatten
        }
      }
    }
  },
};

// --- EXPORT THEMES ---

// 1. Classic Light
export const lightTheme = createTheme({
  ...classicBase,
  palette: {
    mode: 'light',
    primary: { main: brandColors.orange },
    secondary: { main: brandColors.blue },
    background: { default: '#F8F9FA', paper: '#FFFFFF' },
    ...semanticColors,
  },
});

// 2. Classic Dark
export const darkTheme = createTheme({
  ...classicBase,
  palette: {
    mode: 'dark',
    primary: { main: brandColors.orange },
    secondary: { main: '#90CAF9' },
    background: { default: '#0F1214', paper: '#1A2027' },
    ...semanticColors,
  },
});

// 3. Modern Light
export const modernLightTheme = createTheme({
  ...modernBase,
  palette: {
    mode: 'light',
    primary: { main: brandColors.electricOrange },
    secondary: { main: brandColors.blue },
    background: { default: '#ffffff', paper: '#f4f6f8' }, // Cleaner, weißer Look
    text: { primary: '#090a0b' },
    ...semanticColors,
  },
});

// 4. Modern Dark
export const modernDarkTheme = createTheme({
  ...modernBase,
  palette: {
    mode: 'dark',
    primary: { main: brandColors.electricOrange },
    secondary: { main: '#00E5FF' }, // Cyan Akzent
    background: { default: '#0b0d11', paper: brandColors.midnightBlue }, // Tiefes Blau-Schwarz
    ...semanticColors,
  },
});

// 5. Ocean Professional (Navy + Cyan)
export const oceanTheme = createTheme({
  ...modernBase,
  palette: {
    mode: 'light',
    primary: { main: brandColors.navy },
    secondary: { main: brandColors.cyan },
    background: { default: '#F5F9FC', paper: '#FFFFFF' },
    text: { primary: '#1F3A60', secondary: '#5C7A99' },
    ...semanticColors,
  },
});
export const oceanThemeB = createTheme({
  ...modernBase,
  palette: {
    mode: 'dark',
    primary: { main: brandColors.cyan },
    secondary: { main: brandColors.yellow },
    background: { default: '#0A1929', paper: brandColors.navyDark },
    text: { primary: '#E3F2FD', secondary: '#B3D9F7' },
    ...semanticColors,
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: { backgroundColor: '#24476d !important', color: '#fff', paddingTop: '12px !important', paddingBottom: '12px !important' },
      }
    }
  }
});

// 6. Ocean Dark
export const oceanDarkTheme = createTheme({
  ...modernBase,
  palette: {
    mode: 'dark',
    primary: { main: brandColors.cyan },
    secondary: { main: brandColors.yellow },
    background: { default: '#0A1929', paper: brandColors.navyDark },
    text: { primary: '#E3F2FD', secondary: '#B3D9F7' },
    ...semanticColors,
  },
});

// 7. Sunrise Energy (Yellow + Navy)
export const sunriseTheme = createTheme({
  ...modernBase,
  palette: {
    mode: 'light',
    primary: { main: brandColors.yellow },
    secondary: { main: brandColors.navy },
    background: { default: '#FFFBF0', paper: '#FFFFFF' },
    text: { primary: '#1F3A60', secondary: '#5C7A99' },
    ...semanticColors,
  },
});

// 8. Aqua Sport (Cyan + Yellow accents)
export const aquaSportTheme = createTheme({
  ...modernBase,
  palette: {
    mode: 'light',
    primary: { main: brandColors.cyan },
    secondary: { main: brandColors.yellow },
    background: { default: '#F0FBFF', paper: '#FFFFFF' },
    text: { primary: '#0D2135', secondary: '#4A6B87' },
    ...semanticColors,
  },
});

// 9. Midnight Professional
export const midnightProfessionalTheme = createTheme({
  ...classicBase,
  palette: {
    mode: 'dark',
    primary: { main: brandColors.yellow },
    secondary: { main: brandColors.cyan },
    background: { default: '#0D1117', paper: brandColors.navy },
    text: { primary: '#F0F6FC', secondary: '#8B949E' },
    ...semanticColors,
  },
});

// 10. Champion Gold (Sporty, elegant)
export const championGoldTheme = createTheme({
  ...modernBase,
  palette: {
    mode: 'light',
    primary: { main: brandColors.yellowDark },
    secondary: { main: brandColors.navyLight },
    background: { default: '#FAFAFA', paper: '#FFFFFF' },
    text: { primary: '#1A1A1A', secondary: '#616161' },
    ...semanticColors,
  },
});

// 11. Deep Ocean
export const deepOceanTheme = createTheme({
  ...classicBase,
  palette: {
    mode: 'dark',
    primary: { main: brandColors.cyanDark },
    secondary: { main: brandColors.yellow },
    background: { default: brandColors.navyDark, paper: brandColors.navy },
    text: { primary: '#E0F2FF', secondary: '#A5D6F5' },
    ...semanticColors,
  },
});

// 12. Sky High (Light and airy)
export const skyHighTheme = createTheme({
  ...modernBase,
  palette: {
    mode: 'light',
    primary: { main: brandColors.cyan },
    secondary: { main: brandColors.navy },
    background: { default: '#FFFFFF', paper: '#F8FCFF' },
    text: { primary: '#1E293B', secondary: '#64748B' },
    ...semanticColors,
  },
});