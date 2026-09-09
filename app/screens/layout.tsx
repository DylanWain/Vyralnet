import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vyralnet — Product Build Board',
  description: 'A live visual catalog of the completed Vyralnet mobile experiences and recovered application scope.',
};

export default function ScreensLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
