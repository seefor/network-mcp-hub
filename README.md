# Network MCP Hub

A modern, community-driven web application for discovering and sharing Model Context Protocol (MCP) servers, tools, and resources.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Advanced Search & Filtering**: Find MCP servers by category, language, complexity, and tags
- **Community Submissions**: Easy-to-use web form for submitting new MCP servers
- **Server Cards**: Rich information display with installation instructions and examples
- **Modern UI**: Built with shadcn/ui components and Radix UI primitives
- **TypeScript**: Full type safety throughout the application
- **GitHub Pages Ready**: Optimized for static deployment

## 🛠️ Tech Stack

- **Framework**: Vite + React 18 with TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React and Radix Icons
- **Routing**: React Router DOM
- **Notifications**: react-hot-toast
- **Build Tool**: Vite with GitHub Pages optimization

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/seefor/network-mcp-hub.git
   cd network-mcp-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
network-mcp-hub/
├── public/
│   └── data/
│       └── servers.json          # MCP server data
├── src/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── navigation.tsx        # Main navigation
│   │   ├── server-card.tsx       # MCP server display card
│   │   ├── search-filters.tsx    # Search and filter controls
│   │   ├── theme-provider.tsx    # Theme context provider
│   │   └── theme-toggle.tsx      # Dark/light mode toggle
│   ├── pages/
│   │   ├── home.tsx             # Landing page
│   │   ├── servers.tsx          # Server browser page
│   │   └── getting-started.tsx  # Setup guide
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── types/
│   │   └── mcp.ts               # TypeScript type definitions
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── package.json
```

## 🎨 Customization

### Adding New MCP Servers

**Option 1: Using the Web Form (Recommended)**
1. Visit the [Submit Server page](https://seefor.github.io/network-mcp-hub/submit)
2. Fill out the comprehensive form with your server details
3. Preview your submission
4. Submit via GitHub Issue or download the JSON file

**Option 2: Manual JSON Edit**
1. Edit `public/data/servers.json`
2. Add your server following the `MCPServer` interface:

```typescript
{
  "id": "unique-server-id",
  "name": "Server Name",
  "description": "Server description",
  "author": "Author Name",
  "repository": "https://github.com/...",
  "documentation": "https://...",
  "tags": ["tag1", "tag2"],
  "category": "database|filesystem|web-api|productivity|development|other",
  "language": "python|typescript|javascript|go|rust|other",
  "complexity": "beginner|intermediate|advanced",
  "installCommand": "pip install server-name",
  "configExample": "{\n  \"command\": \"server-name\"\n}",
  "features": ["Feature 1", "Feature 2"],
  "lastUpdated": "2024-01-15",
  "stars": 100
}
```

### Theming

The application uses CSS variables for theming. Modify `src/index.css` to customize colors:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... other variables */
}
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Update navigation in `src/components/navigation.tsx`

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Configure repository settings**
   - Go to Settings > Pages
   - Set source to "GitHub Actions"

2. **Update configuration**
   - Modify `vite.config.ts` base path to match your repository name
   - Update meta tags in `index.html`

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

The GitHub Actions workflow will automatically deploy on pushes to the main branch.

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (configure as needed)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding MCP Servers

We welcome contributions of new MCP servers! Please ensure:

- Server is functional and well-documented
- Follows MCP specification
- Includes proper installation instructions
- Has appropriate tags and categorization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) for the specification
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives

## 📞 Support

- 📖 [Documentation](https://modelcontextprotocol.io/)
- 💬 [Discord Community](https://discord.gg/modelcontextprotocol)
- 🐛 [Issue Tracker](https://github.com/seefor/network-mcp-hub/issues)

---

Built with ❤️ for the MCP community
