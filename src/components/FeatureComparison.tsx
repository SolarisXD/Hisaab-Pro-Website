'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const comparisons = [
  { feature: 'Offline-First', hisaab: true, excel: true, cloud: false },
  { feature: 'Double-Entry Accounting', hisaab: true, excel: false, cloud: true },
  { feature: 'AES-256 Encryption', hisaab: true, excel: false, cloud: 'Partial' },
  { feature: 'USB Portable', hisaab: true, excel: false, cloud: false },
  { feature: 'Staff Payroll', hisaab: true, excel: false, cloud: 'Paid Add-on' },
  { feature: 'GST Compliant Reports', hisaab: true, excel: false, cloud: true },
  { feature: 'No Subscription', hisaab: true, excel: true, cloud: false },
  { feature: 'Data Privacy (No Cloud)', hisaab: true, excel: true, cloud: false },
];

function CheckIcon() {
  return <span className="material-symbols-outlined text-secondary fill text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>;
}

function CrossIcon() {
  return <span className="material-symbols-outlined text-on-surface-alt/40 text-[18px]">cancel</span>;
}

function PartialIcon() {
  return <span className="material-symbols-outlined text-amber-500 text-[18px]">remove_circle</span>;
}

function renderValue(val: boolean | string) {
  if (val === true) return <CheckIcon />;
  if (val === false) return <CrossIcon />;
  return <span className="flex items-center justify-center gap-1"><PartialIcon /><span className="text-xs text-amber-600 dark:text-amber-400">{val}</span></span>;
}

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.06,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function FeatureComparison() {
  return (
    <section className="py-16 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Hisaab-Pro vs Alternatives</h2>
          <p className="text-base sm:text-lg text-on-surface-alt max-w-2xl mx-auto">
            See how Hisaab-Pro compares to spreadsheets and cloud accounting tools.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="overflow-x-auto rounded-2xl border border-outline-variant/40 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary text-on-primary text-sm">
                <th className="px-6 py-4 font-semibold">Feature</th>
                <th className="px-6 py-4 font-semibold text-center">Hisaab-Pro</th>
                <th className="px-6 py-4 font-semibold text-center">Excel / Spreadsheets</th>
                <th className="px-6 py-4 font-semibold text-center">Cloud Accounting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm">
              {comparisons.map((row, i) => (
                <motion.tr
                  key={i}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '0px 0px -20px 0px' }}
                  className="even:bg-surface-alt/30 dark:even:bg-surface-alt/20 hover:bg-surface-alt/60 dark:hover:bg-surface-alt/40 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-primary">{row.feature}</td>
                  <td className="px-6 py-4 text-center">{renderValue(row.hisaab)}</td>
                  <td className="px-6 py-4 text-center">{renderValue(row.excel)}</td>
                  <td className="px-6 py-4 text-center">{renderValue(row.cloud)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </section>
  );
}
