"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateInvestorPitchAction } from "./actions";
import type { GenerateInvestorPitchDeckOutput } from "@/ai/flows/generate-investor-pitch-deck";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const investorPitchSchema = z.object({
  buildGuideSummary: z.string().min(10, "Please provide a more detailed summary."),
  targetInvestor: z.string().min(3, "Please specify the target investor."),
  marketAnalysis: z.string().min(10, "Please provide a more detailed market analysis."),
  competitiveLandscape: z.string().min(10, "Please provide a more detailed competitive landscape."),
});

export function InvestorPitchForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateInvestorPitchDeckOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof investorPitchSchema>>({
    resolver: zodResolver(investorPitchSchema),
    defaultValues: {
      buildGuideSummary: "",
      targetInvestor: "Venture Capital",
      marketAnalysis: "",
      competitiveLandscape: "",
    },
  });

  function onSubmit(values: z.infer<typeof investorPitchSchema>) {
    setResult(null);
    startTransition(async () => {
      const response = await generateInvestorPitchAction(values);
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
          <CardTitle className="font-headline">Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="buildGuideSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Build Guide Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., A SaaS platform for hospital management..." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>Summarize the project or build guide.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetInvestor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Investor</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Angel Investor, Seed Fund" {...field} />
                    </FormControl>
                    <FormDescription>Describe the type of investor you're targeting.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketAnalysis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Analysis</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., The global healthcare SaaS market is valued at $20B..." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>Provide an analysis of the target market.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="competitiveLandscape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitive Landscape</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Key competitors include X and Y, but we differentiate by..." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>Outline the competitive landscape.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Pitch
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated Pitch Deck</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && <div className="space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></div>}
            {result && <pre className="whitespace-pre-wrap font-code text-sm">{result.pitchDeckContent}</pre>}
            {!isPending && !result && <p className="text-muted-foreground">Your generated pitch deck content will appear here.</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated Business Model</CardTitle>
          </CardHeader>
          <CardContent>
            {isPending && <div className="space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></div>}
            {result && <pre className="whitespace-pre-wrap font-code text-sm">{result.businessModel}</pre>}
            {!isPending && !result && <p className="text-muted-foreground">Your generated business model will appear here.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
