import { Link } from "react-router-dom"
import { ArrowRight, Database, FileText, Globe, Zap, Users, Code, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { MCPServer } from "@/types/mcp"

const features = [
  {
    icon: Database,
    title: "Database Integration",
    description: "Connect to SQLite, PostgreSQL, Redis, and more with secure, ready-to-use MCP servers.",
  },
  {
    icon: FileText,
    title: "File Operations",
    description: "Safely read, write, and manage files with built-in security controls and access restrictions.",
  },
  {
    icon: Globe,
    title: "Web APIs",
    description: "Integrate with GitHub, Slack, Notion, and hundreds of other web services seamlessly.",
  },
  {
    icon: Zap,
    title: "Productivity Tools",
    description: "Automate calendars, emails, and workflows to boost your AI assistant's capabilities.",
  },
]

export function HomePage() {
  const [servers, setServers] = useState<MCPServer[]>([])
  const [latestServer, setLatestServer] = useState<MCPServer | null>(null)

  useEffect(() => {
    const loadServers = async () => {
      try {
        const response = await fetch('/data/servers.json')
        if (!response.ok) return
        const serverData: MCPServer[] = await response.json()
        setServers(serverData)
        const latest = serverData.sort((a: MCPServer, b: MCPServer) => 
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        )[0]
        setLatestServer(latest)
      } catch (err) {
        console.error('Failed to load servers:', err)
      }
    }
    loadServers()
  }, [])

  const categories = [...new Set(servers.map(s => s.category))]
  const languages = [...new Set(servers.map(s => s.language))]
  
  const stats = [
    { label: "MCP Servers", value: servers.length.toString() },
    { label: "Categories", value: categories.length.toString() },
    { label: "Languages", value: languages.length.toString() },
    { label: "Contributors", value: "100+" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Model Context Protocol Hub
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Discover Powerful{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MCP Servers
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A community-driven collection of Model Context Protocol servers, tools, and resources. 
              Find the perfect integrations to supercharge your AI applications.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link to="/servers" className="flex items-center gap-2">
                  Browse Servers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/getting-started">Getting Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to extend AI capabilities
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              MCP servers provide secure, standardized ways to connect AI assistants to external systems and data sources.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
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
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Server Section */}
      {latestServer && (
        <section className="py-20 bg-muted/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Latest MCP Server
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Check out the most recently added server to the community.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{latestServer.name}</CardTitle>
                    <Badge variant="outline">{latestServer.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>by {latestServer.author}</span>
                    <span>•</span>
                    <span>{latestServer.language}</span>
                    <span>•</span>
                    <span>{latestServer.lastUpdated}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {latestServer.description.split('\n')[0]}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {latestServer.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/servers" className="flex items-center gap-2">
                  View All Servers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join the growing community of developers building the future of AI integrations.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/getting-started" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Get Started
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/submit" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Submit Server
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/modelcontextprotocol/servers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Join Community
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
