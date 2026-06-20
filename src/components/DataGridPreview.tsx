'use client';

import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function DataGridPreview() {
  return (
    <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 relative">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-display">
              Designed for <span className="text-gradient">Data Density</span>
            </h2>
            <p className="text-lg text-text-muted">
              Our interface is optimized for maximum vertical visibility. View more transactions per screen with our high-density, blazing-fast data grid.
            </p>
          </div>
          <Link href="/features" className="text-text-main font-semibold flex items-center gap-2 hover:text-primary transition-all group">
            View Full Interface Tour
            <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            
            <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-text-muted/80">FY 2026-27</span>
                <div className="h-4 w-px bg-white/20" />
                <span className="font-mono text-xs text-primary glow-text">General Ledger: Cash Account</span>
              </div>
              <div className="flex items-center gap-4 text-text-muted">
                <span className="material-symbols-outlined text-[18px] hover:text-primary cursor-pointer transition-colors">search</span>
                <span className="material-symbols-outlined text-[18px] hover:text-primary cursor-pointer transition-colors">filter_list</span>
                <span className="material-symbols-outlined text-[18px] hover:text-primary cursor-pointer transition-colors">more_vert</span>
              </div>
            </div>
            
            <div className="overflow-hidden">
              <img
                src="/general-ledger.png"
                alt="General Ledger Interface"
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
