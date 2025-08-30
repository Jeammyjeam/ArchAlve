'use server';
/**
 * @fileOverview Defines tools for the AI to use, simulating access to external data sources.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Simulated database of company information, mimicking a Crunchbase-like API.
const companyData: Record<string, any> = {
  stripe: {
    name: 'Stripe',
    description: 'Stripe is an Irish-American financial services and software as a service (SaaS) company dual-headquartered in San Francisco, United States and Dublin, Ireland. The company primarily offers payment processing software and application programming interfaces (APIs) for e-commerce websites and mobile applications.',
    founded: 2010,
    founders: ['Patrick Collison', 'John Collison'],
    valuation: '$65 billion (as of 2024)',
  },
  'openai': {
    name: 'OpenAI',
    description: 'OpenAI is an American artificial intelligence (AI) research organization consisting of the non-profit OpenAI, Inc. and its for-profit subsidiary corporation OpenAI Global, LLC. OpenAI conducts AI research with the declared intention of promoting and developing friendly AI in a way that benefits humanity as a whole.',
    founded: 2015,
    founders: ['Elon Musk', 'Sam Altman', 'Greg Brockman', 'Ilya Sutskever', 'Wojciech Zaremba'],
    keyProducts: ['GPT series', 'DALL-E', 'Sora'],
  }
};

// Simulated GitHub search results
const githubData: Record<string, any> = {
  stripe: [
    { type: 'repo', path: 'stripe/stripe-react', description: 'React components for Stripe.js and Stripe Elements' },
    { type: 'repo', path: 'stripe/stripe-node', description: 'Node.js library for the Stripe API.' },
    { type: 'file', path: 'stripe/stripe-node/blob/master/lib/stripe.js', description: 'Main library file for the official Node.js client' },
    { type: 'file', path: 'stripe-samples/accept-a-payment/server/server.js', description: 'Example server for processing payments', content: "const stripe = require('stripe')('sk_test_...');\n\napp.post('/create-checkout-session', async (req, res) => {\n  const session = await stripe.checkout.sessions.create({\n    line_items: [\n      {\n        price: 'price_12345',\n        quantity: 1,\n      },\n    ],\n    mode: 'payment',\n    success_url: 'https://example.com/success',\n    cancel_url: 'https://example.com/cancel',\n  });\n\n  res.redirect(303, session.url);\n});" },
  ],
  whatsapp: [
     { type: 'repo', path: 'WhatsApp/weblib', description: 'Internal Web-client Library for WhatsApp' },
     { type: 'repo', path: 'WhisperSystems/Signal-Android', description: 'Signal Private Messenger for Android, foundation for WA E2EE' },
  ],
   "eiffel tower": [],
  "burj khalifa": [],
  "how was stripe built?": [
    { type: 'repo', path: 'stripe/stripe-react', description: 'React components for Stripe.js and Stripe Elements' },
    { type: 'repo', path: 'stripe/stripe-node', description: 'Node.js library for the Stripe API.' },
    { type: 'file', path: 'stripe/stripe-node/blob/master/lib/stripe.js', description: 'Main library file for the official Node.js client' },
    { type: 'file', path: 'stripe-samples/accept-a-payment/server/server.js', description: 'Example server for processing payments', content: "const stripe = require('stripe')('sk_test_...');\n\napp.post('/create-checkout-session', async (req, res) => {\n  const session = await stripe.checkout.sessions.create({\n    line_items: [\n      {\n        price: 'price_12345',\n        quantity: 1,\n      },\n    ],\n    mode: 'payment',\n    success_url: 'https://example.com/success',\n    cancel_url: 'https://example.com/cancel',\n  });\n\n  res.redirect(303, session.url);\n});" },
  ]
};

export const getCompanyInfo = ai.defineTool(
  {
    name: 'getCompanyInfo',
    description: 'Returns information about a specific company, such as its description, founding year, founders, and valuation.',
    inputSchema: z.object({
      companyName: z.string().describe('The name of the company to look up. Should be a single, well-known name like "Stripe" or "OpenAI".'),
    }),
    outputSchema: z.any(),
  },
  async (input) => {
    console.log(`[getCompanyInfo] Looking up: ${input.companyName}`);
    const key = input.companyName.toLowerCase();
    // In a real application, this would fetch from a database or external API.
    return companyData[key] || { error: 'Company not found.' };
  }
);


export const searchGitHub = ai.defineTool(
  {
    name: 'searchGitHub',
    description: 'Searches GitHub for relevant repositories and files based on a query.',
    inputSchema: z.object({
      query: z.string().describe('The search term, typically the name of a company, project, or technology.'),
    }),
    outputSchema: z.any(),
  },
  async (input) => {
    console.log(`[searchGitHub] Searching for: ${input.query}`);
    const key = input.query.toLowerCase();
    // In a real application, this would call the GitHub API.
    return githubData[key] || { message: 'No relevant files or repositories found.' };
  }
);
