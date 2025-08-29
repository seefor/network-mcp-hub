import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { MCPServer, FilterOptions } from "@/types/mcp"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getComplexityColor(complexity: string): string {
  switch (complexity) {
    case 'beginner':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'advanced':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'database':
      return '🗄️'
    case 'filesystem':
      return '📁'
    case 'web-api':
      return '🌐'
    case 'productivity':
      return '⚡'
    case 'development':
      return '🛠️'
    default:
      return '📦'
  }
}

export function filterServers(servers: MCPServer[], filters: FilterOptions): MCPServer[] {
  return servers.filter(server => {
    // Search query filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch = 
        server.name.toLowerCase().includes(searchLower) ||
        server.description.toLowerCase().includes(searchLower) ||
        server.author.toLowerCase().includes(searchLower) ||
        server.tags.some(tag => tag.toLowerCase().includes(searchLower))
      
      if (!matchesSearch) return false
    }

    // Category filter
    if (filters.category && filters.category !== 'all' && server.category !== filters.category) {
      return false
    }

    // Language filter
    if (filters.language && filters.language !== 'all' && server.language !== filters.language) {
      return false
    }

    // Complexity filter
    if (filters.complexity && filters.complexity !== 'all' && server.complexity !== filters.complexity) {
      return false
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        server.tags.some(serverTag => serverTag.toLowerCase().includes(tag.toLowerCase()))
      )
      if (!hasMatchingTag) return false
    }

    return true
  })
}

export function sortServers(servers: MCPServer[], sortBy: string, sortOrder: 'asc' | 'desc'): MCPServer[] {
  return [...servers].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'stars':
        comparison = (a.stars || 0) - (b.stars || 0)
        break
      case 'lastUpdated':
        comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        break
      case 'complexity':
        const complexityOrder = { beginner: 1, intermediate: 2, advanced: 3 }
        comparison = complexityOrder[a.complexity] - complexityOrder[b.complexity]
        break
      default:
        comparison = 0
    }

    return sortOrder === 'desc' ? -comparison : comparison
  })
}
