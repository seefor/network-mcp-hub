import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Building } from 'lucide-react';
import { ContributorProfile } from '@/types/community';
import { getContributors } from '@/utils/github';

export function ContributorGrid() {
  const [contributors, setContributors] = useState<ContributorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContributors = async () => {
      try {
        const data = await getContributors();
        setContributors(data);
      } catch (error) {
        console.error('Failed to load contributors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContributors();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-muted rounded-full mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {contributors.map((contributor) => (
        <Card key={contributor.login} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={contributor.avatar_url}
                alt={contributor.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{contributor.name}</h3>
                <p className="text-sm text-muted-foreground">@{contributor.login}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="secondary">
                {contributor.contributions} contributions
              </Badge>
              
              {contributor.company && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="h-3 w-3" />
                  <span className="truncate">{contributor.company}</span>
                </div>
              )}
              
              <a
                href={`https://github.com/${contributor.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View Profile
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
