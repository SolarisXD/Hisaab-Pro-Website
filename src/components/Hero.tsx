'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { fetchLatestRelease, type GitHubRelease } from '@/lib/github';
import RepoStats from './RepoStats';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [latestRelease, setLatestRelease] = useState<GitHubRelease | null>(null);

  useEffect(() => {
    fetchLatestRelease().then((release) => {
      if (release) setLatestRelease(release);
    });
  }, []);

  const downloadUrl = latestRelease?.assets.find(a => a.name.endsWith('.exe'))?.browser_download_url || '/download';
  const versionText = latestRelease ? `v${latestRelease.tag_name.replace('v', '')}` : 'v1.0.0';

  const content = (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
      <div className="space-y-8 z-10 relative">
        <motion.div variants={childVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-primary text-sm font-semibold border border-primary/20 bg-primary/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            100% OFFLINE & SECURE
          </div>
        </motion.div>
        
        <motion.h1 
          variants={childVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight font-display"
        >
          Professional <br className="hidden sm:block" />
          <span className="text-gradient">Business Ledger</span><br />
          System
        </motion.h1>
        
        <motion.p 
          variants={childVariants}
          className="text-lg sm:text-xl text-text-muted max-w-xl leading-relaxed"
        >
          A state-of-the-art business ledger system for retail shops and small businesses. Fully offline, USB-portable, with encrypted local storage.
        </motion.p>
        
        <motion.div variants={childVariants} className="flex flex-wrap gap-4 pt-4">
          <Link
            href={downloadUrl}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-background bg-primary overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,255,157,0.4)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative material-symbols-outlined fill text-xl">download</span>
            <span className="relative">Download {versionText}</span>
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-text-main border border-border glass-panel hover:border-primary/50 transition-all duration-300"
          >
            View Features
          </Link>
        </motion.div>
        
        <motion.div variants={childVariants} className="pt-8 border-t border-border mt-8">
          <RepoStats />
        </motion.div>
      </div>

      <motion.div 
        variants={childVariants}
        className="relative lg:ml-10 z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full animate-pulse-glow -z-10"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-secondary/30 blur-[80px] rounded-full -z-10 animate-float"></div>
        
        <div className="relative glass-panel rounded-2xl p-2 shadow-2xl border border-white/10 dark:border-white/5 transform transition-transform duration-500 hover:rotate-1 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 rounded-2xl pointer-events-none"></div>
          <Image
            alt="Hisaab-Pro Interface"
            className="rounded-xl shadow-inner w-full h-auto object-cover border border-white/5"
            src="/dashboard-hero.png"
            width={800}
            height={500}
            priority
            unoptimized
          />
          
          <div className="absolute -bottom-8 -left-8 glass-panel p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-float">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background">
              <span className="material-symbols-outlined fill text-2xl">database</span>
            </div>
            <div>
              <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">LOCAL DATA</div>
              <div className="text-sm font-bold text-text-main">No Cloud Required</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section className="relative px-6 py-24 sm:py-32 max-w-7xl mx-auto overflow-visible">
      {prefersReduced ? (
        content
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {content}
        </motion.div>
      )}
    </section>
  );
}
