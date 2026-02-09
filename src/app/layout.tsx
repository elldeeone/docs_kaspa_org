import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Kaspa Docs',
    template: '%s | Kaspa Docs',
  },
  description:
    'Documentation for Kaspa — the fastest proof-of-work cryptocurrency powered by the GHOSTDAG protocol.',
  metadataBase: new URL('https://docs.kaspa.org'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon-192x192.png',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ defaultTheme: 'light' }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
