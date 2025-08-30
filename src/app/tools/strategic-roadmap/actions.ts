"use server";

import { generateStrategicRoadmaps } from "@/ai/flows/generate-strategic-roadmaps";
import { z } from "zod";

const strategicRoadmapSchema = z.object({
  projectDescription: z.string().min(10, "Please provide a more detailed project description."),
  desiredOutcomes: z.string().min(10, "Please describe the desired outcomes in more detail."),
  availableResources: z.string().min(5, "Please list the available resources."),
});

export async function generateStrategicRoadmapAction(values: z.infer<typeof strategicRoadmapSchema>) {
  const validatedFields = strategicRoadmapSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields. Please check your inputs.",
    };
  }
  
  try {
    const result = await generateStrategicRoadmaps(validatedFields.data);
    return { success: result };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to generate strategic roadmap. Please try again.",
    };
  }
}
