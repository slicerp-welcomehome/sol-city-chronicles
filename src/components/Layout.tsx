import { ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { RadioPlayer } from './RadioPlayer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background" style={{ backgroundImage: 'var(--paper-texture)' }}>
      <Header />
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
      <RadioPlayer />
    </div>
  );
};