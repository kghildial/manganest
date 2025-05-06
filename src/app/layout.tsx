import type { Metadata } from 'next';

import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';
import { LoaderProvider } from '../context/loader';
import RouteTransitionWrapper from './RouteTransitionWrapper';

import './globals.css';
import { Bebas_Neue, Inknut_Antiqua, Poppins } from 'next/font/google';
import LayoutLoader from './LayoutLoader';

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas_neue',
  display: 'swap',
});

const inknutAntiqua = Inknut_Antiqua({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inknut_antiqua',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Manganest',
  description: 'A manga reader',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${inknutAntiqua.variable} ${poppins.variable} antialiased`}
      >
        <LoaderProvider>
          <Header />
          <RouteTransitionWrapper>{children}</RouteTransitionWrapper>
          <LayoutLoader />
          <Footer />
        </LoaderProvider>
      </body>
    </html>
  );
}
