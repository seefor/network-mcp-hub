import { ContributorProfile, CommunityStats } from '@/types/community';

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'seefor';
const REPO_NAME = 'network-mcp-hub';

// Cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchWithCache<T>(url: string): Promise<T> {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data = await response.json();
    cache.set(url, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    console.error('GitHub API fetch error:', error);
    throw error;
  }
}

export async function getRepositoryStats(): Promise<Partial<CommunityStats>> {
  try {
    const repo: any = await fetchWithCache(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`);
    return {
      totalStars: repo.stargazers_count || 0,
      totalForks: repo.forks_count || 0,
    };
  } catch (error) {
    console.error('Failed to fetch repository stats:', error);
    return { totalStars: 0, totalForks: 0 };
  }
}

export async function getContributors(): Promise<ContributorProfile[]> {
  try {
    const contributors: any[] = await fetchWithCache(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contributors`);
    
    // Get detailed info for top contributors
    const detailedContributors = await Promise.all(
      contributors.slice(0, 12).map(async (contributor: any) => {
        try {
          const userDetails: any = await fetchWithCache(`${GITHUB_API_BASE}/users/${contributor.login}`);
          return {
            login: contributor.login,
            avatar_url: contributor.avatar_url,
            contributions: contributor.contributions,
            name: userDetails.name || contributor.login,
            company: userDetails.company,
            blog: userDetails.blog,
          };
        } catch {
          return {
            login: contributor.login,
            avatar_url: contributor.avatar_url,
            contributions: contributor.contributions,
            name: contributor.login,
          };
        }
      })
    );

    return detailedContributors;
  } catch (error) {
    console.error('Failed to fetch contributors:', error);
    return [];
  }
}

export async function getIssuesCount(): Promise<number> {
  try {
    const issues = await fetchWithCache(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open`);
    return Array.isArray(issues) ? issues.length : 0;
  } catch (error) {
    console.error('Failed to fetch issues count:', error);
    return 0;
  }
}
