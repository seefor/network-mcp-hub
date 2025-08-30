import { useState, useEffect, useMemo } from "react"
import { ServerCard } from "@/components/server-card"
import { SearchFilters } from "@/components/search-filters"
import { MCPServer, FilterOptions, SearchState } from "@/types/mcp"
import { filterServers, sortServers } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"

export function ServersPage() {
  const [servers, setServers] = useState<MCPServer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    filters: {},
    sortBy: "name",
    sortOrder: "asc",
  })

  // Load servers data
  useEffect(() => {
    const loadServers = async () => {
      try {
        // With base path restored, use the full GitHub Pages path
        console.log('Attempting to load servers...');
        const response = await fetch('/network-mcp-hub/data/servers.json');
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('✅ Successfully loaded servers:', data.length);
        setServers(data)
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    loadServers()
  }, [])

  // Filter and sort servers
  const filteredAndSortedServers = useMemo(() => {
    const filtered = filterServers(servers, { ...searchState.filters, search: searchState.query })
    return sortServers(filtered, searchState.sortBy, searchState.sortOrder)
  }, [servers, searchState])

  const handleFiltersChange = (filters: FilterOptions) => {
    setSearchState(prev => ({ ...prev, filters }))
  }

  const handleSearch = (query: string) => {
    setSearchState(prev => ({ ...prev, query }))
  }

  const handleSortChange = (sortBy: string) => {
    setSearchState(prev => ({
      ...prev,
      sortBy: sortBy as SearchState["sortBy"],
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === "asc" ? "desc" : "asc",
    }))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading MCP servers...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <p className="text-destructive mb-4">Error loading servers: {error}</p>
            <div className="space-y-3">
              <Button onClick={() => window.location.reload()}>Try Again</Button>
              <div className="text-sm text-muted-foreground">
                <p>If this problem persists, the site may still be deploying.</p>
                <p className="mt-2">
                  <a href="https://github.com/seefor/network-mcp-hub" className="text-primary hover:underline">
                    View on GitHub
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">MCP Servers</h1>
        <p className="text-muted-foreground text-lg">
          Discover and integrate powerful Model Context Protocol servers into your AI applications.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <SearchFilters
          filters={searchState.filters}
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          searchQuery={searchState.query}
          resultCount={filteredAndSortedServers.length}
        />
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Sort by:</span>
          <Select
            value={searchState.sortBy}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="lastUpdated">Last Updated</SelectItem>
              <SelectItem value="complexity">Complexity</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSearchState(prev => ({
                ...prev,
                sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
              }))
            }
            className="flex items-center gap-1"
          >
            <ArrowUpDown className="h-3 w-3" />
            {searchState.sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>
      </div>

      {/* Servers Grid */}
      {filteredAndSortedServers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            No servers found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchState({
                query: "",
                filters: {},
                sortBy: "name",
                sortOrder: "asc",
              })
            }}
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedServers.map((server) => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
      )}

      {/* Load More / Pagination could go here */}
      {filteredAndSortedServers.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedServers.length} of {servers.length} servers
          </p>
        </div>
      )}
    </div>
  )
}
