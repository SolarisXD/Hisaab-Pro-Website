import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Hisaab-Pro',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <section className="border-b border-outline-variant/30 py-16">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container/80 dark:bg-secondary-container/20 text-on-secondary-container dark:text-on-secondary-container rounded-full text-xs font-bold mb-4">
            <span className="material-symbols-outlined text-sm fill" style={{ fontVariationSettings: "'FILL' 1" }}>privacy_tip</span>
            LEGAL DOCUMENT
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Privacy Policy</h1>
          <p className="text-on-surface-alt">Last updated: October 15, 2024 &mdash; Effective for Hisaab-Pro v1.0.0 and later.</p>
        </ScrollReveal>
      </section>

      <div className="py-12 space-y-10">
        <ScrollReveal>
          <div className="bg-secondary-container/20 dark:bg-secondary-container/10 border border-secondary/20 dark:border-secondary/10 rounded-xl p-6 flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary text-3xl shrink-0 fill" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <div>
              <p className="font-bold text-primary mb-1">Core Commitment: Zero Cloud, Zero Transmission</p>
              <p className="text-sm text-on-surface-alt">Hisaab-Pro is 100% offline. Your financial data <strong>never leaves your device</strong>. We have no servers storing your accounting records or client data.</p>
            </div>
          </div>
        </ScrollReveal>

        <ProseSection id="overview" title="1. Overview">
          <p>DT Tech Inc. built Hisaab-Pro as a desktop accounting application. This Privacy Policy describes the minimal data interactions that occur when you use our software and visit our website.</p>
          <p>This policy applies to: (a) the Hisaab-Pro desktop application, and (b) this website.</p>
        </ProseSection>

        <ProseSection id="data-we-collect" title="2. Data We Collect">
          <p><strong>Application Data (Local Only):</strong></p>
          <ul>
            <li>All accounting entries, ledger data, and client records are stored <em>exclusively</em> on your device or USB drive.</li>
            <li>Data is encrypted at rest using AES-256. We have zero access to it.</li>
          </ul>
          <p><strong>Website Contact Forms:</strong></p>
          <ul>
            <li>Name, email address, and message content — used solely to respond to your inquiry.</li>
          </ul>
          <p><strong>We do NOT collect:</strong></p>
          <ul>
            <li>Usage analytics or telemetry from the desktop application</li>
            <li>Crash reports unless voluntarily submitted via Report Issue</li>
            <li>Location data, device identifiers, or hardware fingerprints</li>
          </ul>
        </ProseSection>

        <ProseSection id="how-we-use" title="3. How We Use Information">
          <p>Contact form data is used only for: responding to support queries, processing bug reports, and sending opt-in update notifications. We never sell or rent your data.</p>
        </ProseSection>

        <ProseSection id="data-storage" title="4. Data Storage & Security">
          <p>Your accounting data is stored in an AES-256 encrypted SQLite database on your device. The encryption key is derived from your application password and never transmitted anywhere. Contact form submissions are deleted within 90 days of resolution.</p>
        </ProseSection>

        <ProseSection id="third-parties" title="5. Third Parties">
          <p>The Hisaab-Pro desktop application makes zero outbound network requests. Our website uses no third-party analytics, advertising, or tracking scripts.</p>
        </ProseSection>

        <ProseSection id="your-rights" title="6. Your Rights">
          <ul>
            <li>Request deletion of any contact form data we hold</li>
            <li>Access a copy of any personal data we hold</li>
            <li>Correct inaccurate information or object to processing</li>
          </ul>
          <p>Your accounting data lives on your device — you have complete and exclusive control over it at all times.</p>
        </ProseSection>

        <ProseSection id="contact" title="7. Contact Us">
          <ul>
            <li><strong>Email:</strong> privacy@hisaabpro.com</li>
            <li><strong>Address:</strong> DT Tech Plaza, Cyber Hub, Sector 24, Gurugram, India</li>
          </ul>
          <p>We respond to all privacy requests within 30 days.</p>
        </ProseSection>

        <ScrollReveal>
          <div className="bg-surface dark:bg-surface-dim/70 rounded-xl p-6 flex items-center justify-between flex-wrap gap-4 border border-outline-variant/40">
            <div>
              <p className="font-bold text-primary mb-1">Questions about this policy?</p>
              <p className="text-sm text-on-surface-alt">Our team is happy to clarify any aspect of our privacy practices.</p>
            </div>
            <Link href="/contact" className="bg-primary text-on-primary px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
              Contact Us
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function ProseSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <section id={id}>
        <h2 className="text-xl font-bold text-primary mt-8 mb-4 pb-3 border-b border-outline-variant/30">{title}</h2>
        <div className="text-on-surface-alt leading-relaxed space-y-4 text-sm sm:text-base [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_strong]:text-primary">
          {children}
        </div>
      </section>
    </ScrollReveal>
  );
}
