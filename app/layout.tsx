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
      <head>
        <link rel="preload" as="image" href="/assets/figma/scout/background-light.svg" />
        <link rel="preload" as="image" href="/assets/figma/scout/core-outer-glow.svg" />
        <link rel="preload" as="image" href="/assets/figma/scout/core-layer-glass.svg" />
        <link rel="preload" as="image" href="/assets/figma/scout/burst-ring-outer.svg" />
        <link rel="preload" as="image" href="/assets/figma/nothing/ball-glass.svg" />
        <link rel="preload" as="image" href="/assets/figma/match/crown.svg" />
        <link rel="preload" as="image" href="/assets/figma/match/bracket-track.svg" />
        <link rel="preload" as="image" href="/assets/figma/match/match-card-shell.svg" />
        <link rel="preload" as="image" href="/assets/figma/match/avatar-you.svg" />
        <link rel="preload" as="image" href="/assets/figma/match/avatar-opponent.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
