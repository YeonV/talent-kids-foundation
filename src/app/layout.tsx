import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import ThemeRegistry from '@/theme/ThemeRegistry';
import './globals.css'; // Falls du globale CSS hast (für Tailwind/Fonts)
import CookieConsent from '@/components/CookieConsent';
import DevModeListener from '@/components/DevModeListener';

export const viewport: Viewport = {
  themeColor: '#FF7F32', // Dein Marken-Orange (färbt die Browser-Leiste auf Mobile)
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://talentkidsfoundation.de'), // Deine echte Domain später
  title: {
    default: 'Talent Kids Foundation | Sport für alle Kinder',
    template: '%s | Talent Kids Foundation',
  },
  description: 'Wir ermöglichen Kindern Zugang zu olympischen Sportarten. Judo, Wertevermittlung und Talentförderung in Köln und Umgebung.',
  keywords: ['Judo', 'Kinder', 'Stiftung', 'Sportförderung', 'Köln', 'Olympia', 'Charity'],
  authors: [{ name: 'Benjamin Behrla' }],
  openGraph: {
    title: 'Talent Kids Foundation',
    description: 'Wir machen Kinder stark. Kostenloser Sportzugang und Talentförderung.',
    url: 'https://talentkidsfoundation.de',
    siteName: 'Talent Kids Foundation',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Erstelle ein 1200x630px Bild und lege es in /public
        width: 1200,
        height: 630,
        alt: 'Talent Kids Foundation - Sport für alle',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <ThemeRegistry>
          <Suspense fallback={null}>
            <DevModeListener />
          </Suspense>
          {children}
          <CookieConsent />
        </ThemeRegistry>
      </body>
    </html>
  );
}