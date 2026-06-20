'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { fetchRepo } from '@/lib/github';
import NavHeader from '@/components/ui/nav-header';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  activePage?: string;
}

export default function Header({ activePage = '/' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    fetchRepo().then((repo) => {
      if (repo) setStarCount(repo.stargazers_count);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all ${prefersReduced ? 'duration-0' : 'duration-300'} ${
          scrolled
            ? 'bg-surface/80 backdrop-blur-xl shadow-[0_1px_0_var(--color-outline-variant)]'
            : 'bg-transparent backdrop-blur-none shadow-none'
        }`}
      >
        <nav className="flex items-center justify-between w-full px-4 sm:px-6 py-3 max-w-7xl mx-auto">
          <Link href="/" className="text-lg font-bold text-primary tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded">
            Hisaab-Pro
          </Link>

          <div className="hidden md:flex items-center">
            <NavHeader activePage={activePage} />
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {starCount !== null && (
              <a
                href="https://github.com/SolarisXD/Hisaab-Pro"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-on-surface-alt hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[16px]">star</span>
                {starCount}
              </a>
            )}

            <Link
              href="/download"
              className="hidden sm:inline-flex bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all shadow-sm"
            >
              Download
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-alt hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activePage={activePage} />
    </>
  );
}
