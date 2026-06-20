'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const faqs = [
  {
    q: 'Does Hisaab-Pro require an internet connection?',
    a: 'No. Hisaab-Pro is 100% offline. All data is stored locally on your device or USB drive. You never need an internet connection to use the software.',
  },
  {
    q: 'Can I use Hisaab-Pro on multiple computers?',
    a: 'Yes. Just copy the application folder to a USB drive and run it on any Windows PC. Your data travels with you — no installation needed on the host machine.',
  },
  {
    q: 'Is my financial data secure?',
    a: 'Absolutely. We use AES-256 encryption for all stored data. Since there is no cloud sync or online transmission, your data never leaves your physical device.',
  },
  {
    q: 'Does it support GST compliance?',
    a: 'Yes. Hisaab-Pro includes built-in GST rate management, auto-calculation on transactions, and GST-compliant invoice and report generation.',
  },
  {
    q: 'Can I track employee salaries and attendance?',
    a: 'Yes. The integrated staff management module lets you track daily attendance, configure wages, and auto-generate payroll — all linked to individual staff ledger accounts.',
  },
  {
    q: 'What happens to my data when a financial year ends?',
    a: 'Use the New Year Wizard to carry forward balances, archive old transactions into encrypted backups, and start the new financial year with a clean slate.',
  },
];

const accordionContent = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-display text-text-main">Frequently Asked <span className="text-gradient">Questions</span></h2>
            <p className="text-lg text-text-muted">
              Everything you need to know about Hisaab-Pro.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 50}>
              <div className="glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                  aria-expanded={openIndex === i}
                >
                  <span className={`font-semibold text-[15px] sm:text-base transition-colors duration-300 ${openIndex === i ? 'text-primary' : 'text-text-main group-hover:text-primary'}`}>{faq.q}</span>
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300 ${openIndex === i ? 'bg-primary/20 border-primary/50 text-primary' : 'bg-white/5 border-white/10 text-text-muted group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary'}`}
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="content"
                      variants={accordionContent}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="px-6 pb-6 text-[15px] sm:text-base text-text-muted leading-relaxed">
                        <div className="h-px w-full bg-white/5 mb-4"></div>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
