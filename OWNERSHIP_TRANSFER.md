# CashMesh AI - Ownership Transfer Checklist

Complete checklist to take full ownership of CashMesh AI and deploy it on your own infrastructure.

## ✅ What You're Receiving

- [x] Full source code (React + Node.js)
- [x] Premium AI automation landing page
- [x] Stripe payment integration (verified)
- [x] Content generation pipeline (Manus + OpenAI)
- [x] Email automation system (SMTP/Gmail)
- [x] Webhook infrastructure
- [x] Complete documentation
- [x] MIT License (commercial use allowed)
- [x] Git repository ready for GitHub
- [x] Deployment guides (Vercel, Docker, VPS)

---

## Phase 1: GitHub Setup (5 minutes)

- [ ] **1.1** Create GitHub account (if needed)
  - Go to https://github.com/signup
  - Verify email

- [ ] **1.2** Create new repository
  - Go to https://github.com/new
  - Name: `cashmesh-ai`
  - Description: "AI-powered strategic report generation platform"
  - Visibility: Public or Private
  - Click "Create repository"
  - Copy repository URL

- [ ] **1.3** Add GitHub remote
  ```bash
  cd /home/ubuntu/cashmesh_ai
  git remote add origin https://github.com/yourusername/cashmesh-ai.git
  ```

- [ ] **1.4** Push code to GitHub
  ```bash
  git push -u origin main
  ```

- [ ] **1.5** Verify on GitHub
  - Visit https://github.com/yourusername/cashmesh-ai
  - Confirm all files are present

---

## Phase 2: Stripe Configuration (10 minutes)

- [ ] **2.1** Create Stripe account
  - Go to https://stripe.com
  - Sign up
  - Complete verification

- [ ] **2.2** Get API keys
  - Dashboard → Developers → API Keys
  - Copy Secret Key (sk_live_...)
  - Save securely

- [ ] **2.3** Create products
  - Dashboard → Products → New
  - Create 3 products:
    - Standard: $49
    - Premium: $149
    - Enterprise: $499
  - Copy each Price ID

- [ ] **2.4** Configure webhook
  - Dashboard → Developers → Webhooks
  - Add endpoint: `https://yourdomain.com/api/trpc/webhook.handleStripeEvent`
  - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
  - Copy Signing Secret (whsec_...)

- [ ] **2.5** Store credentials securely
  - Save STRIPE_SECRET_KEY
  - Save STRIPE_WEBHOOK_SECRET
  - Keep in password manager

---

## Phase 3: Content Generation Setup (5 minutes)

Choose at least one (Manus recommended, OpenAI as fallback):

### Option A: Manus AI (Recommended)
- [ ] **3A.1** Create Manus account
  - Go to https://manus.ai
  - Sign up
  - Create API key

- [ ] **3A.2** Save API key
  - BUILT_IN_FORGE_API_KEY
  - BUILT_IN_FORGE_API_URL=https://api.manus.ai

### Option B: OpenAI (Fallback)
- [ ] **3B.1** Create OpenAI account
  - Go to https://platform.openai.com
  - Sign up
  - Verify phone

- [ ] **3B.2** Create API key
  - Dashboard → API Keys
  - Create new secret key
  - Copy key (sk_...)

- [ ] **3B.3** Set usage limits
  - Dashboard → Billing → Usage limits
  - Set monthly budget ($10-20)

---

## Phase 4: Email Configuration (Optional, 5 minutes)

### Option A: Gmail (Recommended for testing)
- [ ] **4A.1** Enable 2-Factor Authentication
  - Go to https://myaccount.google.com/security
  - Enable 2-Step Verification

- [ ] **4A.2** Create App Password
  - Go to https://myaccount.google.com/apppasswords
  - Select "Mail" and "Windows Computer"
  - Copy 16-character password

- [ ] **4A.3** Configure SMTP
  - SMTP_HOST=smtp.gmail.com
  - SMTP_PORT=587
  - SMTP_USER=your-email@gmail.com
  - SMTP_PASSWORD=your-app-password

### Option B: Other Providers
- [ ] **4B.1** Choose provider
  - Outlook: smtp-mail.outlook.com:587
  - SendGrid: smtp.sendgrid.net:587
  - AWS SES: email-smtp.region.amazonaws.com:587

- [ ] **4B.2** Get credentials
  - Username
  - Password/API key

### Option C: Skip for Now
- [ ] **4C.1** Use fallback mode
  - Emails will log to console
  - Useful for testing
  - Configure real email later

---

## Phase 5: Vercel Deployment (10 minutes)

- [ ] **5.1** Create Vercel account
  - Go to https://vercel.com
  - Sign up with GitHub

- [ ] **5.2** Import GitHub repository
  - Click "New Project"
  - Select "Import Git Repository"
  - Choose your cashmesh-ai repository

- [ ] **5.3** Configure project
  - Framework: Auto-detected
  - Root Directory: ./
  - Click "Continue"

- [ ] **5.4** Add environment variables
  - STRIPE_SECRET_KEY
  - STRIPE_WEBHOOK_SECRET
  - OPENAI_API_KEY (if using)
  - BUILT_IN_FORGE_API_KEY (if using)
  - SMTP_HOST (if using email)
  - SMTP_USER (if using email)
  - SMTP_PASSWORD (if using email)

- [ ] **5.5** Deploy
  - Click "Deploy"
  - Wait for build to complete (2-3 minutes)
  - Visit deployment URL

