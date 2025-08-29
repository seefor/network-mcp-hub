import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FilterOptions } from "@/types/mcp"

interface SearchFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onSearch: (query: string) => void
  searchQuery: string
  resultCount: number
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "database", label: "Database" },
  { value: "filesystem", label: "File System" },
  { value: "web-api", label: "Web API" },
  { value: "productivity", label: "Productivity" },
  { value: "development", label: "Development" },
  { value: "other", label: "Other" },
]

const languages = [
  { value: "all", label: "All Languages" },
  { value: "python", label: "Python" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "other", label: "Other" },
]

const complexityLevels = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

export function SearchFilters({
  filters,
  onFiltersChange,
  onSearch,
  searchQuery,
  resultCount,
}: SearchFiltersProps) {
  const hasActiveFilters = 
    (filters.category && filters.category !== "all") ||
    (filters.language && filters.language !== "all") ||
    (filters.complexity && filters.complexity !== "all") ||
    (filters.tags && filters.tags.length > 0)

  const clearFilters = () => {
    onFiltersChange({
      category: "all",
      language: "all",
      complexity: "all",
      tags: [],
    })
    onSearch("")
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = filters.tags?.filter(tag => tag !== tagToRemove) || []
    onFiltersChange({ ...filters, tags: newTags })
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search servers, tools, or authors..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10"
          aria-label="Search MCP servers"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>

        <Select
          value={filters.category || "all"}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, category: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.language || "all"}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, language: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language.value} value={language.value}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.complexity || "all"}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, complexity: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Complexity" />
          </SelectTrigger>
          <SelectContent>
            {complexityLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Tags */}
      {filters.tags && filters.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active tags:</span>
          {filters.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
              onClick={() => removeTag(tag)}
            >
              {tag}
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? "server" : "servers"} found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>
    </div>
  )
}
