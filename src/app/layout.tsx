import type { Metadata } from 'next';
import { Sora, DM_Sans } from 'next/font/google';
import { ThemeProvider } from '@/hooks/useTheme';
import AppShell from '@/components/AppShell';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Hisaab-Pro | Professional Business Ledger System',
  description:
    'A professional-grade business ledger system for retail shops and small businesses. Fully offline, USB-portable, with encrypted local storage — no cloud, no subscriptions.',
  keywords: [
    'accounting software',
    'business ledger',
    'offline accounting',
    'GST software',
    'small business',
    'retail shop',
    'bookkeeping',
    'Hisaab-Pro',
  ],
  openGraph: {
    title: 'Hisaab-Pro | Professional Business Ledger System',
    description:
      'Professional business ledger system for retail shops. Fully offline, USB-portable, encrypted.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${sora.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-background text-text-main font-sans antialiased">

        <ThemeProvider><AppShell>{children}</AppShell></ThemeProvider>
      </body>
    </html>
  );
}
