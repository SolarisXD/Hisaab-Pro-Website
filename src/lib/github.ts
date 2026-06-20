export interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  description: string;
  license: { spdx_id: string } | null;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  prerelease: boolean;
  assets: { name: string; download_count: number; browser_download_url: string; size: number }[];
}

const REPO = 'SolarisXD/Hisaab-Pro';

export async function fetchRepo(): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchReleases(): Promise<GitHubRelease[]> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=20`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
