# CashMesh AI - Setup & Deployment Guide

Complete guide to configure and deploy CashMesh AI on your own infrastructure.

## Prerequisites

- Node.js 18+ (https://nodejs.org)
- npm or pnpm
- Git
- Stripe account (https://stripe.com)
- (Optional) OpenAI account (https://platform.openai.com)
- (Optional) Manus AI account (https://manus.ai)

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/cashmesh-ai.git
cd cashmesh_ai
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

#### Required: Stripe
1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Secret Key** (starts with `sk_live_` or `sk_test_`)
3. Paste into `STRIPE_SECRET_KEY`

#### Optional: Email (Uses fallback if not set)
**Using Gmail:**
1. Enable 2-Factor Authentication on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Create App Password for "Mail" on "Windows Computer"
4. Copy the 16-character password
5. Set:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```

**Using Other Providers:**
- Gmail: `smtp.gmail.com:587`
- Outlook: `smtp-mail.outlook.com:587`
- SendGrid: `smtp.sendgrid.net:587`
- AWS SES: `email-smtp.region.amazonaws.com:587`

#### Optional: Content Generation

**Option A: Manus AI (Recommended)**
1. Sign up at https://manus.ai
2. Get API key from dashboard
3. Set `BUILT_IN_FORGE_API_KEY=your-key-here`

**Option B: OpenAI (Fallback)**
1. Sign up at https://platform.openai.com
2. Create API key at https://platform.openai.com/api-keys
3. Set `OPENAI_API_KEY=sk-your-key-here`

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Stripe Configuration

### Create Products

1. Go to https://dashboard.stripe.com/products
2. Create 3 products:

**Standard Package**
- Name: Standard Package
- Price: $49 USD (one-time)
- Copy Price ID (starts with `price_`)

**Premium Package**
- Name: Premium Package
- Price: $149 USD (one-time)
- Copy Price ID

**Enterprise Package**
- Name: Enterprise Package
- Price: $499 USD (one-time)
- Copy Price ID

### Setup Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/trpc/webhook.handleStripeEvent`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
5. Copy **Signing secret** (starts with `whsec_`)
6. Set `STRIPE_WEBHOOK_SECRET=whsec_your-secret-here`

## Deploy to Vercel (Recommended)

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow prompts to connect your GitHub repository.

### Option 2: GitHub Integration

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/cashmesh-ai.git
git push -u origin main
```

2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `OPENAI_API_KEY` (optional)
   - `BUILT_IN_FORGE_API_KEY` (optional)
   - `SMTP_USER` (optional)
   - `SMTP_PASSWORD` (optional)
6. Click "Deploy"

### Option 3: Docker

```bash
docker build -t cashmesh-ai .
docker run -p 3000:3000 \
  -e STRIPE_SECRET_KEY=your-key \
  -e STRIPE_WEBHOOK_SECRET=your-secret \
  cashmesh-ai
```

## Deploy to Other Platforms

### Railway
1. Go to https://railway.app
2. Create new project
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Self-Hosted (VPS)

```bash
# SSH into your server
ssh user@your-server.com

# Clone repository
git clone https://github.com/yourusername/cashmesh-ai.git
cd cashmesh_ai

# Install dependencies
npm install

# Build
npm run build

# Start with PM2 (process manager)
npm install -g pm2
pm2 start "npm start" --name cashmesh-ai
pm2 save
```

## Custom Domain

### On Vercel
1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Follow DNS setup instructions

### On Other Platforms
1. Update DNS records to point to your server
2. Configure SSL certificate (Let's Encrypt recommended)
3. Update webhook URL in Stripe dashboard

## Testing

### Test Payment Flow
```bash
curl -X POST http://localhost:3000/api/trpc/payment.createLink \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "customerName": "Test User",
      "customerEmail": "test@example.com",
      "topic": "AI automation strategy",
      "packageType": "standard"
    }
  }'
```

Expected response:
```json
{
  "result": {
    "data": {
      "json": {
        "success": true,
        "paymentLink": "https://buy.stripe.com/...",
        "paymentLinkId": "plink_..."
      }
    }
  }
}
```

### Test Content Generation
```bash
curl -X POST http://localhost:3000/api/trpc/content.generateReport \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "customerName": "Test User",
      "customerEmail": "test@example.com",
      "topic": "AI customer service automation",
      "packageType": "premium",
      "addOns": []
    }
  }'
```

### Test Email
```bash
curl -X POST http://localhost:3000/api/trpc/email.sendOrderConfirmation \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "customerName": "Test User",
      "customerEmail": "test@example.com",
      "topic": "AI automation",
      "packageType": "standard",
      "amount": 4900,
      "orderId": "test_order_123"
    }
  }'
```

## Troubleshooting

### Payment Link Not Creating
```
Error: Neither apiKey nor config.authenticator provided
```
**Solution:** Verify `STRIPE_SECRET_KEY` is set correctly in `.env.local`

### Content Generation Failing
```
Error: OPENAI_API_KEY not configured
```
**Solution:** Set either `OPENAI_API_KEY` or `BUILT_IN_FORGE_API_KEY`

### Emails Not Sending
```
Error: Missing credentials for "PLAIN"
```
**Solution:** 
- If using Gmail, verify App Password is correct
- If not using email, it's okay - emails log to console in fallback mode

### Webhook Not Receiving Events
```
Stripe webhook not triggering
```
**Solution:**
- Verify webhook URL in Stripe dashboard matches your domain
- Check firewall/security groups allow HTTPS
- Verify `STRIPE_WEBHOOK_SECRET` is correct

## Production Checklist

- [ ] Use production Stripe keys (not test keys)
- [ ] Set strong `JWT_SECRET`
- [ ] Enable HTTPS
- [ ] Configure custom domain
- [ ] Set up email with real SMTP provider
- [ ] Configure content generation API keys
- [ ] Set up database backups
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Configure rate limiting
- [ ] Review security settings

## Next Steps

1. **Customize Branding**
   - Update logo in `client/public/logo.svg`
   - Modify colors in `client/src/index.css`
   - Update copy in `client/src/pages/Home.tsx`

2. **Add Database**
   - Set up PostgreSQL
   - Run migrations
   - Enable customer tracking

3. **Integrate Analytics**
   - Set up Mixpanel or Segment
   - Track conversion funnel
   - Monitor key metrics

4. **Expand Features**
   - Add subscription management
   - Create admin dashboard
   - Build customer portal

## Support

- GitHub Issues: Report bugs and request features
- Email: hello@cashmesh.ai
- Documentation: See README.md

## License

MIT - Use, modify, and deploy freely

---

**You now own CashMesh AI. Deploy it, customize it, and build your business.**
