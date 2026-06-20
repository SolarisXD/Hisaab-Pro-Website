import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - Hisaab-Pro',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <section className="border-b border-outline-variant/30 py-16">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container/80 dark:bg-secondary-container/20 text-on-secondary-container dark:text-on-secondary-container rounded-full text-xs font-bold mb-4">
            <span className="material-symbols-outlined text-sm fill" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
            LEGAL DOCUMENT
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Terms of Service</h1>
          <p className="text-on-surface-alt">Last updated: October 15, 2024 &mdash; Effective for Hisaab-Pro v1.0.0 and later.</p>
        </ScrollReveal>
      </section>

      <div className="py-12 space-y-10">
        <ProseSection id="acceptance" title="1. Acceptance of Terms">
          <p>By downloading, installing, or using Hisaab-Pro (&ldquo;the Software&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Software.</p>
          <p>These terms apply to the Hisaab-Pro desktop application and this website, both operated by DT Tech Inc. (&ldquo;the Company&rdquo;).</p>
        </ProseSection>

        <ProseSection id="license" title="2. License Grant">
          <p>Subject to your compliance with these Terms, DT Tech Inc. grants you a <strong>non-exclusive, non-transferable, revocable license</strong> to install and use Hisaab-Pro on devices you own or control, solely for your internal business or professional accounting purposes.</p>
          <p>You may not:</p>
          <ul>
            <li>Sublicense, sell, resell, or redistribute the Software</li>
            <li>Reverse engineer, decompile, or disassemble the Software</li>
            <li>Use the Software to build a competing product</li>
            <li>Remove or alter any copyright, trademark, or proprietary notices</li>
          </ul>
        </ProseSection>

        <ProseSection id="permitted-use" title="3. Permitted Use">
          <p>Hisaab-Pro is designed for legitimate accounting and financial management purposes by small business owners, retail shopkeepers, and professionals. You agree to use the Software only for lawful purposes and in compliance with applicable Indian financial regulations, including GST laws and the Companies Act.</p>
        </ProseSection>

        <ProseSection id="data-ownership" title="4. Data Ownership">
          <p>All data you enter into Hisaab-Pro belongs exclusively to you. Since Hisaab-Pro is a fully offline application, your data is stored locally on your device and we claim no rights over it whatsoever.</p>
          <p>You are solely responsible for maintaining backups of your financial data. DT Tech Inc. is not liable for any data loss resulting from hardware failure, accidental deletion, or any other cause.</p>
        </ProseSection>

        <ProseSection id="payment" title="5. Payment & Licensing">
          <ul>
            <li>Hisaab-Pro is currently available as a one-time purchase license per installation.</li>
            <li>Prices are subject to change; existing license holders are not affected by price changes.</li>
            <li>All fees are non-refundable unless required by applicable law.</li>
            <li>Volume licensing and CA firm pricing is available — contact us for details.</li>
          </ul>
        </ProseSection>

        <ProseSection id="disclaimer" title="6. Disclaimer of Warranties">
          <p>The Software is provided <strong>&ldquo;as is&rdquo;</strong> without warranty of any kind. DT Tech Inc. does not warrant that the Software will be error-free, uninterrupted, or that it will meet your specific requirements.</p>
          <p>Hisaab-Pro is a tool to assist with accounting — it does not constitute professional financial, legal, or tax advice. You remain responsible for the accuracy of your financial records and compliance with applicable laws.</p>
        </ProseSection>

        <ProseSection id="limitation" title="7. Limitation of Liability">
          <p>To the maximum extent permitted by law, DT Tech Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use the Software.</p>
        </ProseSection>

        <ProseSection id="updates" title="8. Software Updates">
          <p>We may release updates, patches, or new versions of Hisaab-Pro. Updates are not mandatory, but we recommend keeping your software current for security and compliance reasons. Continued use after an update constitutes acceptance of any updated terms.</p>
        </ProseSection>

        <ProseSection id="termination" title="9. Termination">
          <p>Your license to use Hisaab-Pro terminates automatically if you breach any of these Terms. Upon termination, you must cease using and uninstall the Software. Sections 4, 6, 7 survive termination.</p>
        </ProseSection>

        <ProseSection id="governing-law" title="10. Governing Law">
          <p>These Terms are governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana, India.</p>
        </ProseSection>

        <ProseSection id="contact" title="11. Contact">
          <ul>
            <li><strong>Email:</strong> legal@hisaabpro.com</li>
            <li><strong>Address:</strong> DT Tech Plaza, Cyber Hub, Sector 24, Gurugram, India</li>
          </ul>
        </ProseSection>

        <ScrollReveal>
          <div className="bg-surface dark:bg-surface-dim/70 rounded-xl p-6 flex items-center justify-between flex-wrap gap-4 border border-outline-variant/40">
            <div>
              <p className="font-bold text-primary mb-1">Have questions about the terms?</p>
              <p className="text-sm text-on-surface-alt">Our team can clarify any aspect of these Terms of Service.</p>
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
