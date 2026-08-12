import type { Metadata } from 'next';
import { Barlow_Condensed, Press_Start_2P, Russo_One } from 'next/font/google';
import './globals.css';

const broadcastFont = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-broadcast',
  display: 'swap'
});

const displayFont = Russo_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap'
});

const pixelFont = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Mortal Locks 8: The Ocho',
  description: 'The public-access home of Mortal Locks.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${broadcastFont.variable} ${displayFont.variable} ${pixelFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
