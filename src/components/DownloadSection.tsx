'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { fetchLatestRelease, fetchReleases, type GitHubRelease } from '@/lib/github';
import Skeleton from './Skeleton';
import ScrollReveal from './ScrollReveal';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function DownloadSection() {
  const [latest, setLatest] = useState<GitHubRelease | null>(null);
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    Promise.all([fetchLatestRelease(), fetchReleases()]).then(([lat, rels]) => {
      if (lat) setLatest(lat);
      if (rels) setReleases(rels);
      setLoading(false);
    });
  }, []);

  const toggleExpand = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10">
          <div className="lg:col-span-7 space-y-4">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container/80 dark:bg-secondary-container/20 text-on-secondary-container dark:text-on-secondary-container rounded-full">
                <span className="material-symbols-outlined text-[18px] fill" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  STABLE RELEASE {latest ? `v${latest.tag_name.replace('v', '')}` : ''}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight mt-6 mb-6">
                Download Hisaab-Pro
              </h1>
              <p className="text-on-surface-alt text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
                A professional-grade business ledger system for retail shops and small businesses. Fully offline, USB-portable, with encrypted local storage.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              {loading ? (
                <Skeleton className="h-20 w-80 rounded-xl" />
              ) : (
                <div className="flex flex-wrap gap-4">
                  {latest && latest.assets.filter(a => a.name.endsWith('.exe')).length > 0 ? (
                    latest.assets.filter(a => a.name.endsWith('.exe')).map((asset) => (
                      <motion.a
                        key={asset.name}
                        href={asset.browser_download_url}
                        className="flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                        whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                        whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                      >
                        <span className="material-symbols-outlined fill" style={{ fontVariationSettings: "'FILL' 1" }}>download</span>
                        <div className="text-left">
                          <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">DOWNLOAD FOR</div>
                          <div className="text-xl font-semibold">Windows <span className="text-sm opacity-80">v{latest.tag_name.replace('v', '')}</span></div>
                          <div className="text-[11px] opacity-70">{formatSize(asset.size)}</div>
                        </div>
                      </motion.a>
                    ))
                  ) : (
                    <motion.a
                      href="https://github.com/SolarisXD/Hisaab-Pro/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                      whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                    >
                      <span className="material-symbols-outlined fill" style={{ fontVariationSettings: "'FILL' 1" }}>download</span>
                      <div className="text-left">
                        <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">DOWNLOAD FOR</div>
                        <div className="text-xl font-semibold">Windows</div>
                        <div className="text-[11px] opacity-70">Check GitHub Releases</div>
                      </div>
                    </motion.a>
                  )}
                </div>
              )}
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <ScrollReveal delay={200}>
              <div className="bg-surface-alt dark:bg-surface-alt/50 rounded-2xl p-4 shadow-xl border border-outline-variant relative overflow-hidden">
                <Image
                  className="rounded-xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                  alt="Hisaab-Pro setup wizard interface"
                  src="/setup-wizard%20page%203.png"
                  width={500}
                  height={350}
                  unoptimized
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: 'memory', title: 'Requirements', items: [
              ['OS:', 'Windows 7+ (10/11 optimized)'],
              ['RAM:', '2GB Minimum (4GB Recommended)'],
              ['Storage:', '500MB Free Space'],
              ['Runtime:', 'Node.js v14-v19 (bundled)'],
            ]},
            { icon: 'verified', title: 'Features Included', items: [
              ['check_circle', 'Double-Entry Accounting'],
              ['check_circle', 'GST Compliant Reports'],
              ['check_circle', 'Staff & Payroll Management'],
              ['check_circle', 'AES-256 Encryption'],
            ]},
            { icon: 'info', title: 'Quick Info', items: [
              ['License:', 'MIT Open Source'],
              ['Platform:', 'Windows (x64)'],
              ['Portable:', 'USB Ready'],
              ['Support:', 'GitHub Issues'],
            ]},
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={prefersReduced ? undefined : cardVariants}
              initial={prefersReduced ? undefined : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              className="bg-surface dark:bg-surface-dim/70 p-6 sm:p-6 rounded-2xl border border-outline-variant/40 shadow-sm cursor-default"
              whileHover={prefersReduced ? undefined : { y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="w-12 h-12 bg-primary/5 dark:bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">{card.title}</h3>
              <ul className="space-y-2.5">
                {card.items.map(([label, value], j) => (
                  <li key={j} className="flex justify-between text-sm items-center">
                    <span className="text-on-surface-alt/70 flex items-center gap-1.5">
                      {card.title === 'Features Included' && (
                        <span className="material-symbols-outlined text-secondary text-[14px] fill" style={{ fontVariationSettings: "'FILL' 1" }}>{label}</span>
                      )}
                      {card.title !== 'Features Included' && label}
                    </span>
                    <span className="text-primary font-medium text-right">{value}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Changelog */}
      <section className="bg-surface dark:bg-surface-dim/30 border-y border-outline-variant/30 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary">Version History</h2>
              <span className="text-sm text-on-surface-alt">
                Updated: {releases.length > 0 ? formatDate(releases[0].published_at) : '...'}
              </span>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-xl" />
              ))}
            </div>
          ) : releases.length > 0 ? (
            <div className="space-y-4">
              {releases.map((release, i) => (
                <ScrollReveal key={release.tag_name} delay={i * 50}>
                  <div className="bg-surface dark:bg-surface-dim/70 rounded-xl border border-outline-variant/40 overflow-hidden transition-all duration-200 hover:border-outline-variant/70 shadow-sm">
                    <button
                      onClick={() => toggleExpand(i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                      aria-expanded={expanded.has(i)}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`w-2.5 h-2.5 rounded-full ${release.prerelease ? 'bg-amber-400' : 'bg-secondary'}`} />
                        <div>
                          <span className="font-semibold text-primary">{release.tag_name}</span>
                          {release.prerelease && (
                            <span className="ml-2 text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded">Pre-release</span>
                          )}
                          <div className="text-xs text-on-surface-alt/60 mt-0.5">{formatDate(release.published_at)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {release.assets.length > 0 && (
                          <span className="text-xs text-on-surface-alt/50">{release.assets.length} assets</span>
                        )}
                        <motion.span
                          className="material-symbols-outlined text-on-surface-alt"
                          animate={{ rotate: expanded.has(i) ? 180 : 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          expand_more
                        </motion.span>
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${expanded.has(i) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-4 border-t border-outline-variant/30 pt-4">
                        <div className="prose prose-sm max-w-none text-on-surface-alt whitespace-pre-wrap font-mono text-xs leading-relaxed mb-4">
                          {release.body?.slice(0, 1000)}
                          {release.body && release.body.length > 1000 ? '...' : ''}
                        </div>
                        {release.assets.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Downloads</span>
                            {release.assets.map((asset) => (
                              <a
                                key={asset.name}
                                href={asset.browser_download_url}
                                className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-surface-alt/50 dark:bg-surface-alt/50 hover:bg-surface-alt dark:hover:bg-surface-alt transition-colors text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="material-symbols-outlined text-on-surface-alt/50 text-[16px]">download</span>
                                  <span className="text-on-surface-alt">{asset.name}</span>
                                </div>
                                <span className="text-xs text-on-surface-alt/50">{formatSize(asset.size)}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-on-surface-alt">
              <p>Unable to load release data. View releases on{' '}
                <a href="https://github.com/SolarisXD/Hisaab-Pro/releases" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