- [ ] **5.6** Verify deployment
  ```bash
  curl -X POST https://yourdomain.vercel.app/api/trpc/payment.createLink \
    -H "Content-Type: application/json" \
    -d '{
      "json": {
        "customerName": "Test",
        "customerEmail": "test@example.com",
        "topic": "Test",
        "packageType": "standard"
      }
    }'
  ```

---

## Phase 6: Custom Domain Setup (Optional, 5 minutes)

- [ ] **6.1** Register domain
  - GoDaddy, Namecheap, Google Domains, etc.
  - Cost: $10-15/year

- [ ] **6.2** Connect to Vercel
  - Vercel Project → Settings → Domains
  - Add your domain
  - Follow DNS setup instructions

- [ ] **6.3** Update Stripe webhook
  - Stripe Dashboard → Webhooks
  - Edit endpoint
  - Update URL to: `https://yourdomain.com/api/trpc/webhook.handleStripeEvent`

- [ ] **6.4** Verify SSL
  - Wait 5-10 minutes for SSL certificate
  - Visit https://yourdomain.com
  - Confirm HTTPS works

---

## Phase 7: Testing & Verification (10 minutes)

- [ ] **7.1** Test payment flow
  - Visit your site
  - Fill out form
  - Click "Proceed to Payment"
  - Verify Stripe payment page loads

- [ ] **7.2** Test content generation
  - Complete a test payment (use Stripe test card: 4242 4242 4242 4242)
  - Verify content generates
  - Check email (if configured)

- [ ] **7.3** Test webhook
  - Stripe Dashboard → Events
  - Verify payment_intent.succeeded event received
  - Check webhook delivery status

- [ ] **7.4** Monitor logs
  - Vercel Dashboard → Deployments → Logs
  - Check for errors
  - Verify all systems operational

---

## Phase 8: Security Hardening (10 minutes)

- [ ] **8.1** Verify .gitignore
  ```bash
  git check-ignore .env.local
  # Should output: .env.local
  ```

- [ ] **8.2** Check for committed secrets
  ```bash
  git log -p | grep -i "api_key\|secret" | head
  # Should return nothing
  ```

- [ ] **8.3** Enable GitHub security
  - Repository Settings → Security
  - Enable branch protection on main
  - Require pull request reviews

- [ ] **8.4** Rotate API keys (after 90 days)
  - Stripe: Create new key, update Vercel
  - OpenAI: Create new key, update Vercel
  - Manus: Create new key, update Vercel

---

## Phase 9: Customization (20 minutes)

- [ ] **9.1** Update branding
  - Replace logo: `client/public/logo.svg`
  - Update colors: `client/src/index.css`
  - Modify copy: `client/src/pages/Home.tsx`

- [ ] **9.2** Update pricing
  - Edit package names
  - Adjust prices
  - Modify add-ons

- [ ] **9.3** Update email templates
  - Edit: `server/services/emailService.ts`
  - Customize subject lines
  - Update company name/email

- [ ] **9.4** Commit changes
  ```bash
  git add .
  git commit -m "Customize branding and pricing"
  git push origin main
  ```

- [ ] **9.5** Verify deployment
  - Vercel auto-deploys on push
  - Wait 2-3 minutes
  - Visit site and verify changes

---

## Phase 10: Launch & Monitoring (Ongoing)

- [ ] **10.1** Announce launch
  - Share on social media
  - Send to email list
  - Tell friends/colleagues

- [ ] **10.2** Monitor metrics
  - Vercel Analytics
  - Stripe Dashboard
  - Email delivery
  - Error logs

- [ ] **10.3** Collect feedback
  - Monitor customer emails
  - Track support requests
  - Iterate on features

- [ ] **10.4** Plan improvements
  - Add database integration
  - Build admin dashboard
  - Implement analytics
  - Expand features

---

## Troubleshooting

### Payment Link Not Working
- [ ] Verify STRIPE_SECRET_KEY in Vercel
- [ ] Check Stripe API key is live (not test)
- [ ] Confirm products exist in Stripe

### Emails Not Sending
- [ ] Verify SMTP credentials if configured
- [ ] Check email logs in Vercel
- [ ] Test with fallback mode first

### Deployment Failed
- [ ] Check Vercel build logs
- [ ] Verify all environment variables set
- [ ] Test locally: `npm run build`

### Webhook Not Triggering
- [ ] Verify webhook URL in Stripe
- [ ] Check STRIPE_WEBHOOK_SECRET
- [ ] Monitor Stripe Events dashboard

---

## Support Resources

- **GitHub Issues:** Report bugs, request features
- **Stripe Support:** https://support.stripe.com
- **Vercel Support:** https://vercel.com/support
- **OpenAI Support:** https://help.openai.com
- **Manus Support:** https://manus.ai/support

---

## Final Checklist

- [ ] GitHub repository created and code pushed
- [ ] Stripe account configured with products and webhook
- [ ] Content generation API key set (Manus or OpenAI)
- [ ] Email configured (or fallback acceptable)
- [ ] Deployed to Vercel
- [ ] Custom domain configured (optional)
- [ ] All systems tested and verified
- [ ] Security hardening complete
- [ ] Branding customized
- [ ] Ready for launch!

---

## Congratulations! 🎉

You now own CashMesh AI. It's fully deployed, production-ready, and completely under your control.

**Next Steps:**
1. Customize it to match your brand
2. Add more features
3. Scale your business
4. Build your empire

**Questions?** Check the documentation:
- README.md - Overview
- SETUP.md - Detailed setup
- CONNECTORS.md - Integration details
- GITHUB_EXPORT.md - GitHub guide

**You've got this!** 🚀
