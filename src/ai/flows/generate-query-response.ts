'use server';
/**
 * @fileOverview Generates a structured response to a user's query about how something is built.
 *
 * - generateQueryResponse - A function that handles generating a response to a search query.
 * - GenerateQueryResponseInput - The input type for the generateQueryResponse function.
 * - GenerateQueryResponseOutput - The return type for the generateQueryResponse function.
 */

import {ai} from '@/ai/genkit';
import { getCompanyInfo, searchGitHub } from '@/ai/tools';
import {z} from 'genkit';

const GenerateQueryResponseInputSchema = z.object({
  query: z.string().describe("The user's search query."),
});
export type GenerateQueryResponseInput = z.infer<typeof GenerateQueryResponseInputSchema>;

const AppBlueprintSchema = z.object({
  name: z.string().describe('The name of the application or company.'),
  type: z.string().describe('The type of entity, e.g., "Business/Fintech".'),
  tech_stack: z.array(z.string()).nullable().describe('The key technologies and frameworks used.'),
  code_example: z.string().nullable().describe('A relevant code snippet or reference to a file.'),
  business_model: z.string().nullable().describe('How the entity makes money.'),
  step_by_step_build: z.array(z.string()).describe('High-level steps to build a similar entity.'),
  github_files: z.array(z.object({
    type: z.enum(['repo', 'file']),
    path: z.string(),
    description: z.string(),
  })).nullable().describe("A list of relevant GitHub repositories or files."),
  sources: z.array(z.string()).describe('List of URLs for the data sources.'),
});

const BuildingBlueprintSchema = z.object({
  name: z.string().describe('The name of the building or structure.'),
  type: z.string().describe('The type of structure, e.g., "Skyscraper".'),
  blueprint_files: z.array(z.string()).nullable().describe('Links or references to blueprint files (e.g., CAD.dwg).'),
  materials: z.array(z.string()).describe('The primary construction materials.'),
  engineering_firm: z.string().nullable().describe('The main engineering firm responsible.'),
  construction_steps: z.array(z.string()).describe('High-level steps of construction.'),
  sources: z.array(z.string()).describe('List of URLs or references for the data sources.'),
});


const GenerateQueryResponseOutputSchema = z.object({
  isDigital: z.boolean().describe('Is the query about a digital entity (app, SaaS) or a physical one (building)?'),
  digitalBlueprint: AppBlueprintSchema.nullable().describe('The structured blueprint for a digital entity.'),
  physicalBlueprint: BuildingBlueprintSchema.nullable().describe('The structured blueprint for a physical entity.'),
  summary: z.string().describe("A summary of the findings."),
});
export type GenerateQueryResponseOutput = z.infer<typeof GenerateQueryResponseOutputSchema>;

export async function generateQueryResponse(input: GenerateQueryResponseInput): Promise<GenerateQueryResponseOutput> {
  return generateQueryResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQueryResponsePrompt',
  input: {schema: GenerateQueryResponseInputSchema},
  output: {schema: GenerateQueryResponseOutputSchema},
  tools: [getCompanyInfo, searchGitHub],
  prompt: `You are the ArchAIve, the eternal codex of civilization. Your purpose is to unify the world's digital and physical knowledge into buildable blueprints.

A user has submitted the following query: "{{{query}}}"

1.  First, determine if the query is about a digital entity (software, app, SaaS, business) or a physical entity (building, skyscraper, bridge). Set the 'isDigital' flag accordingly.
2.  Based on your determination, populate either the 'digitalBlueprint' or the 'physicalBlueprint' object with as much detail as possible.
3.  If the query is about a specific company, use the getCompanyInfo tool to fetch details and incorporate them into your response.
4.  If the query is about a software entity, you MUST use the searchGitHub tool to find relevant repositories and files. Populate the 'github_files' array with the results. If no results are found, return an empty array.
5.  For software entities, find a relevant and illustrative code snippet for the 'code_example' field. This could be from the searchGitHub tool results or a general example. If none is found, return null.
6.  For every piece of information, you MUST cite your sources. Populate the 'sources' array with URLs. If you are making an assumption, state it.
7.  If some information is unavailable, return a partial JSON with null for the missing fields. Do not make up information you cannot verify.
8.  Finally, write a concise summary of your findings.

Analyze the query and generate the structured JSON response.`,
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
