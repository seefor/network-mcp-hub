#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Server schema validation
const VALID_CATEGORIES = ['database', 'filesystem', 'web-api', 'productivity', 'development', 'other']
const VALID_LANGUAGES = ['python', 'typescript', 'javascript', 'go', 'rust', 'other']
const VALID_COMPLEXITIES = ['beginner', 'intermediate', 'advanced']

function validateServer(server) {
  const errors = []

  // Required fields
  const requiredFields = ['id', 'name', 'description', 'author', 'repository', 'category', 'language', 'complexity', 'features', 'lastUpdated']
  
  for (const field of requiredFields) {
    if (!server[field]) {
      errors.push(`Missing required field: ${field}`)
    }
  }

  // Validate types and values
  if (server.category && !VALID_CATEGORIES.includes(server.category)) {
    errors.push(`Invalid category: ${server.category}. Must be one of: ${VALID_CATEGORIES.join(', ')}`)
  }

  if (server.language && !VALID_LANGUAGES.includes(server.language)) {
    errors.push(`Invalid language: ${server.language}. Must be one of: ${VALID_LANGUAGES.join(', ')}`)
  }

  if (server.complexity && !VALID_COMPLEXITIES.includes(server.complexity)) {
    errors.push(`Invalid complexity: ${server.complexity}. Must be one of: ${VALID_COMPLEXITIES.join(', ')}`)
  }

  // Validate arrays
  if (server.features && !Array.isArray(server.features)) {
    errors.push('Features must be an array')
  }

  if (server.tags && !Array.isArray(server.tags)) {
    errors.push('Tags must be an array')
  }

  // Validate URLs
  if (server.repository && !isValidUrl(server.repository)) {
    errors.push(`Invalid repository URL: ${server.repository}`)
  }

  if (server.documentation && !isValidUrl(server.documentation)) {
    errors.push(`Invalid documentation URL: ${server.documentation}`)
  }

  // Validate date format
  if (server.lastUpdated && !isValidDate(server.lastUpdated)) {
    errors.push(`Invalid date format: ${server.lastUpdated}. Expected YYYY-MM-DD`)
  }

  // Validate ID format
  if (server.id && !/^[a-z0-9-]+$/.test(server.id)) {
    errors.push(`Invalid ID format: ${server.id}. Must be lowercase letters, numbers, and hyphens only`)
  }

  return errors
}

function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false
  
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date) && date.toISOString().slice(0, 10) === dateString
}

async function addServer(newServer) {
  try {
    const serversPath = path.join(__dirname, '../public/data/servers.json')
    const data = await fs.readFile(serversPath, 'utf8')
    const servers = JSON.parse(data)

    // Validate the new server
    const errors = validateServer(newServer)
    if (errors.length > 0) {
      console.error('❌ Validation failed:')
      errors.forEach(error => console.error(`  - ${error}`))
      process.exit(1)
    }

    // Check for duplicate IDs
    if (servers.find(s => s.id === newServer.id)) {
      console.error(`❌ Server with ID '${newServer.id}' already exists`)
      process.exit(1)
    }

    // Add the server and sort by category then name
    servers.push(newServer)
    servers.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category)
      }
      return a.name.localeCompare(b.name)
    })

    // Write back to file
    await fs.writeFile(serversPath, JSON.stringify(servers, null, 2) + '\n')
    
    console.log(`✅ Successfully added server: ${newServer.name}`)
    console.log(`   ID: ${newServer.id}`)
    console.log(`   Category: ${newServer.category}`)
    console.log(`   Language: ${newServer.language}`)
    
  } catch (error) {
    console.error('❌ Error processing server:', error.message)
    process.exit(1)
  }
}

async function validateAllServers() {
  try {
    const serversPath = path.join(__dirname, '../public/data/servers.json')
    const data = await fs.readFile(serversPath, 'utf8')
    const servers = JSON.parse(data)

    let totalErrors = 0
    
    for (let i = 0; i < servers.length; i++) {
      const server = servers[i]
      const errors = validateServer(server)
      
      if (errors.length > 0) {
        console.error(`❌ Server "${server.name || 'Unknown'}" (index ${i}):`)
        errors.forEach(error => console.error(`  - ${error}`))
        totalErrors += errors.length
        console.error('')
      }
    }

    if (totalErrors === 0) {
      console.log(`✅ All ${servers.length} servers are valid!`)
    } else {
      console.error(`❌ Found ${totalErrors} validation errors across ${servers.length} servers`)
      process.exit(1)
    }
    
  } catch (error) {
    console.error('❌ Error validating servers:', error.message)
    process.exit(1)
  }
}

// CLI interface
const command = process.argv[2]

if (command === 'add' && process.argv[3]) {
  // Add server from JSON file
  const jsonFile = process.argv[3]
  try {
    const serverData = await fs.readFile(jsonFile, 'utf8')
    const server = JSON.parse(serverData)
    await addServer(server)
  } catch (error) {
    console.error(`❌ Error reading JSON file: ${error.message}`)
    process.exit(1)
  }
} else if (command === 'validate') {
  // Validate all existing servers
  await validateAllServers()
} else {
  console.log(`
📋 Server Management Script

Usage:
  node scripts/manage-servers.js add <server.json>    - Add a new server from JSON file
  node scripts/manage-servers.js validate             - Validate all existing servers

Examples:
  node scripts/manage-servers.js add new-server.json
  node scripts/manage-servers.js validate
`)
  process.exit(1)
}
