# Network MCP Hub

A community-driven hub for discovering and sharing Model Context Protocol (MCP) servers, tools, and resources.

🌐 **Live Site**: [https://seefor.github.io/network-mcp-hub/](https://seefor.github.io/network-mcp-hub/)

## Features

- **Browse MCP Servers**: Discover servers by category, language, and complexity
- **Advanced Search & Filtering**: Find exactly what you need with powerful search tools
- **Community Submissions**: Easy-to-use form for submitting new MCP servers
- **Detailed Server Information**: Installation commands, configuration examples, and feature lists
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/seefor/network-mcp-hub.git
cd network-mcp-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

### Building for Production

```bash
# Build the application
npm run build

# Preview the build locally
npm run preview
```

### Deploy to GitHub Pages

The project is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

To manually deploy:
```bash
npm run deploy
```

## Contributing New Servers

### Option 1: Using the Web Form (Recommended)

1. Visit [https://seefor.github.io/network-mcp-hub/submit](https://seefor.github.io/network-mcp-hub/submit)
2. Fill out the server information form
3. Preview your submission
4. Submit via GitHub Issue or download the JSON file

### Option 2: Manual JSON Submission

1. Create a new JSON file following the schema in `/public/data/servers.json`
2. Submit a pull request adding your server to the array

### Server Schema

```typescript
interface MCPServer {
  id: string;                    // Unique identifier (auto-generated from name)
  name: string;                  // Display name
  description: string;           // Brief description
  author: string;               // Author or organization
  repository: string;           // GitHub repository URL
  documentation?: string;       // Documentation URL (optional)
  tags: string[];              // Array of relevant tags
  category: 'database' | 'filesystem' | 'web-api' | 'productivity' | 'development' | 'other';
  language: 'python' | 'typescript' | 'javascript' | 'go' | 'rust' | 'other';
  complexity: 'beginner' | 'intermediate' | 'advanced';
  installCommand?: string;      // Installation command (optional)
  configExample?: string;       // JSON configuration example (optional)
  features: string[];          // Array of key features
  lastUpdated: string;         // Date in YYYY-MM-DD format
  stars?: number;              // GitHub stars (optional)
}
```

## Handling Submissions (For Maintainers)

### GitHub Issue Submissions

When users submit via the web form, they create GitHub issues with the following format:
- **Title**: "Add Server: [Server Name]"
- **Body**: Contains formatted server information and JSON data

To process:
1. Review the submission for accuracy and completeness
2. Copy the JSON data from the issue
3. Add it to `/public/data/servers.json`
4. Create a pull request with the changes
5. Close the issue once merged

### JSON File Submissions

For direct file submissions:
1. Validate the JSON schema
2. Check for duplicate IDs
3. Verify repository and documentation links
4. Add to `/public/data/servers.json` maintaining alphabetical order by category

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── navigation.tsx  # Main navigation component
│   ├── server-card.tsx # Server display card
│   └── ...
├── pages/              # Page components
│   ├── home.tsx       # Homepage
│   ├── servers.tsx    # Server browser
│   ├── submit/        # Server submission form
│   └── ...
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
└── App.tsx            # Main app component

public/
├── data/
│   └── servers.json   # Server data
└── ...
```

## Technologies Used

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Routing**: React Router DOM
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Create an issue for bug reports or feature requests
- Join the discussion in the [GitHub Discussions](https://github.com/sifbaksh/network-mcp-hub/discussions)
- Contribute to the [Model Context Protocol documentation](https://modelcontextprotocol.io)

---

Built with ❤️ for the MCP community
