import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Browse Servers", href: "/servers" },
  { name: "Getting Started", href: "/getting-started" },
  { name: "Submit Server", href: "/submit" },
  { name: "Documentation", href: "/docs" },
  { name: "Community", href: "/community" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Network MCP Hub</span>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl">Network MCP Hub</span>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open main menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors hover:text-primary",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/modelcontextprotocol/servers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              Contribute
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Network MCP Hub</span>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="font-bold text-xl">MCP Hub</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-accent",
                        location.pathname === item.href
                          ? "text-primary bg-accent"
                          : "text-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a
                      href="https://github.com/modelcontextprotocol/servers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Contribute
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                  <div className="flex justify-center">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
