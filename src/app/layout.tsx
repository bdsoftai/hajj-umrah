import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import HideChromeBar from '@/components/HideChromeBar';

export const metadata: Metadata = {
  title: 'Hajj Umrah Portal',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'HajjPortal',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#022c22',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-emerald-950">
        <HideChromeBar />
        <Navbar />
        <main className="pb-16 md:pb-0">{children}</main>
      </body>
    </html>
  );
}