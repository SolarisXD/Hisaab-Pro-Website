'use client';

import Link from 'next/link';
import RepoStats from './RepoStats';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-alt border-t border-outline-variant/40 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-8">
          <div className="max-w-xs">
            <div className="text-lg font-bold text-primary mb-2">Hisaab-Pro</div>
            <p className="text-xs text-on-surface-alt leading-relaxed mb-4">
              Professional business ledger system for retail shops and small businesses. USB-portable, fully offline, AES-256 encrypted.
            </p>
            <RepoStats />
          </div>

          <div className="flex flex-wrap gap-10">
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-bold text-on-surface-alt/60 uppercase tracking-widest">Product</span>
              <Link href="/features" className="text-xs text-on-surface-alt hover:text-primary hover:underline underline-offset-4 transition-all">Features</Link>
              <Link href="/download" className="text-xs text-on-surface-alt hover:text-primary hover:underline underline-offset-4 transition-all">Download</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-bold text-on-surface-alt/60 uppercase tracking-widest">Support</span>
              <Link href="/contact" className="text-xs text-on-surface-alt hover:text-primary hover:underline underline-offset-4 transition-all">Contact Us</Link>
              <Link href="/issue" className="text-xs text-on-surface-alt hover:text-primary hover:underline underline-offset-4 transition-all">Report Issue</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-bold text-on-surface-alt/60 uppercase tracking-widest">Legal</span>
              <Link href="/privacy" className="text-xs text-on-surface-alt hover:text-primary hover:underline underline-offset-4 transition-all">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-on-surface-alt hover:text-primary hover:underline underline-offset-4 transition-all">Terms of Service</Link>
              <Link href="/security" className="text-xs text-on-surface-alt hover:text-primary hover:underline underline-offset-4 transition-all">Security</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-outline-variant/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on-surface-alt/60">
            &copy; {year} Rahul Gehlot. Licensed under MIT License.
          </p>
          <p className="text-xs text-on-surface-alt/60">
            View on{' '}
            <a
              href="https://github.com/SolarisXD/Hisaab-Pro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
