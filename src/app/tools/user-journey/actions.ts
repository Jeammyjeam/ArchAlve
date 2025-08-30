"use server";

import { generateUserJourneyMap } from "@/ai/flows/generate-user-journey-maps";
import { z } from "zod";

const userJourneySchema = z.object({
  projectDescription: z.string().min(10, "Please provide a more detailed project description."),
  architectureDocumentation: z.string().optional(),
  businessDocumentation: z.string().optional(),
});

export async function generateUserJourneyAction(values: z.infer<typeof userJourneySchema>) {
  const validatedFields = userJourneySchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields. Please check your inputs.",
    };
  }
  
  try {
    const result = await generateUserJourneyMap(validatedFields.data);
    return { success: result };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to generate user journey map. Please try again.",
    };
  }
}
