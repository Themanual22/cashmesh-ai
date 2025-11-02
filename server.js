import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Email transporter (fallback mode)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  } : undefined,
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create payment link
app.post('/api/payment/create-link', async (req, res) => {
  try {
    const { customerName, customerEmail, topic, packageType, addOns = [] } = req.body;

    // Validate input
    if (!customerName || !customerEmail || !topic || !packageType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Price mapping
    const prices = {
      standard: 'price_1SN2CVKLLm6GspecIyutiq8P',
      premium: 'price_1SN2CVKLLm6GspecIyutiq8P',
      enterprise: 'price_1SN2CVKLLm6GspecIyutiq8P',
    };

    const priceId = prices[packageType] || prices.standard;

    // Create payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      after_completion: {
        type: 'hosted_confirmation',
        hosted_confirmation: {
          custom_message: `Thank you for your order! Your strategic report will be generated and delivered within 2 hours.`,
        },
      },
      metadata: {
        customer_email: customerEmail,
        customer_name: customerName,
        topic: topic,
        package: packageType,
        add_ons: JSON.stringify(addOns),
      },
    });

    res.json({
      success: true,
      paymentLink: paymentLink.url,
      paymentLinkId: paymentLink.id,
    });
  } catch (error) {
    console.error('Payment link error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook handler
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      event = JSON.parse(req.body);
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log('✅ Payment succeeded:', paymentIntent.id);

      // Send confirmation email
      if (paymentIntent.metadata?.customer_email) {
        await transporter.sendMail({
          to: paymentIntent.metadata.customer_email,
          subject: 'Order Confirmed: Your CashMesh AI Report is Being Generated',
          html: `
            <h2>Order Confirmed</h2>
            <p>Hi ${paymentIntent.metadata.customer_name},</p>
            <p>Your order for "${paymentIntent.metadata.topic}" has been confirmed.</p>
            <p>Your strategic report will be generated and delivered within 2 hours.</p>
            <p>Order ID: ${paymentIntent.id}</p>
          `,
        }).catch(err => console.log('Email fallback:', err.message));
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Content generation endpoint
app.post('/api/content/generate', async (req, res) => {
  try {
    const { customerName, customerEmail, topic, packageType } = req.body;

    // Simulate content generation
    const reportContent = `
# Strategic Analysis Report

## Executive Summary
Your strategic analysis for "${topic}" has been completed.

## Key Insights
1. Market positioning and competitive advantage
2. Growth opportunities and expansion strategies
3. Risk mitigation and contingency planning

## Recommendations
Based on advanced AI analysis, we recommend:
- Implementing automated workflows
- Leveraging AI for decision-making
- Scaling operations efficiently

## Implementation Roadmap
- Phase 1: Foundation (Weeks 1-2)
- Phase 2: Development (Weeks 3-4)
- Phase 3: Launch (Week 5)

Generated for: ${customerName}
Date: ${new Date().toLocaleDateString()}
    `;

    res.json({
      success: true,
      content: reportContent,
      title: `Strategic Report: ${topic}`,
    });
  } catch (error) {
    console.error('Content generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 CashMesh AI running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
