'use server';
/**
 * @fileOverview AI flow to generate user journey maps based on software projects or building designs.
 *
 * @function generateUserJourneyMap - Generates a user journey map based on input data.
 * @typedef {GenerateUserJourneyMapInput} GenerateUserJourneyMapInput - Input type for the user journey map generation.
 * @typedef {GenerateUserJourneyMapOutput} GenerateUserJourneyMapOutput - Output type for the generated user journey map.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUserJourneyMapInputSchema = z.object({
  projectDescription: z
    .string()
    .describe(
      'A detailed description of the software project or building design.'
    ),
  architectureDocumentation: z
    .string()
    .optional()
    .describe(
      'Optional architecture documentation providing insights into the system design.'
    ),
  businessDocumentation: z
    .string()
    .optional()
    .describe(
      'Optional business documentation describing business processes and user interactions.'
    ),
});

export type GenerateUserJourneyMapInput = z.infer<
  typeof GenerateUserJourneyMapInputSchema
>;

const GenerateUserJourneyMapOutputSchema = z.object({
  userJourneyMap: z
    .string()
    .describe('A textual representation of the generated user journey map.'),
});

export type GenerateUserJourneyMapOutput = z.infer<
  typeof GenerateUserJourneyMapOutputSchema
>;

export async function generateUserJourneyMap(
  input: GenerateUserJourneyMapInput
): Promise<GenerateUserJourneyMapOutput> {
  return generateUserJourneyMapFlow(input);
}

const generateUserJourneyMapPrompt = ai.definePrompt({
  name: 'generateUserJourneyMapPrompt',
  input: {schema: GenerateUserJourneyMapInputSchema},
  output: {schema: GenerateUserJourneyMapOutputSchema},
  prompt: `You are an expert UX designer specializing in user journey maps.

  Based on the description of the software project or building design, architecture documentation, and business documentation, generate a user journey map.
  Infer the key user states and interactions from the provided documentation. If documentation isn't provided, reason and make intelligent assumptions.

  Project Description: {{{projectDescription}}}
  Architecture Documentation: {{{architectureDocumentation}}}
  Business Documentation: {{{businessDocumentation}}}
  
  Ensure that the generated user journey map provides a comprehensive overview of the user experience, highlighting key touchpoints and potential pain points. Return the user journey map as a well-formatted text.
`,
});

const generateUserJourneyMapFlow = ai.defineFlow(
  {
    name: 'generateUserJourneyMapFlow',
    inputSchema: GenerateUserJourneyMapInputSchema,
    outputSchema: GenerateUserJourneyMapOutputSchema,
  },
  async input => {
    const {output} = await generateUserJourneyMapPrompt(input);
    return output!;
  }
);
