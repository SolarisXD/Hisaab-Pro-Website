'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import ScrollProgress from './ScrollProgress';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <ScrollProgress />
      <Header activePage={pathname} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
