import { ExternalLink, Github, Star, Calendar, User, Code, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MCPServer } from "@/types/mcp"
import { formatDate, getComplexityColor, getCategoryIcon } from "@/lib/utils"

interface ServerCardProps {
  server: MCPServer
}

export function ServerCard({ server }: ServerCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={`${server.category} category`}>
              {getCategoryIcon(server.category)}
            </span>
            <div>
              <CardTitle className="text-lg leading-tight">{server.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getComplexityColor(server.complexity)}>
                  {server.complexity}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {server.language}
                </Badge>
              </div>
            </div>
          </div>
          {server.stars && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-current text-yellow-500" />
              <span>{server.stars}</span>
            </div>
          )}
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {server.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {server.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {server.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{server.tags.length - 4} more
            </Badge>
          )}
        </div>

        {/* Features */}
        {server.features.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Key Features
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {server.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-primary mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
              {server.features.length > 3 && (
                <li className="text-xs italic">
                  +{server.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Install Command */}
        {server.installCommand && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Code className="h-3 w-3" />
              Quick Install
            </h4>
            <code className="block text-xs bg-muted p-2 rounded font-mono break-all">
              {server.installCommand}
            </code>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t flex flex-col gap-3">
        {/* Author and Date */}
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{server.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(server.lastUpdated)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <a
              href={server.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <Github className="h-3 w-3" />
              Repository
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          {server.documentation && (
            <Button variant="default" size="sm" asChild className="flex-1">
              <a
                href={server.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
              >
                Docs
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
