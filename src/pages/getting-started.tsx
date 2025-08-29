import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download, Settings, Play, CheckCircle } from "lucide-react"

const steps = [
  {
    title: "Install MCP Client",
    description: "Choose your preferred AI assistant that supports MCP",
    icon: Download,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          MCP is supported by various AI assistants. Choose one to get started:
        </p>
        <div className="grid gap-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Claude Desktop</p>
              <p className="text-sm text-muted-foreground">Official Anthropic client</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer">
                Download
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Cline (VS Code)</p>
              <p className="text-sm text-muted-foreground">VS Code extension</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev" target="_blank" rel="noopener noreferrer">
                Install
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Configure MCP Server",
    description: "Add MCP servers to your client configuration",
    icon: Settings,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Configure your MCP client to use servers. Here's an example configuration:
        </p>
        <div className="bg-muted p-4 rounded-lg">
          <code className="text-sm">
            <pre>{`{
  "mcpServers": {
    "filesystem": {
      "command": "mcp-server-filesystem",
      "args": ["/safe/directory"]
    },
    "sqlite": {
      "command": "mcp-server-sqlite",
      "args": ["path/to/database.db"]
    }
  }
}`}</pre>
          </code>
        </div>
        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Configuration location varies by client. Check your client's documentation for the exact path.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Install MCP Servers",
    description: "Install the MCP servers you want to use",
    icon: Download,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Install MCP servers using your preferred package manager:
        </p>
        <div className="space-y-3">
          <div>
            <p className="font-medium text-sm mb-2">Python servers (pip):</p>
            <code className="block text-sm bg-muted p-2 rounded">
              pip install mcp-server-filesystem mcp-server-sqlite
            </code>
          </div>
          <div>
            <p className="font-medium text-sm mb-2">Node.js servers (npm):</p>
            <code className="block text-sm bg-muted p-2 rounded">
              npm install -g mcp-web-scraper mcp-calendar-server
            </code>
          </div>
          <div>
            <p className="font-medium text-sm mb-2">Go servers:</p>
            <code className="block text-sm bg-muted p-2 rounded">
              go install github.com/devops-tools/mcp-docker@latest
            </code>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Start Using MCP",
    description: "Begin interacting with your configured servers",
    icon: Play,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Once configured, you can start using MCP servers in your conversations:
        </p>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <p className="font-medium text-sm mb-1">Example prompts:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• "List the files in my project directory"</li>
              <li>• "Query my SQLite database for user data"</li>
              <li>• "Create a new GitHub issue for this bug"</li>
              <li>• "Schedule a meeting for next Tuesday"</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-800 dark:text-green-200">
            Your AI assistant will automatically use the appropriate MCP server based on your request.
          </p>
        </div>
      </div>
    ),
  },
]

const quickStart = [
  {
    title: "Filesystem Server",
    description: "Safe file operations with access controls",
    command: "pip install mcp-server-filesystem",
    config: `{
  "filesystem": {
    "command": "mcp-server-filesystem",
    "args": ["/your/safe/directory"]
  }
}`,
  },
  {
    title: "SQLite Server",
    description: "Query SQLite databases",
    command: "pip install mcp-server-sqlite",
    config: `{
  "sqlite": {
    "command": "mcp-server-sqlite",
    "args": ["path/to/database.db"]
  }
}`,
  },
]

export function GettingStartedPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Getting Started with MCP</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn how to set up and use Model Context Protocol servers to extend your AI assistant's capabilities.
        </p>
      </div>

      {/* What is MCP Section */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              What is MCP?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The Model Context Protocol (MCP) is an open standard that enables AI assistants to securely connect to external data sources and tools. 
              MCP servers provide a standardized way to expose capabilities like file system access, database queries, API integrations, and more.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">🔒 Secure</h4>
                <p className="text-sm text-muted-foreground">Built-in security controls and access restrictions</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">🔌 Standardized</h4>
                <p className="text-sm text-muted-foreground">Consistent interface across different tools and services</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">🚀 Extensible</h4>
                <p className="text-sm text-muted-foreground">Easy to add new capabilities and integrations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Step-by-step Guide */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Step-by-Step Setup</h2>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <step.icon className="h-5 w-5" />
                      {step.title}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {step.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Start Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Quick Start Examples</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {quickStart.map((example, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Install:</p>
                  <code className="block text-sm bg-muted p-2 rounded">
                    {example.command}
                  </code>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Configuration:</p>
                  <code className="block text-sm bg-muted p-2 rounded whitespace-pre">
                    {example.config}
                  </code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Additional Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Official Documentation</CardTitle>
              <CardDescription>Complete MCP specification and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">
                  Read Docs
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">GitHub Repository</CardTitle>
              <CardDescription>Source code and community servers</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Community Discord</CardTitle>
              <CardDescription>Get help and share your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a href="https://discord.gg/modelcontextprotocol" target="_blank" rel="noopener noreferrer">
                  Join Discord
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
