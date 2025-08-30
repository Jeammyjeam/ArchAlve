"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateStrategicRoadmapAction } from "./actions";
import type { GenerateStrategicRoadmapsOutput } from "@/ai/flows/generate-strategic-roadmaps";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const strategicRoadmapSchema = z.object({
  projectDescription: z.string().min(10, "Please provide a more detailed project description."),
  desiredOutcomes: z.string().min(10, "Please describe the desired outcomes in more detail."),
  availableResources: z.string().min(5, "Please list the available resources."),
});

export function StrategicRoadmapForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateStrategicRoadmapsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof strategicRoadmapSchema>>({
    resolver: zodResolver(strategicRoadmapSchema),
    defaultValues: {
      projectDescription: "",
      desiredOutcomes: "",
      availableResources: "",
    },
  });

  function onSubmit(values: z.infer<typeof strategicRoadmapSchema>) {
    setResult(null);
    startTransition(async () => {
      const response = await generateStrategicRoadmapAction(values);
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else if (response.success) {
        setResult(response.success);
      }
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Roadmap Inputs</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., A decentralized identity management system using blockchain..." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>Describe the project in detail.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredOutcomes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Outcomes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Achieve 10,000 active users in the first year, secure seed funding..." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>What are the key goals and success metrics?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableResources"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Resources</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 2 full-stack engineers, $50k budget, 6-month timeline..." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>List team, budget, timeline, etc.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Roadmap
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && <div className="space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></div>}
            {result && <pre className="whitespace-pre-wrap font-code text-sm">{result.roadmap}</pre>}
            {!isPending && !result && <p className="text-muted-foreground">Your generated roadmap will appear here.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Code Templates</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && <div className="space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></div>}
            {result && <pre className="whitespace-pre-wrap font-code text-sm">{result.codeTemplates}</pre>}
            {!isPending && !result && <p className="text-muted-foreground">Generated code templates will appear here.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Architecture Diagrams</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && <div className="space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></div>}
            {result && <pre className="whitespace-pre-wrap font-code text-sm">{result.architectureDiagrams}</pre>}
            {!isPending && !result && <p className="text-muted-foreground">Generated architecture diagrams will appear here.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
