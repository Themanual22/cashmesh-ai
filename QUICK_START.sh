#!/bin/bash

# CashMesh AI - Quick Start Script
# This script automates the GitHub export process

set -e

echo "╔═══════════════════════════════════════════════════════╗"
echo "║     CashMesh AI - GitHub Export & Ownership Setup     ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Step 1: Verify Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"

# Step 2: Initialize Git repository
if [ ! -d .git ]; then
    echo ""
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Step 3: Configure Git user (if not already configured)
if [ -z "$(git config user.name)" ]; then
    echo ""
    echo "👤 Git user not configured. Please enter your details:"
    read -p "   Your name: " git_name
    read -p "   Your email: " git_email
    git config user.name "$git_name"
    git config user.email "$git_email"
    echo "✅ Git user configured"
else
    echo "✅ Git user already configured: $(git config user.name)"
fi

# Step 4: Create .gitignore
if [ ! -f .gitignore ]; then
    echo ""
    echo "📝 Creating .gitignore..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json
pnpm-lock.yaml
yarn.lock

# Environment variables
.env
.env.local
.env.*.local
.env.production.local

# Build outputs
dist/
build/
.next/
out/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*

# Testing
coverage/
.nyc_output/

# Misc
.cache/
.turbo/
EOF
    echo "✅ .gitignore created"
else
    echo "✅ .gitignore already exists"
fi

# Step 5: Add remote (if not already added)
if ! git remote get-url origin &> /dev/null; then
    echo ""
    echo "🔗 GitHub repository URL not configured."
    echo "   You can add it later with:"
    echo "   git remote add origin https://github.com/yourusername/cashmesh-ai.git"
    echo ""
else
    echo "✅ Remote origin already configured: $(git remote get-url origin)"
fi

# Step 6: Stage and commit
echo ""
echo "📦 Staging files..."
git add .
git add -A

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo ""
    echo "💾 Committing to Git..."
    git commit -m "Initial commit: CashMesh AI - AI-powered strategic automation platform"
    echo "✅ Files committed"
fi

# Step 7: Verify branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ]; then
    echo ""
    echo "🔄 Renaming branch to 'main'..."
    git branch -M main
    echo "✅ Branch renamed to main"
else
    echo "✅ Already on main branch"
fi

# Step 8: Summary
echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                    Setup Complete! ✅                 ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Create GitHub Repository:"
echo "   → Go to https://github.com/new"
echo "   → Create repository named 'cashmesh-ai'"
echo "   → Copy the HTTPS URL"
echo ""
echo "2️⃣  Add GitHub Remote:"
echo "   git remote add origin https://github.com/yourusername/cashmesh-ai.git"
echo ""
echo "3️⃣  Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "4️⃣  Deploy to Vercel:"
echo "   → Go to https://vercel.com"
echo "   → Click 'New Project'"
echo "   → Select your GitHub repository"
echo "   → Add environment variables"
echo "   → Deploy!"
echo ""
echo "📚 Documentation:"
echo "   • README.md - Project overview"
echo "   • SETUP.md - Detailed setup guide"
echo "   • CONNECTORS.md - Integration details"
echo "   • GITHUB_EXPORT.md - Full export guide"
echo ""
echo "🚀 You now own CashMesh AI!"
echo ""
