import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Star, GitFork, MessageSquare, Server, TrendingUp } from 'lucide-react';
import { CommunityStats as CommunityStatsType } from '@/types/community';
import { getRepositoryStats, getIssuesCount } from '@/utils/github';

export function CommunityStats() {
  const [stats, setStats] = useState<CommunityStatsType>({
    totalContributors: 0,
    totalStars: 0,
    totalForks: 0,
    activeDiscussions: 0,
    totalServers: 0,
    monthlyGrowth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Load static stats
        const response = await fetch('./data/community-stats.json');
        const staticStats = await response.json();
        
        // Load servers count
        const serversResponse = await fetch('./data/servers.json');
        const servers = await response.ok ? await serversResponse.json() : [];
        
        // Load GitHub stats
        const [repoStats, issuesCount] = await Promise.all([
          getRepositoryStats(),
          getIssuesCount(),
        ]);

        setStats({
          ...staticStats,
          totalServers: Array.isArray(servers) ? servers.length : staticStats.totalServers,
          totalStars: repoStats.totalStars || staticStats.totalStars,
          totalForks: repoStats.totalForks || staticStats.totalForks,
          activeDiscussions: issuesCount || staticStats.activeDiscussions,
        });
      } catch (error) {
        console.error('Failed to load community stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statItems = [
    {
      label: 'Contributors',
      value: stats.totalContributors,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      label: 'GitHub Stars',
      value: stats.totalStars,
      icon: Star,
      color: 'text-yellow-600',
    },
    {
      label: 'Forks',
      value: stats.totalForks,
      icon: GitFork,
      color: 'text-green-600',
    },
    {
      label: 'Active Discussions',
      value: stats.activeDiscussions,
      icon: MessageSquare,
      color: 'text-purple-600',
    },
    {
      label: 'MCP Servers',
      value: stats.totalServers,
      icon: Server,
      color: 'text-orange-600',
    },
    {
      label: 'Monthly Growth',
      value: `${stats.monthlyGrowth}%`,
      icon: TrendingUp,
      color: 'text-emerald-600',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-8 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statItems.map((item) => (
        <Card key={item.label} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-sm text-muted-foreground">{item.label}</span>
            </div>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
