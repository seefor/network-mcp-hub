# GitHub Pages Deployment Guide

This guide will help you deploy your Network MCP Hub to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed locally
- Node.js 18+ installed

## Step 1: Create GitHub Repository

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it `network-mcp-hub` (or your preferred name)
   - Make it public
   - Don't initialize with README (we already have one)

2. **Push your local code to GitHub**
   ```bash
   cd /Users/sifbaksh/work/q/network-mcp-hub
   git init
   git add .
   git commit -m "Initial commit with submission functionality"
   git branch -M main
   git remote add origin https://github.com/seefor/network-mcp-hub.git
   git push -u origin main
   ```

## Step 2: Configure GitHub Pages

1. **Go to repository Settings**
   - Navigate to your repository on GitHub
   - Click the "Settings" tab

2. **Configure Pages**
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select **"GitHub Actions"**
   - This will use the workflow file already configured in `.github/workflows/deploy.yml`

## Step 3: Update Configuration

The project is already configured for your GitHub username (`seefor`), but if you're using a different username, update these files:

1. **Update Vite config** (`vite.config.ts`):
   ```typescript
   base: '/your-repo-name/',
   ```

2. **Update meta tags** (`index.html`):
   ```html
   <meta property="og:url" content="https://YOUR_USERNAME.github.io/your-repo-name/" />
   ```

3. **Update README links** to point to your repository

## Step 4: Deploy

Once you push to the `main` branch, GitHub Actions will automatically:

1. Install dependencies
2. Build the project  
3. Deploy to GitHub Pages

You can monitor the deployment in the "Actions" tab of your repository.

## Step 5: Access Your Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/your-repo-name/
```

For example, if your username is `seefor`:
```
https://seefor.github.io/network-mcp-hub/
```

## Managing Submissions

### Processing Server Submissions

When users submit servers via the web form, they'll create GitHub Issues. To process them:

1. **Review the Issue**
   - Check the server information for completeness
   - Verify the repository exists and is accessible
   - Test the installation command if provided

2. **Add the Server**
   ```bash
   # If the user provided a JSON file
   npm run add-server path/to/server.json
   
   # Or manually add to public/data/servers.json
   ```

3. **Validate All Servers**
   ```bash
   npm run validate-servers
   ```

4. **Commit and Push**
   ```bash
   git add public/data/servers.json
   git commit -m "Add server: Server Name"
   git push
   ```

5. **Close the Issue** once deployed

### Validation

Always run validation before committing new servers:

```bash
# Validate all servers
npm run validate-servers

# Add a server from JSON file
npm run add-server new-server.json
```

## Troubleshooting

### Build Failures

If the GitHub Actions build fails:

1. Check the Actions tab for error details
2. Common issues:
   - TypeScript compilation errors
   - Invalid JSON in servers.json
   - Missing dependencies

### Site Not Loading

If your site doesn't load:

1. Check that GitHub Pages is enabled
2. Verify the base path in `vite.config.ts` matches your repository name
3. Ensure all assets are being served from the correct path

### Submission Form Issues

If users report submission issues:

1. Check the form validation logic
2. Verify GitHub Issues are being created correctly
3. Test the JSON download functionality

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` directory with your domain
2. Configure DNS records with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

## Security

- The site is served over HTTPS by default
- All submissions go through GitHub Issues (moderated)
- Server validation prevents malicious data entry
- No server-side processing or database required

## Maintenance

- Regularly review and approve server submissions
- Update dependencies with `npm update`
- Monitor GitHub Issues for bugs and feature requests
- Keep the server data clean and validated

---

For more help, see the [GitHub Pages documentation](https://docs.github.com/pages).
