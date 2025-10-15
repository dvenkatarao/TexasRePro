import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from '@/components/providers/theme-provider'
import { FavoritesProvider } from '@/contexts/favorites-context';
import Header from '@/components/ui/header'; // ← ADD THIS


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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <ThemeProvider defaultTheme="light" storageKey="texasre-theme">
        <AuthProvider>
          <FavoritesProvider>
            <Header />
            <main> {children} </main>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}