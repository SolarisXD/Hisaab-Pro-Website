import type { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Security - Hisaab-Pro',
};

export default function SecurityPage() {
  return (
    <>
      <section className="bg-primary text-on-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <ScrollReveal>
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold mb-6">
                    <span className="material-symbols-outlined text-sm fill" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                    SECURITY OVERVIEW
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Security by Architecture</h1>
                  <p className="text-blue-200 text-base sm:text-lg max-w-2xl leading-relaxed">Hisaab-Pro&apos;s security model is simple and absolute: your data never leaves your device. No network connection, no cloud server, no attack surface that matters.</p>
                </div>
              </ScrollReveal>
            </div>
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <ScrollReveal delay={100}>
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                  <img
                    alt="Vault & Protocols Security Settings"
                    className="w-full h-auto object-cover"
                    src="/security.png"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-outline-variant/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 text-center">Three Pillars of Security</h2>
            <p className="text-on-surface-alt text-center mb-12 max-w-2xl mx-auto">Every security decision in Hisaab-Pro stems from one principle: your financial data belongs to you alone.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'encrypted',
                bg: 'bg-primary-container text-on-primary-container',
                title: 'AES-256 Encryption',
                desc: 'All data is encrypted at rest using AES-256, the same standard used by global banks and governments. Your database file is unreadable without your application password.',
              },
              {
                icon: 'wifi_off',
                bg: 'bg-secondary-container text-secondary',
                title: 'Zero Network Access',
                desc: 'Hisaab-Pro makes zero outbound network requests. No telemetry, no update checks, no license verification servers. The application is completely air-gapped by design.',
              },
              {
                icon: 'usb',
                bg: 'bg-error/10 text-error',
                title: 'Physical Data Control',
                desc: 'Run Hisaab-Pro from a USB drive and carry your data physically. No data remains on the host machine after the USB is removed. You control the hardware; you control the data.',
              },
            ].map((pillar, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-surface dark:bg-surface-dim/70 rounded-xl p-8 border border-outline-variant/40 h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className={`w-14 h-14 ${pillar.bg} rounded-xl flex items-center justify-center mb-6`}>
                    <span className="material-symbols-outlined text-2xl fill" style={{ fontVariationSettings: "'FILL' 1" }}>{pillar.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">{pillar.title}</h3>
                  <p className="text-on-surface-alt text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-8">Technical Security Specifications</h2>
              </ScrollReveal>
              <div className="space-y-4">
                {[
                  { icon: 'lock', title: 'Database Encryption', desc: 'SQLite database encrypted via AES-256-CBC. Key derivation uses PBKDF2-HMAC-SHA256 with 100,000 iterations. Salt is randomly generated per installation.' },
                  { icon: 'key', title: 'Password Security', desc: 'Passwords are never stored in plain text. The application stores only a salted hash. Brute-force protection via progressive delays after failed attempts.' },
                  { icon: 'history', title: 'Audit Logs', desc: 'Every transaction, modification, and deletion is logged with a timestamp and user identifier. Logs are tamper-evident and stored in a separate encrypted file.' },
                  { icon: 'verified', title: 'Installer Integrity', desc: 'Every release includes a SHA-256 checksum. Verify your download before installation to ensure authenticity.' },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 60}>
                    <div className="flex items-start gap-4 p-5 bg-surface dark:bg-surface-dim/70 rounded-xl border border-outline-variant/40 transition-all duration-200 hover:shadow-md">
                      <span className="material-symbols-outlined text-primary shrink-0 mt-0.5 fill" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                      <div>
                        <p className="font-semibold text-primary text-sm mb-1">{item.title}</p>
                        <p className="text-on-surface-alt text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div>
              <ScrollReveal delay={100}>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-8">What We Don&apos;t Do</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="bg-primary rounded-2xl p-8 mb-8">
                  <div className="space-y-5">
                    {[
                      { title: 'No Cloud Sync', desc: 'We don\'t offer — or want — access to your books.' },
                      { title: 'No Telemetry', desc: 'We collect zero usage data from the application. Ever.' },
                      { title: 'No Third-Party SDKs', desc: 'No analytics, ad networks, or tracking libraries embedded.' },
                      { title: 'No License Servers', desc: 'License validation is offline. The app works without internet, always.' },
                      { title: 'No Automatic Updates', desc: 'Updates are manual and user-initiated. You control when to upgrade.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-error/70 shrink-0">close</span>
                        <div>
                          <p className="font-semibold text-sm text-white">{item.title}</p>
                          <p className="text-blue-200 text-xs mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-error/10 dark:bg-error/10 border border-error/20 dark:border-error/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-error fill" style={{ fontVariationSettings: "'FILL' 1" }}>bug_report</span>
                    <p className="font-bold text-primary text-sm">Responsible Disclosure</p>
                  </div>
                  <p className="text-on-surface-alt text-xs leading-relaxed mb-4">
                    If you discover a security vulnerability in Hisaab-Pro, please report it privately via our secure channel. We will acknowledge receipt within 48 hours and provide a fix within 30 days.
                  </p>
                  <Link
                    href="/issue"
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                    Report a Vulnerability
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
