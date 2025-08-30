"use server";

import { generateInvestorPitchDeck } from "@/ai/flows/generate-investor-pitch-deck";
import { z } from "zod";

const investorPitchSchema = z.object({
  buildGuideSummary: z.string().min(10, "Please provide a more detailed summary."),
  targetInvestor: z.string().min(3, "Please specify the target investor."),
  marketAnalysis: z.string().min(10, "Please provide a more detailed market analysis."),
  competitiveLandscape: z.string().min(10, "Please provide a more detailed competitive landscape."),
});

export async function generateInvestorPitchAction(values: z.infer<typeof investorPitchSchema>) {
  const validatedFields = investorPitchSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields. Please check your inputs.",
    };
  }
  
  try {
    const result = await generateInvestorPitchDeck(validatedFields.data);
    return { success: result };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to generate pitch deck. Please try again.",
    };
  }
}
