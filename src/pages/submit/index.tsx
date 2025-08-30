import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Github, Download, ExternalLink } from "lucide-react"
import { MCPServer } from "@/types/mcp"
import { toast } from "react-hot-toast"

export function SubmitPage() {
  const [formData, setFormData] = useState<Partial<MCPServer>>({
    name: "",
    description: "",
    author: "",
    repository: "",
    documentation: "",
    tags: [],
    category: undefined,
    language: undefined,
    complexity: undefined,
    installCommand: "",
    configExample: "",
    features: [""],
  })

  const [currentTag, setCurrentTag] = useState("")
  const [previewMode, setPreviewMode] = useState(false)

  const categories = [
    'database',
    'filesystem', 
    'web-api',
    'productivity',
    'development',
    'network',
    'firewall',
    'router',
    'nccm',
    'switches',
    'other'
  ]

  const languages = [
    'python',
    'typescript',
    'javascript',
    'go',
    'rust',
    'other'
  ]

  const complexities = [
    'beginner',
    'intermediate', 
    'advanced'
  ]

  const handleInputChange = (field: keyof MCPServer, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
      handleInputChange('tags', [...(formData.tags || []), currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags?.filter(tag => tag !== tagToRemove) || [])
  }

  const addFeature = () => {
    handleInputChange('features', [...(formData.features || []), ""])
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])]
    newFeatures[index] = value
    handleInputChange('features', newFeatures)
  }

  const removeFeature = (index: number) => {
    handleInputChange('features', formData.features?.filter((_, i) => i !== index) || [])
  }

  const generateId = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const validateForm = (): boolean => {
    const required = ['name', 'description', 'author', 'repository', 'category', 'language', 'complexity']
    return required.every(field => formData[field as keyof MCPServer])
  }

  const generateServerObject = (): MCPServer => {
    const today = new Date().toISOString().split('T')[0]
    return {
      id: generateId(formData.name || ''),
      name: formData.name || '',
      description: formData.description || '',
      author: formData.author || '',
      repository: formData.repository || '',
      documentation: formData.documentation,
      tags: formData.tags || [],
      category: formData.category as MCPServer['category'],
      language: formData.language as MCPServer['language'], 
      complexity: formData.complexity as MCPServer['complexity'],
      installCommand: formData.installCommand,
      configExample: formData.configExample,
      features: (formData.features || []).filter(f => f.trim() !== ''),
      lastUpdated: today,
      stars: 0,
    }
  }

  const downloadJSON = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    const serverData = generateServerObject()
    const blob = new Blob([JSON.stringify(serverData, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${serverData.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Server data downloaded! You can now submit it via GitHub.")
  }

  const createGitHubIssue = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    const serverData = generateServerObject()
    const issueTitle = `Add Server: ${serverData.name}`
    const issueBody = `## New MCP Server Submission

**Server Name:** ${serverData.name}
**Author:** ${serverData.author}
**Repository:** ${serverData.repository}
**Category:** ${serverData.category}
**Language:** ${serverData.language}
**Complexity:** ${serverData.complexity}

**Description:**
${serverData.description}

**Features:**
${serverData.features.map(f => `- ${f}`).join('\n')}

**Installation Command:**
\`\`\`
${serverData.installCommand}
\`\`\`

**Configuration Example:**
\`\`\`json
${serverData.configExample}
\`\`\`

**Tags:** ${serverData.tags.join(', ')}

**Server JSON Data:**
\`\`\`json
${JSON.stringify(serverData, null, 2)}
\`\`\`

---
*This submission was created using the Network MCP Hub submission form.*`

    const githubUrl = `https://github.com/seefor/network-mcp-hub/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`
    window.open(githubUrl, '_blank')
    toast.success("Opening GitHub to create submission issue...")
  }

  if (previewMode) {
    const serverData = generateServerObject()
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(false)}
            >
              ← Back to Form
            </Button>
            <h1 className="text-2xl font-bold">Preview Server Listing</h1>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-1">{serverData.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-2">
                    by {serverData.author}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{serverData.category}</Badge>
                  <Badge variant="outline">{serverData.complexity}</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{serverData.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {serverData.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>
              
              {serverData.tags.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {serverData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" asChild>
                  <a href={serverData.repository} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3 w-3 mr-1" />
                    Repository
                  </a>
                </Button>
                {serverData.documentation && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={serverData.documentation} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Docs
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex gap-3">
            <Button onClick={createGitHubIssue} className="flex-1">
              <Github className="h-4 w-4 mr-2" />
              Submit via GitHub Issue
            </Button>
            <Button onClick={downloadJSON} variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download JSON
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Submit MCP Server</h1>
          <p className="text-muted-foreground text-lg">
            Share your MCP server with the community
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Server Information</CardTitle>
            <CardDescription>
              Fill out the form below to submit your MCP server to the community hub.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Server Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., SQLite Server"
                />
              </div>
              
              <div>
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author || ''}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="e.g., MCP Team"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what your server does and its key benefits..."
                rows={3}
              />
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="repository">Repository URL *</Label>
                <Input
                  id="repository"
                  value={formData.repository || ''}
                  onChange={(e) => handleInputChange('repository', e.target.value)}
                  placeholder="https://github.com/user/repo"
                />
              </div>
              
              <div>
                <Label htmlFor="documentation">Documentation URL</Label>
                <Input
                  id="documentation"
                  value={formData.documentation || ''}
                  onChange={(e) => handleInputChange('documentation', e.target.value)}
                  placeholder="https://docs.example.com"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Category *</Label>
                <Select 
                  value={formData.category || ''} 
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Language *</Label>
                <Select 
                  value={formData.language || ''} 
                  onValueChange={(value) => handleInputChange('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Complexity *</Label>
                <Select 
                  value={formData.complexity || ''} 
                  onValueChange={(value) => handleInputChange('complexity', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    {complexities.map(comp => (
                      <SelectItem key={comp} value={comp}>
                        {comp.charAt(0).toUpperCase() + comp.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-3 w-3 p-0 ml-1 hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Installation */}
            <div>
              <Label htmlFor="installCommand">Installation Command</Label>
              <Input
                id="installCommand"
                value={formData.installCommand || ''}
                onChange={(e) => handleInputChange('installCommand', e.target.value)}
                placeholder="e.g., pip install mcp-server-name"
              />
            </div>

            {/* Config Example */}
            <div>
              <Label htmlFor="configExample">Configuration Example</Label>
              <Textarea
                id="configExample"
                value={formData.configExample || ''}
                onChange={(e) => handleInputChange('configExample', e.target.value)}
                placeholder="JSON configuration example..."
                rows={4}
                className="font-mono text-sm"
              />
            </div>

            {/* Features */}
            <div>
              <Label>Features</Label>
              <div className="space-y-2">
                {(formData.features || []).map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Describe a key feature..."
                    />
                    {(formData.features?.length || 0) > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" onClick={addFeature} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => setPreviewMode(true)}
                disabled={!validateForm()}
                className="flex-1"
              >
                Preview & Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
