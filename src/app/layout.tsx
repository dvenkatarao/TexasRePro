import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/auth-context';
import { FavoritesProvider } from '@/contexts/favorites-context';

export const metadata: Metadata = {
  title: 'TexasRE Pro - Real Estate Investment Platform',
  description: 'The only platform built exclusively for Texas single-family & 1-4 unit investors.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}