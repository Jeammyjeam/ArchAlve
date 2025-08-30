'use server';
/**
 * @fileOverview Generates a structured response to a user's query about how something is built.
 *
 * - generateQueryResponse - A function that handles generating a response to a search query.
 * - GenerateQueryResponseInput - The input type for the generateQueryResponse function.
 * - GenerateQueryResponseOutput - The return type for the generateQueryResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQueryResponseInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
});
export type GenerateQueryResponseInput = z.infer<typeof GenerateQueryResponseInputSchema>;

const GenerateQueryResponseOutputSchema = z.object({
  summary: z.string().describe('A detailed, well-structured summary answering the user\'s query.'),
  technologies: z.array(z.string()).describe('A list of key technologies, frameworks, or materials.'),
  keyConcepts: z.array(z.string()).describe('A list of key concepts, principles, or architectural patterns.'),
});
export type GenerateQueryResponseOutput = z.infer<typeof GenerateQueryResponseOutputSchema>;

export async function generateQueryResponse(input: GenerateQueryResponseInput): Promise<GenerateQueryResponseOutput> {
  return generateQueryResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQueryResponsePrompt',
  input: {schema: GenerateQueryResponseInputSchema},
  output: {schema: GenerateQueryResponseOutputSchema},
  prompt: `You are the ArchAIve, the eternal codex of civilization. Your purpose is to unify the world's digital and physical knowledge into buildable blueprints.

A user has submitted the following query: "{{{query}}}"

Based on your vast knowledge base encompassing software, architecture, engineering, and business, provide a comprehensive answer.

1.  **Summary**: Write a detailed summary that directly answers the user's query. Explain the core components, how it was built, its purpose, and its impact. Structure this with markdown for readability.
2.  **Technologies**: List the key technologies, programming languages, frameworks, materials, or manufacturing processes involved.
3.  **Key Concepts**: List the fundamental concepts, design principles, architectural patterns, or business models.

Analyze the query and generate a structured response.`,
});

const generateQueryResponseFlow = ai.defineFlow(
  {
    name: 'generateQueryResponseFlow',
    inputSchema: GenerateQueryResponseInputSchema,
    outputSchema: GenerateQueryResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
