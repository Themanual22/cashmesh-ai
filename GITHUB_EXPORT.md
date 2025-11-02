# CashMesh AI - GitHub Export & Ownership Transfer

Complete guide to export CashMesh AI to your own GitHub repository and take full ownership.

## What You're Getting

✅ **Full Source Code**
- React frontend with premium AI automation aesthetic
- Node.js backend with tRPC API
- All connectors: Stripe, OpenAI, Manus AI, Email
- Database schema and migrations
- Complete documentation

✅ **Production Ready**
- Tested payment flow
- Email automation
- Content generation pipeline
- Webhook infrastructure
- Error handling and validation

✅ **100% Ownership**
- No vendor lock-in
- Deploy anywhere
- Modify freely
- Commercial use allowed
- MIT License

---

## Step 1: Create GitHub Repository

### Option A: Create New Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `cashmesh-ai` (or your preferred name)
   - **Description:** "AI-powered strategic report generation platform"
   - **Visibility:** Public or Private
   - **Initialize:** Skip (we'll push existing code)
3. Click "Create repository"
4. Copy the repository URL (HTTPS or SSH)

### Option B: Fork Existing Repository

If CashMesh AI is available as a public template:
1. Go to the CashMesh AI repository
2. Click "Fork"
3. Choose your account
4. Click "Create fork"

---

## Step 2: Initialize Local Repository

```bash
cd /home/ubuntu/cashmesh_ai

# Initialize git
git init

# Add remote
git remote add origin https://github.com/yourusername/cashmesh-ai.git

# Verify remote
git remote -v
```

---

## Step 3: Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@github.com"
```

---

## Step 4: Create .gitignore

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json
pnpm-lock.yaml
yarn.lock

# Environment variables (NEVER commit these)
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
```

---

## Step 5: Commit Code to Git

```bash
# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CashMesh AI - AI-powered strategic automation platform"

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 6: Verify Repository

Visit `https://github.com/yourusername/cashmesh-ai`

You should see:
- ✅ All source code files
- ✅ README.md with setup instructions
- ✅ SETUP.md with deployment guide
- ✅ CONNECTORS.md with integration details
- ✅ .gitignore protecting sensitive files

---

## Step 7: Protect Sensitive Information

### Add Secrets to GitHub (for CI/CD)

1. Go to Repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `OPENAI_API_KEY`
   - `BUILT_IN_FORGE_API_KEY`

**IMPORTANT:** Never commit `.env.local` to GitHub

### Verify .gitignore

```bash
# Check that .env files are ignored
git check-ignore .env.local
# Should output: .env.local
```

---

## Step 8: Deploy to Vercel

### Option A: Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Configure:
   - **Framework:** Next.js (auto-detected)
   - **Root Directory:** ./
6. Add Environment Variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `OPENAI_API_KEY`
   - `BUILT_IN_FORGE_API_KEY`
7. Click "Deploy"

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow prompts to connect and deploy.

---

## Step 9: Configure Custom Domain (Optional)

### On Vercel

1. Go to Project Settings → Domains
2. Add custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (usually 5-10 minutes)

### Update Stripe Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Update endpoint URL to your new domain:
   ```
   https://yourdomain.com/api/trpc/webhook.handleStripeEvent
   ```

---

## Step 10: Verify Deployment

```bash
# Test payment endpoint
curl -X POST https://yourdomain.com/api/trpc/payment.createLink \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "customerName": "Test User",
      "customerEmail": "test@example.com",
      "topic": "Test",
      "packageType": "standard"
    }
  }'

# Should return valid Stripe payment link
```

---

## Repository Structure

Your GitHub repository will contain:

```
cashmesh-ai/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable UI
│   │   ├── lib/              # Utilities
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/               # Static assets
│   └── package.json
├── server/                    # Node.js backend
│   ├── routers/              # tRPC routers
│   │   ├── payment.ts
│   │   ├── content.ts
│   │   ├── email.ts
│   │   └── webhook.ts
│   ├── services/             # Business logic
│   │   ├── contentGenerator.ts
│   │   └── emailService.ts
│   └── _core/
├── shared/                    # Shared types
├── .gitignore
├── .env.example              # Template (no secrets)
├── README.md                 # Main documentation
├── SETUP.md                  # Deployment guide
├── CONNECTORS.md             # Integration details
├── GITHUB_EXPORT.md          # This file
├── package.json
└── tsconfig.json
```

---

## Making Changes & Updates

### Local Development

```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# ... edit files ...

# Commit changes
git add .
git commit -m "Add your feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Review → Merge to main
```

### Automatic Deployment

Once connected to Vercel:
- Every push to `main` → Automatic deployment
- Every pull request → Preview deployment
- Rollback available for any version

---

## Customization Guide

### 1. Update Branding

**Logo:**
- Replace `client/public/logo.svg` with your logo
- Update `client/public/favicon.ico`

**Colors:**
- Edit `client/src/index.css` CSS variables
- Update Tailwind theme in `tailwind.config.ts`

**Copy:**
- Edit `client/src/pages/Home.tsx` for landing page
- Update email templates in `server/services/emailService.ts`
- Modify pricing in `client/src/pages/Home.tsx`

### 2. Add Features

**Database:**
```bash
# Add database schema
# Edit server/db/schema.ts
# Run migrations
pnpm db:push
```

**New API Routes:**
```bash
# Create new router in server/routers/
# Add to server/routers.ts
# Test with curl
```

**Email Templates:**
```bash
# Edit server/services/emailService.ts
# Update HTML templates
# Test with curl
```

### 3. Scale for Production

- [ ] Set up PostgreSQL database
- [ ] Configure Redis for caching
- [ ] Add rate limiting
- [ ] Implement authentication
- [ ] Set up monitoring/logging
- [ ] Configure CDN for static assets
- [ ] Add analytics
- [ ] Set up backups

---

## Troubleshooting

### Git Push Fails

```
error: failed to push some refs to 'origin'
```

**Solution:**
```bash
# Pull latest changes first
git pull origin main

# Resolve conflicts if any
# Then push again
git push origin main
```

### Deployment Fails on Vercel

**Check logs:**
1. Go to Vercel Project → Deployments
2. Click failed deployment
3. View build logs
4. Common issues:
   - Missing environment variables
   - Build errors in TypeScript
   - Missing dependencies

**Solution:**
```bash
# Test locally first
npm run build
npm run start

# Fix issues
# Commit changes
# Push to GitHub
# Vercel will redeploy automatically
```

### Environment Variables Not Working

```bash
# Verify in Vercel dashboard
# Settings → Environment Variables

# Should have:
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- OPENAI_API_KEY
- BUILT_IN_FORGE_API_KEY
```

---

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys in code
- [ ] All secrets in Vercel dashboard
- [ ] HTTPS enabled
- [ ] Webhook signing verified
- [ ] Rate limiting configured
- [ ] Error logging without sensitive data
- [ ] Regular security updates

---

## Next Steps

1. **Customize branding** - Make it yours
2. **Add your domain** - Professional URL
3. **Configure analytics** - Track metrics
4. **Expand features** - Add more value
5. **Build community** - Share your platform

---

## Support

- **GitHub Issues:** Report bugs and request features
- **Documentation:** See README.md and SETUP.md
- **Email:** hello@cashmesh.ai

---

## You Now Own CashMesh AI

✅ Full source code on GitHub
✅ Deployed on Vercel (free tier)
✅ Custom domain support
✅ Automatic deployments
✅ Complete documentation
✅ All connectors verified
✅ Production ready

**Deploy it. Customize it. Build your business.**

---

## License

MIT License - Use, modify, and deploy freely

See LICENSE file for details
