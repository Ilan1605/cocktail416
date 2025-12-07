import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cocktail 416 | Bar Mobile Premium à Genève',
  description: 'Service de bar à cocktails mobile pour vos événements. Mariages, entreprises, anniversaires. Barmans professionnels à Genève et ses alentours.',
  keywords: 'bar mobile, cocktails, Genève, mariage, événements, barmans, Suisse',
  openGraph: {
    title: 'Cocktail 416 | Bar Mobile Premium',
    description: 'L\'art du cocktail à votre événement. Service de bar mobile premium en Suisse romande.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

