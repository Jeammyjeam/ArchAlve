// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview A strategic roadmap generation AI agent.
 *
 * - generateStrategicRoadmaps - A function that handles the strategic roadmap generation process.
 * - GenerateStrategicRoadmapsInput - The input type for the generateStrategicRoadmaps function.
 * - GenerateStrategicRoadmapsOutput - The return type for the generateStrategicRoadmaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStrategicRoadmapsInputSchema = z.object({
  projectDescription: z.string().describe('The description of the project.'),
  desiredOutcomes: z.string().describe('The desired outcomes of the project.'),
  availableResources: z.string().describe('The available resources for the project.'),
});
export type GenerateStrategicRoadmapsInput = z.infer<typeof GenerateStrategicRoadmapsInputSchema>;

const GenerateStrategicRoadmapsOutputSchema = z.object({
  roadmap: z.string().describe('The generated strategic roadmap.'),
  codeTemplates: z.string().describe('The integrated code templates.'),
  architectureDiagrams: z.string().describe('The architecture diagrams.'),
});
export type GenerateStrategicRoadmapsOutput = z.infer<typeof GenerateStrategicRoadmapsOutputSchema>;

export async function generateStrategicRoadmaps(input: GenerateStrategicRoadmapsInput): Promise<GenerateStrategicRoadmapsOutput> {
  return generateStrategicRoadmapsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStrategicRoadmapsPrompt',
  input: {schema: GenerateStrategicRoadmapsInputSchema},
  output: {schema: GenerateStrategicRoadmapsOutputSchema},
  prompt: `You are a strategic planning expert. You will generate a strategic roadmap with integrated code templates and architecture diagrams based on the project description, desired outcomes, and available resources.

Project Description: {{{projectDescription}}}
Desired Outcomes: {{{desiredOutcomes}}}
Available Resources: {{{availableResources}}}

Roadmap:
Code Templates:
Architecture Diagrams: `,
});

const generateStrategicRoadmapsFlow = ai.defineFlow(
  {
    name: 'generateStrategicRoadmapsFlow',
    inputSchema: GenerateStrategicRoadmapsInputSchema,
    outputSchema: GenerateStrategicRoadmapsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
