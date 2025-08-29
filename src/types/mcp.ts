export interface MCPServer {
  id: string;
  name: string;
  description: string;
  author: string;
  repository: string;
  documentation?: string;
  tags: string[];
  category: 'database' | 'filesystem' | 'web-api' | 'productivity' | 'development' | 'other';
  language: 'python' | 'typescript' | 'javascript' | 'go' | 'rust' | 'other';
  complexity: 'beginner' | 'intermediate' | 'advanced';
  installCommand?: string;
  configExample?: string;
  features: string[];
  lastUpdated: string;
  stars?: number;
}

export interface MCPCollection {
  id: string;
  name: string;
  description: string;
  author: string;
  servers: string[]; // Array of server IDs
  tags: string[];
  lastUpdated: string;
}

export interface FilterOptions {
  category?: string;
  language?: string;
  complexity?: string;
  tags?: string[];
  search?: string;
}

export interface SearchState {
  query: string;
  filters: FilterOptions;
  sortBy: 'name' | 'stars' | 'lastUpdated' | 'complexity';
  sortOrder: 'asc' | 'desc';
}
