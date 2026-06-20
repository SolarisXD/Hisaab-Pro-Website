'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type = 'success', visible, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [visible, onClose, duration]);

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
  };

  const colors = {
    success: 'bg-secondary text-on-secondary',
    error: 'bg-error text-on-error',
    info: 'bg-primary text-on-primary',
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl ${colors[type]}`}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          role="alert"
        >
          <span className="material-symbols-outlined text-[20px]">{icons[type]}</span>
          <span className="text-sm font-medium">{message}</span>
          <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 transition-opacity" aria-label="Close">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
