'use client';

import { useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactPage() {
  useEffect(() => { document.title = 'Contact - Hisaab-Pro'; }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      <ScrollReveal>
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4 font-display">Get in Touch</h1>
          <p className="text-lg sm:text-xl text-on-surface-alt max-w-2xl mx-auto leading-relaxed">
            Hisaab-Pro is built and maintained by a solo developer dedicated to creating high-performance software.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="mt-16 bg-surface dark:bg-surface-dim/70 p-8 sm:p-12 rounded-3xl border border-outline-variant/40 shadow-xl max-w-2xl mx-auto">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-primary text-4xl">person</span>
          </div>
          
          <h2 className="text-2xl font-bold text-on-surface mb-3">Rahul Gehlot</h2>
          <p className="text-on-surface-alt mb-8">Software Developer & Creator of Hisaab-Pro</p>
          
          <p className="text-sm text-on-surface-alt/80 mb-8 max-w-md mx-auto">
            Whether you have a technical question, a feature request, or a business inquiry, I&apos;d love to hear from you. Please reach out to me through my personal portfolio.
          </p>

          <a 
            href="https://www.rahulgehlot.me/#contact" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-primary text-on-primary font-semibold px-8 py-4 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <span>Contact via Portfolio</span>
            <span className="material-symbols-outlined text-xl">open_in_new</span>
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
