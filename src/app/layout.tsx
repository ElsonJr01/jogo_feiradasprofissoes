import type { Metadata, Viewport } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Quiz do Clube de Programação | Feira das Profissões',
  description:
    'Jogo educativo do Clube de Programação (UNIFESSPA) sobre algoritmos, história da computação e carreiras em tecnologia — feito para a Feira das Profissões.',
  icons: {
    icon: '/images/polvinho.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#136AFF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col font-body text-clube-navy">{children}</body>
    </html>
  );
}
