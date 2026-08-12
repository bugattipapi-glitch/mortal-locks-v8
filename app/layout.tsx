import type { Metadata } from 'next';
import { Barlow_Condensed, Russo_One } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Mortal Locks 8: The Ocho',
  description: 'The public-access home of Mortal Locks.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${broadcastFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
