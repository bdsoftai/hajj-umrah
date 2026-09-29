import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hajj & Umrah Enterprise Booking Platform',
  description: 'Dynamic live price calculation and package customizer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}