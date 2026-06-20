'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function ProductHighlight() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
      
      <ScrollReveal>
        <motion.div
          className="glass-panel rounded-3xl p-8 sm:p-16 overflow-hidden relative border border-white/10"
          whileHover={prefersReduced ? undefined : { scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                <span className="material-symbols-outlined text-sm">autorenew</span>
                SMART AUTOMATION
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-display text-text-main">
                Effortless Financial <br />
                <span className="text-gradient">Year Closure</span>
              </h2>
              <p className="text-text-muted text-lg mb-8 leading-relaxed">
                Hisaab-Pro handles multi-financial year management with a dedicated New Year Wizard. Carry forward balances, clear pending entries, and archive old data into encrypted portable backups instantly.
              </p>
              
              <div className="flex flex-col gap-5 mb-10">
                {[
                  'Automated Balance Carry-Forward',
                  'Encrypted Historical Archives',
                  'Compliance-Ready Audit Logs',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 text-text-main font-medium"
                    initial={prefersReduced ? undefined : { opacity: 0, x: -20 }}
                    whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <Link
                href="/download"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-background bg-primary hover:bg-primary/90 transition-all duration-300"
              >
                Explore Downloads
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            
            <motion.div
              className="relative"
              animate={prefersReduced ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-2xl opacity-50 rounded-full"></div>
              <Image
                alt="Financial Year Closure wizard interface"
                className="rounded-2xl shadow-2xl border border-white/10 relative z-10"
                src="/settings-fy.png"
                width={600}
                height={420}
                unoptimized
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
