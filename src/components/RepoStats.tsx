'use client';

import { useEffect, useState } from 'react';
import { fetchRepo } from '@/lib/github';

interface RepoStatsData {
  stars: number;
  forks: number;
  description: string;
  license: string;
}

export default function RepoStats() {
  const [data, setData] = useState<RepoStatsData | null>(null);

  useEffect(() => {
    fetchRepo().then((repo) => {
      if (!repo) return;
      setData({
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        description: repo.description,
        license: repo.license?.spdx_id || 'MIT',
      });
    });
  }, []);

  if (!data) return null;

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface-alt">
      <span className="flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">star</span>
        {data.stars.toLocaleString()} stars
      </span>
      <span className="flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">call_split</span>
        {data.forks.toLocaleString()} forks
      </span>
      <span className="px-2 py-0.5 rounded-full bg-surface-alt text-[11px] font-medium">
        {data.license}
      </span>
    </div>
  );
}
