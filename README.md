# CashMesh AI - Strategic Automation Platform

Premium AI-powered strategic report generation and automation platform. Submit your business challenge, receive a comprehensive AI-generated strategic report within 2 hours.

## Features

- **Premium Landing Page** - Neural network aesthetic with conversion optimization
- **Stripe Payment Integration** - 3 pricing tiers (Standard $49, Premium $149, Enterprise $499)
- **AI Content Generation** - Manus Agent + OpenAI fallback for strategic reports
- **Email Automation** - Order confirmation, content delivery, 24-hour upsell sequence
- **Webhook Infrastructure** - Real-time payment tracking and event handling
- **Form Validation** - Client-side and server-side validation with error handling

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Wouter routing

**Backend:**
- Node.js + Express
- tRPC for type-safe API
- Stripe SDK
- Nodemailer for email

**Database:**
- SQLite (local) / PostgreSQL (production)
- Drizzle ORM

**Deployment:**
- Vercel (recommended for free tier)
- Docker support included

## Quick Start

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
Create `.env.local`:
```env
# Stripe
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here

# Email (Optional - uses fallback if not configured)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=hello@cashmesh.ai

# OpenAI (Fallback for content generation)
OPENAI_API_KEY=sk-your-key-here

# Manus (Primary content generation)
BUILT_IN_FORGE_API_KEY=your-manus-key-here
BUILT_IN_FORGE_API_URL=https://api.manus.ai

# App Configuration
VITE_APP_TITLE=CashMesh AI
VITE_APP_LOGO=/logo.svg
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
npm run start
```

## Deployment to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables in Vercel
Add these in Vercel Project Settings → Environment Variables:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `OPENAI_API_KEY`
- `BUILT_IN_FORGE_API_KEY`
- `SMTP_USER` (optional)
- `SMTP_PASSWORD` (optional)

## API Endpoints

### Payment
- `POST /api/trpc/payment.createLink` - Create Stripe payment link

### Content Generation
- `POST /api/trpc/content.generateReport` - Generate strategic report
- `POST /api/trpc/content.generateRoadmap` - Generate implementation roadmap

### Email
- `POST /api/trpc/email.sendOrderConfirmation` - Send order confirmation
- `POST /api/trpc/email.sendContentDelivery` - Send content delivery
- `POST /api/trpc/email.sendUpsellEmail` - Send upsell email

### Webhooks
- `POST /api/trpc/webhook.handleStripeEvent` - Stripe webhook handler
- `POST /api/trpc/webhook.getPaymentStatus` - Get payment status

## Stripe Setup

### Create Products
1. Go to Stripe Dashboard → Products
2. Create 3 products:
   - **Standard** ($49/one-time)
   - **Premium** ($149/one-time)
   - **Enterprise** ($499/one-time)
3. Copy Price IDs to environment variables

### Add Webhook Endpoint
1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/trpc/webhook.handleStripeEvent`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy signing secret to `STRIPE_WEBHOOK_SECRET`

## Email Configuration

### Using Gmail
1. Enable 2-Factor Authentication
2. Create App Password
3. Use app password in `SMTP_PASSWORD`

### Using Other Providers
Update `SMTP_HOST` and `SMTP_PORT` accordingly

### Fallback Mode
If SMTP not configured, emails log to console (development mode)

## Content Generation

### Primary: Manus Agent
- Requires `BUILT_IN_FORGE_API_KEY`
- Best for high-quality, customized reports
- Fallback to OpenAI if unavailable

### Fallback: OpenAI API
- Requires `OPENAI_API_KEY`
- Uses GPT-3.5-turbo
- Automatic fallback if Manus unavailable

## Project Structure

```
cashmesh_ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities
│   │   └── App.tsx        # Main app
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── routers/           # tRPC routers
│   │   ├── payment.ts
│   │   ├── content.ts
│   │   ├── email.ts
│   │   └── webhook.ts
│   ├── services/          # Business logic
│   │   ├── contentGenerator.ts
│   │   └── emailService.ts
│   └── _core/             # Core setup
├── shared/                # Shared types
├── .env.local             # Environment variables (local)
├── package.json
└── README.md
```

## Testing

### Test Payment Flow
```bash
curl -X POST http://localhost:3000/api/trpc/payment.createLink \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "customerName": "Test User",
      "customerEmail": "test@example.com",
      "topic": "AI automation",
      "packageType": "standard"
    }
  }'
```

### Test Content Generation
```bash
curl -X POST http://localhost:3000/api/trpc/content.generateReport \
  -H "Content-Type: application/json" \
  -d '{
    "json": {
      "customerName": "Test User",
      "customerEmail": "test@example.com",
      "topic": "AI automation",
      "packageType": "premium",
      "addOns": []
    }
  }'
```

## Troubleshooting

### Payment Link Not Creating
- Verify `STRIPE_SECRET_KEY` is set correctly
- Check Stripe API key has correct permissions
- Ensure products exist in Stripe dashboard

### Content Generation Failing
- Check `OPENAI_API_KEY` or `BUILT_IN_FORGE_API_KEY`
- Verify API keys have sufficient credits
- Check network connectivity

### Emails Not Sending
- If using SMTP: verify credentials and app password
- If using fallback: check server logs (emails logged to console)
- Verify `EMAIL_FROM` is set correctly

## License

MIT - Feel free to use, modify, and deploy

## Support

For issues and questions:
- GitHub Issues: Create an issue in this repository
- Email: hello@cashmesh.ai

## Roadmap

- [ ] Database integration for customer tracking
- [ ] Advanced analytics dashboard
- [ ] Subscription management
- [ ] Multi-language support
- [ ] Video content generation
- [ ] API rate limiting and authentication
- [ ] Admin dashboard

---

**Built with ❤️ using Manus AI**

Fully autonomous, production-ready platform for AI-powered strategic automation.
