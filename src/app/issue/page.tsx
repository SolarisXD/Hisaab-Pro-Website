'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Toast from '@/components/Toast';
import { fetchReleases } from '@/lib/github';

export default function IssuePage() {
  useEffect(() => { document.title = 'Report Issue - Hisaab-Pro'; }, []);

interface FormData {
  name: string;
  email: string;
  version: string;
  issue_type: string;
  description: string;
  steps: string;
  file: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  description?: string;
}

  const [form, setForm] = useState<FormData>({
    name: '', email: '', version: '', issue_type: 'ledger', description: '', steps: '', file: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [versions, setVersions] = useState<string[]>([]);
  const [filePreview, setFilePreview] = useState<string>('');
  const [dropActive, setDropActive] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false, message: '', type: 'success',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchReleases().then((rels) => {
      if (rels) setVersions(rels.map((r) => r.tag_name));
    });
  }, []);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.description.trim()) errs.description = 'Description is required';
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const issueTitle = `[${form.issue_type.toUpperCase()}] Issue reported by ${form.name}`;
    const issueBody = `**Reporter:** ${form.name} (${form.email})\n**Version:** ${form.version || 'Unknown'}\n\n**Description:**\n${form.description}\n\n**Steps to Reproduce:**\n${form.steps || 'Not provided'}`;
    const url = `https://github.com/SolarisXD/Hisaab-Pro/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
    
    window.open(url, '_blank');
    setToast({ visible: true, message: 'Redirecting to GitHub Issues...', type: 'success' });
    setForm({ name: '', email: '', version: '', issue_type: 'ledger', description: '', steps: '', file: null });
    setFilePreview('');
  };

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setToast({ visible: true, message: 'File too large. Max 5MB.', type: 'error' });
      return;
    }
    setForm({ ...form, file });
    setFilePreview(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDropActive(true);
  };
  const handleDragLeave = () => setDropActive(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <ScrollReveal>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">Technical Support</h1>
              <p className="text-base sm:text-lg text-on-surface-alt">Our engineering team prioritizes reports submitted via this secure channel.</p>
            </div>
          </ScrollReveal>

          <div className="bg-surface dark:bg-surface-dim/70 p-6 rounded-xl border border-outline-variant/40 space-y-4 shadow-sm">
            {[
              { icon: 'verified_user', title: 'Encrypted Submission', desc: 'All diagnostic logs and issue descriptions are transmitted using end-to-end industry-standard encryption.' },
              { icon: 'history', title: 'Track Progress', desc: 'Upon submission, you will receive a unique tracking ticket to follow the resolution status.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-on-surface-alt">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>


        </div>

        <div className="lg:col-span-8">
          <ScrollReveal delay={80}>
            <div className="bg-surface dark:bg-surface-dim/70 p-6 sm:p-10 rounded-2xl shadow-sm border border-outline-variant/40">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="issue-name" className="text-[10px] font-bold text-on-surface-alt uppercase tracking-widest">FULL NAME</label>
                    <input
                      id="issue-name"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-error' : 'border-outline-variant'} bg-surface-bright dark:bg-surface-dim/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm`}
                      placeholder="Arjun Sharma"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="text-xs text-error" role="alert">{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="issue-email" className="text-[10px] font-bold text-on-surface-alt uppercase tracking-widest">PROFESSIONAL EMAIL</label>
                    <input
                      id="issue-email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-error' : 'border-outline-variant'} bg-surface-bright dark:bg-surface-dim/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm`}
                      placeholder="you@business.com"
                      type="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-xs text-error" role="alert">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="issue-version" className="text-[10px] font-bold text-on-surface-alt uppercase tracking-widest">APPLICATION VERSION</label>
                    <select
                      id="issue-version"
                      value={form.version}
                      onChange={(e) => setForm({ ...form, version: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bright dark:bg-surface-dim/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm appearance-none"
                    >
                      <option value="">{versions.length > 0 ? 'Select version' : 'Loading versions...'}</option>
                      {versions.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="issue-category" className="text-[10px] font-bold text-on-surface-alt uppercase tracking-widest">ISSUE CATEGORY</label>
                    <select
                      id="issue-category"
                      value={form.issue_type}
                      onChange={(e) => setForm({ ...form, issue_type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bright dark:bg-surface-dim/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm appearance-none"
                    >
                      <option value="ledger">Ledger Inconsistency</option>
                      <option value="gst">GST Calculation Error</option>
                      <option value="performance">Performance Lag</option>
                      <option value="ui">UI/UX Layout Issue</option>
                      <option value="export">Export Failure (PDF/Excel)</option>
                      <option value="other">Other Technical Query</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="issue-description" className="text-[10px] font-bold text-on-surface-alt uppercase tracking-widest">DETAILED DESCRIPTION</label>
                  <textarea
                    id="issue-description"
                    value={form.description}
                    onChange={(e) => { setForm({ ...form, description: e.target.value }); setErrors({ ...errors, description: undefined }); }}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-error' : 'border-outline-variant'} bg-surface-bright dark:bg-surface-dim/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm`}
                    placeholder="Briefly describe what happened and how it affected your workflow..."
                    rows={4}
                    aria-required="true"
                    aria-invalid={!!errors.description}
                  />
                  {errors.description && <p className="text-xs text-error" role="alert">{errors.description}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="issue-steps" className="text-[10px] font-bold text-on-surface-alt uppercase tracking-widest">STEPS TO REPRODUCE</label>
                  <textarea
                    id="issue-steps"
                    value={form.steps}
                    onChange={(e) => setForm({ ...form, steps: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-bright dark:bg-surface-dim/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-mono"
                    placeholder="1. Go to Ledger...
2. Click Export...
3. Observe the crash..."
                    rows={3}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="issue-file" className="text-[10px] font-bold text-on-surface-alt uppercase tracking-widest">SUPPORTING DOCUMENTS / SCREENSHOTS</label>
                  <div
                    className={`flex items-center justify-center w-full ${dropActive ? 'border-primary' : 'border-outline-variant'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-surface-bright dark:bg-surface-dim/30 hover:bg-surface-alt dark:hover:bg-surface-alt/50 transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <span className="material-symbols-outlined text-on-surface-alt/40 group-hover:text-primary transition-colors text-2xl">cloud_upload</span>
                        <p className="mb-1 text-sm text-on-surface-alt mt-2">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-on-surface-alt/50">PNG, JPG or PDF (MAX. 5MB)</p>
                      </div>
                      <input
                        id="issue-file"
                        ref={fileInputRef}
                        className="hidden"
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={(e) => handleFile(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>
                  {filePreview && (
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-alt/50 dark:bg-surface-alt/50 text-sm text-on-surface-alt mt-2">
                      <span className="material-symbols-outlined text-secondary text-[16px] fill" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                      {filePreview}
                      <button
                        onClick={() => { setForm({ ...form, file: null }); setFilePreview(''); }}
                        className="ml-auto text-on-surface-alt/50 hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-secondary">
                    <span className="material-symbols-outlined text-sm fill" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Secure Channel</span>
                  </div>
                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg flex items-center gap-2 disabled:opacity-60"
                  >
                    <>
                      Submit Report
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </>
                  </button>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </div>
  );
}
