'use client';

import Link from 'next/link';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    cols: 'md:col-span-4 md:row-span-2',
    icon: 'usb',
    title: 'USB Portable',
    desc: 'Run directly from any USB flash drive. No installation on host PC required. Perfect for shop owners who work across multiple locations.',
    gradient: 'from-blue-500/20 to-purple-500/20',
    image: '/usb-portable.png'
  },
  {
    cols: 'md:col-span-5',
    icon: 'balance',
    title: 'Double-Entry Core',
    desc: 'Built on a robust double-entry accounting engine ensuring mathematical precision and strict trial balance integrity.',
    gradient: 'from-primary/20 to-secondary/20',
  },
  {
    cols: 'md:col-span-3',
    icon: 'encrypted',
    title: 'Data Safe',
    desc: 'Local AES-256 encryption. Your client data never leaves your physical device.',
    gradient: 'from-red-500/20 to-orange-500/20',
  },
  {
    cols: 'md:col-span-4',
    icon: 'analytics',
    title: 'Advanced Reports',
    desc: 'Generate P&L, Balance Sheets, and GST summaries with one click. Export to PDF instantly.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    cols: 'md:col-span-4',
    icon: 'bolt',
    title: 'Fast & Offline',
    desc: 'Zero loading screens. Zero internet dependency. Sub-millisecond response times even with massive ledgers.',
    gradient: 'from-primary/40 to-primary/10',
    isHighlight: true,
  },
  {
    cols: 'md:col-span-5',
    icon: 'groups',
    title: 'Staff & Payroll Automation',
    desc: 'Track daily attendance and automatically calculate wages and salaries. Perfectly integrated with staff ledger accounts.',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    cols: 'md:col-span-4',
    icon: 'rocket_launch',
    title: 'Smart Setup Wizard',
    desc: 'Start working in minutes. A guided setup ensures your shop profile, tax rates, and first financial year are configured correctly.',
    gradient: 'from-amber-500/20 to-yellow-500/20',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

export default function FeatureGrid() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-display">Built for <span className="text-gradient">Business Owners</span></h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Powerful features designed for retail shops and small businesses — no accounting degree required.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={prefersReduced ? undefined : cardVariants}
              initial={prefersReduced ? undefined : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={{ once: true, margin: '-50px' }}
              className={`group relative glass-card p-8 flex flex-col ${f.cols} overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                  <span className={`material-symbols-outlined text-2xl ${f.isHighlight ? 'text-primary' : 'text-text-main'}`}>
                    {f.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-main">{f.title}</h3>
                <p className="text-text-muted leading-relaxed">{f.desc}</p>
                {f.image && (
                  <div className="mt-auto pt-6">
                    <img
                      src={f.image}
                      alt={f.title}
                      className="rounded-xl h-32 w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={200} className="text-center mt-16">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border glass-panel text-text-main font-semibold hover:border-primary/50 hover:text-primary transition-all duration-300"
          >
            Explore all features
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
