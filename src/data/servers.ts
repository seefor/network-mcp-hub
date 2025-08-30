import { MCPServer } from '@/types/mcp'

export const servers: MCPServer[] = [
{
  "id": "cisco-aci-mcp",
  "name": "CISCO ACI MCP",
  "description": "MCP (Model Context Protocol) for Cisco APIC\nThis project provides a simple MCP (Model Context Protocol) server that interacts with a Cisco APIC controller. If you'd like to understand how this works in detail, please check out this blog post\n\nTested with Claude Desktop and Visual Studio Code in Agent mode with Copilot.\nThe server runs in STDIO mode, intended for local execution.",
  "author": "cpaggen",
  "repository": "https://github.com/datacenter/MCP_server_for_Cisco_ACI",
  "documentation": "https://github.com/datacenter/MCP_server_for_Cisco_ACI/blob/master/README.md",
  "tags": [
    "cisco",
    "aci",
    "mcp",
    "network"
  ],
  "category": "network" as const,
  "language": "python" as const,
  "complexity": "intermediate" as const,
  "installCommand": "",
  "configExample": "{\n  \"servers\": {\n    \"ciscoApicServer\": {\n      \"type\": \"stdio\",\n      \"command\": \"C:\\\\Users\\\\cpaggen\\\\.local\\\\bin\\\\uv.EXE\",\n      \"args\": [\n        \"run\",\n        \"--with\",\n        \"mcp[cli]\",\n        \"mcp\",\n        \"run\",\n        \"C:\\\\MCP\\\\app\\\\main.py\"\n      ]\n    }\n  }\n}",
  "features": [
    "Exposes two tools for APIC interaction (see app/main.py for details). ",
    "Easily configurable via environment variables."
  ],
  "lastUpdated": "2025-08-30",
  "stars": 0
}
];
