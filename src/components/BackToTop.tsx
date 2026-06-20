'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-xl bg-primary text-on-primary shadow-lg hover:opacity-90 active:scale-95"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 25 }}
          aria-label="Back to top"
          whileHover={prefersReduced ? undefined : { scale: 1.1 }}
          whileTap={prefersReduced ? undefined : { scale: 0.9 }}
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
