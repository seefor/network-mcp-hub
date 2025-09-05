import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  BookOpen, 
  Users, 
  GitPullRequest, 
  Github, 
  ExternalLink,
  Lightbulb,
  Code,
  Heart
} from 'lucide-react';
import { CommunityStats } from '@/components/CommunityStats';
import { ContributorGrid } from '@/components/ContributorGrid';
import { LearningPaths } from '@/components/LearningPaths';

const communityFeatures = [
  {
    icon: MessageSquare,
    title: 'GitHub Discussions',
    description: 'Join conversations about MCP development, share ideas, and get help from the community.',
    action: 'Join Discussions',
    href: 'https://github.com/seefor/network-mcp-hub/discussions',
  },
  {
    icon: BookOpen,
    title: 'Contributing Guide',
    description: 'Learn how to contribute new MCP servers, documentation, and improvements to the project.',
    action: 'View Guide',
    href: '/getting-started',
  },
  {
    icon: Code,
    title: 'Developer Resources',
    description: 'Access APIs, SDKs, and development tools to build your own MCP integrations.',
    action: 'Explore Resources',
    href: 'https://modelcontextprotocol.io/docs',
  },
  {
    icon: Lightbulb,
    title: 'Use Cases & Examples',
    description: 'Discover real-world implementations and learn from community success stories.',
    action: 'Browse Examples',
    href: '/servers',
  },
];

export function CommunityPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              <Heart className="h-3 w-3 mr-1" />
              Community Driven
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Join the{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MCP Community
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Connect with network automation experts, contribute to open-source MCP servers, 
              and help shape the future of AI-powered network management.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <a 
                  href="https://github.com/seefor/network-mcp-hub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a 
                  href="https://github.com/seefor/network-mcp-hub/discussions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Join Discussions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Community at a Glance
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              See how our community is growing and making an impact in network automation.
            </p>
          </div>
          <CommunityStats />
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get Involved
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Multiple ways to contribute and engage with the MCP community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityFeatures.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {feature.description}
                  </CardDescription>
                  <Button variant="outline" asChild>
                    <a 
                      href={feature.href}
                      target={feature.href.startsWith('http') ? '_blank' : undefined}
                      rel={feature.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2"
                    >
                      {feature.action}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Learning Paths
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Structured learning paths to master MCP development for network automation.
            </p>
          </div>
          <LearningPaths />
        </div>
      </section>

      {/* Top Contributors */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Top Contributors
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Meet the amazing people building the future of network automation with MCP.
            </p>
          </div>
          <ContributorGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Contribute?
            </h2>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Whether you're sharing a new MCP server, improving documentation, or helping others, 
              every contribution makes a difference.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary">
                <Link to="/submit" className="flex items-center gap-2">
                  <GitPullRequest className="h-4 w-4" />
                  Submit MCP Server
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <a 
                  href="https://github.com/seefor/network-mcp-hub/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Report Issue
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
