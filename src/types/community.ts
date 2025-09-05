export interface CommunityStats {
  totalContributors: number;
  totalStars: number;
  totalForks: number;
  activeDiscussions: number;
  totalServers: number;
  monthlyGrowth: number;
}

export interface ContributorProfile {
  login: string;
  avatar_url: string;
  contributions: number;
  name: string;
  company?: string;
  blog?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: number;
  description: string;
}

export interface FeaturedContent {
  id: string;
  title: string;
  description: string;
  type: 'tutorial' | 'use-case' | 'guide';
  url: string;
  author: string;
  publishedAt: string;
}
