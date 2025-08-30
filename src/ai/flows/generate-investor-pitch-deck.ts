'use server';
/**
 * @fileOverview Generates investor pitch decks and business models based on selected build guides using AI.
 *
 * - generateInvestorPitchDeck - A function that handles the investor pitch deck generation process.
 * - GenerateInvestorPitchDeckInput - The input type for the generateInvestorPitchDeck function.
 * - GenerateInvestorPitchDeckOutput - The return type for the generateInvestorPitchDeck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInvestorPitchDeckInputSchema = z.object({
  buildGuideSummary: z.string().describe('A summary of the selected build guide.'),
  targetInvestor: z.string().describe('The type of investor the pitch deck is for.'),
  marketAnalysis: z.string().describe('An analysis of the target market.'),
  competitiveLandscape: z.string().describe('An overview of the competitive landscape.'),
});
export type GenerateInvestorPitchDeckInput = z.infer<typeof GenerateInvestorPitchDeckInputSchema>;

const GenerateInvestorPitchDeckOutputSchema = z.object({
  pitchDeckContent: z.string().describe('The generated content for the investor pitch deck.'),
  businessModel: z.string().describe('The generated business model.'),
});
export type GenerateInvestorPitchDeckOutput = z.infer<typeof GenerateInvestorPitchDeckOutputSchema>;

export async function generateInvestorPitchDeck(input: GenerateInvestorPitchDeckInput): Promise<GenerateInvestorPitchDeckOutput> {
  return generateInvestorPitchDeckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInvestorPitchDeckPrompt',
  input: {schema: GenerateInvestorPitchDeckInputSchema},
  output: {schema: GenerateInvestorPitchDeckOutputSchema},
  prompt: `You are an expert in creating investor pitch decks and business models.

  Based on the following build guide summary, target investor profile, market analysis, and competitive landscape, generate a compelling investor pitch deck and business model.

  Build Guide Summary: {{{buildGuideSummary}}}
  Target Investor: {{{targetInvestor}}}
  Market Analysis: {{{marketAnalysis}}}
  Competitive Landscape: {{{competitiveLandscape}}}

  Pitch Deck Content:
  Business Model:`, // Removed Handlebars await expression.
});

const generateInvestorPitchDeckFlow = ai.defineFlow(
  {
    name: 'generateInvestorPitchDeckFlow',
    inputSchema: GenerateInvestorPitchDeckInputSchema,
    outputSchema: GenerateInvestorPitchDeckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
