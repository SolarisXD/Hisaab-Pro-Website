'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activePage: string;
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/download', label: 'Download' },
  { href: '/contact', label: 'Contact' },
  { href: '/issue', label: 'Report Issue' },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.3 },
  }),
};

export default function MobileMenu({ open, onClose, activePage }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            className="fixed top-0 right-0 z-50 h-full w-72 bg-surface dark:bg-surface-dim shadow-2xl md:hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/40">
              <span className="font-semibold text-primary text-lg">Hisaab-Pro</span>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors" aria-label="Close menu">
                <span className="material-symbols-outlined text-on-surface-alt">close</span>
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      activePage === link.href
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-alt hover:bg-surface-alt hover:text-on-surface'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
