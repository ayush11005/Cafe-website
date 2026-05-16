import type {Metadata} from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Route30 Café & Restaurant | Premium Dining',
  description: 'A luxury dining experience with a modern Gen-Z vibe. Signature cold brews, gourmet burgers, and a visual feast.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="bg-black text-white selection:bg-orange-500/30 selection:text-orange-200">
        {children}
      </body>
    </html>
  );
}
