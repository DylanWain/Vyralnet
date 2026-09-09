import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vyralnet — Interactive App Demo',
  description: 'Explore the complete recovered Vyralnet application in a browser-based iOS preview.',
};

export default function DemoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
