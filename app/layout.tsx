import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vyralnet Scout · Visual Comparison',
  description: 'Side-by-side Figma and coded reconstruction of the Vyralnet Scout trial elements.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
