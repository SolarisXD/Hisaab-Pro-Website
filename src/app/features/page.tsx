'use client';

import { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import FeatureComparison from '@/components/FeatureComparison';
import ImageLightbox from '@/components/ImageLightbox';
import { InteractiveImageAccordion } from '@/components/ui/interactive-image-accordion';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'security', label: 'Security' },
  { id: 'reports', label: 'Reports' },
  { id: 'payroll', label: 'Payroll' },
];

const tabContent: Record<string, { title: string; desc: string; features: string[] }> = {
  overview: {
    title: 'Complete Business Ledger',
    desc: 'Everything you need to manage your business finances — from daily transaction logging to year-end closure.',
    features: [
      'Double-entry accounting engine with auto-balancing',
      'USB-portable — run from any device without installation',
      'Smart Setup Wizard for quick onboarding',
      'Multi-financial year management with carry-forward',
      'No internet required, no cloud dependency',
    ],
  },
  security: {
    title: 'Bank-Grade Data Protection',
    desc: 'Your financial data is protected with military-grade encryption — and it never leaves your device.',
    features: [
      'AES-256 encryption for all stored data',
      'Zero cloud transmission — data stays on your machine',
      'Encrypted portable backups for USB drives',
      'Local database with no external dependencies',
      'Compliance-ready audit logs',
    ],
  },
  reports: {
    title: 'Advanced Financial Reporting',
    desc: 'Generate professional reports in seconds. Export-ready for audits, taxes, and stakeholders.',
    features: [
      'Profit & Loss statements with period comparison',
      'Balance Sheet with trial balance integration',
      'GST-compliant invoices and summaries',
      'Custom report filters by date, category, branch',
      'One-click PDF export',
    ],
  },
  payroll: {
    title: 'Staff & Payroll Automation',
    desc: 'Track attendance, calculate wages, and manage staff accounts — all in one place.',
    features: [
      'Daily attendance tracking with calendar view',
      'Auto-calculate wages based on configured rates',
      'Integrated staff ledger accounts',
      'Payroll history with per-period breakdown',
      'Link salary payments directly to expense entries',
    ],
  },
};

const galleryImages = [
  { src: '/dashboard-hero.png', alt: 'Intelligent Dashboard', label: 'Main Hub', desc: 'Real-time financial health monitoring.' },
  { src: '/general-ledger.png', alt: 'General Ledger', label: 'Core Engine', desc: 'Infinite scrolling records with advanced search.' },
  { src: '/sales-entry.png', alt: 'Sales Entry', label: 'Workflow', desc: 'Rapid transaction logging with auto tax calc.' },
  { src: '/reports.png', alt: 'Comprehensive Reports', label: 'Analysis', desc: 'Export-ready reports for audits and taxes.' },
  { src: '/staff-payroll.png', alt: 'Staff & Payroll', label: 'HR', desc: 'Manage attendance and salary payouts.' },
  { src: '/security.png', alt: 'Security Controls', label: 'Protection', desc: 'Military-grade database encryption.' },
  { src: '/settings-fy.png', alt: 'Financial Year Settings', label: 'Config', desc: 'Seamlessly carry forward closing balances.' },
  { src: '/setup-wizard page 1.png', alt: 'Setup Wizard - Step 1', label: 'Onboarding', desc: 'Quickly set up your business profile.' },
  { src: '/setup-wizard page 2.png', alt: 'Setup Wizard - Step 2', label: 'Onboarding', desc: 'Configure default taxation and currency.' },
  { src: '/setup-wizard page 3.png', alt: 'Setup Wizard - Step 3', label: 'Onboarding', desc: 'Finalize settings and launch ledger.' },
  { src: '/usb-portable.png', alt: 'USB Portable Mode', label: 'Mobility', desc: 'Run from any flash drive without installation.' },
  { src: '/login-screen.png', alt: 'Secure Authentication', label: 'Access', desc: 'Protect your ledger with password access.' },
];

export default function FeaturesPage() {
  useEffect(() => { document.title = 'Features - Hisaab-Pro'; }, []);

  const [activeTab, setActiveTab] = useState('overview');
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const current = tabContent[activeTab];

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4 block">
              Business Accounting Toolkit
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
              Engineered for Your Business
            </h1>
            <p className="text-base sm:text-lg text-on-surface-alt max-w-2xl mx-auto leading-relaxed">
              A professional-grade business ledger system designed for retail shops and small businesses. Manage your accounts, staff, and reports — all offline, all encrypted.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 mb-8 border-b border-outline-variant/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-[2px] ${
                    activeTab === tab.id
                      ? 'text-primary border-primary'
                      : 'text-on-surface-alt border-transparent hover:text-primary hover:border-outline-variant'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-surface dark:bg-surface-dim/70 rounded-2xl p-8 sm:p-10 border border-outline-variant/40 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">{current.title}</h2>
              <p className="text-on-surface-alt mb-8 max-w-2xl">{current.desc}</p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {current.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-on-surface-alt">
                    <span className="material-symbols-outlined text-secondary fill shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FeatureComparison />

      <section className="bg-surface dark:bg-surface-dim/30 border-y border-outline-variant/30 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Interface Gallery</h2>
              <p className="text-base sm:text-lg text-on-surface-alt">Experience the clean, high-density professional workspace.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="w-full flex flex-col gap-8 pb-4">
              <InteractiveImageAccordion 
                items={galleryImages.slice(0, 6).map((img, i) => ({
                  id: i,
                  title: img.alt,
                  desc: img.desc,
                  imageUrl: img.src
                }))} 
              />
              <InteractiveImageAccordion 
                items={galleryImages.slice(6, 12).map((img, i) => ({
                  id: i + 6,
                  title: img.alt,
                  desc: img.desc,
                  imageUrl: img.src
                }))} 
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
