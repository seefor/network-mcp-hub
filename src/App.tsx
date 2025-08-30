import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { HomePage } from "@/pages/home"
import { ServersPage } from "@/pages/servers"
import { GettingStartedPage } from "@/pages/getting-started"
import { SubmitPage } from "@/pages/submit"

// Placeholder components for other pages
function DocsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-4">Documentation</h1>
      <p className="text-muted-foreground">
        Comprehensive documentation for MCP servers and integration guides.
      </p>
    </div>
  )
}

function CommunityPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-4">Community</h1>
      <p className="text-muted-foreground">
        Connect with other developers building with MCP.
      </p>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a href="/" className="text-primary hover:underline">
          Go back home
        </a>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="mcp-hub-theme">
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/servers" element={<ServersPage />} />
              <Route path="/getting-started" element={<GettingStartedPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              {/* Catch-all route for GitHub Pages */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
