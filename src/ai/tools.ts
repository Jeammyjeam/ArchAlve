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
