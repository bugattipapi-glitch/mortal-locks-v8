import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mortal Locks 8: The Ocho',
  description: 'The public-access home of Mortal Locks.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
