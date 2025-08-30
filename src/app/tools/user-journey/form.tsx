"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateUserJourneyAction } from "./actions";
import type { GenerateUserJourneyMapOutput } from "@/ai/flows/generate-user-journey-maps";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const userJourneySchema = z.object({
  projectDescription: z.string().min(10, "Please provide a more detailed project description."),
  architectureDocumentation: z.string().optional(),
  businessDocumentation: z.string().optional(),
});

export function UserJourneyForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<GenerateUserJourneyMapOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof userJourneySchema>>({
    resolver: zodResolver(userJourneySchema),
    defaultValues: {
      projectDescription: "",
      architectureDocumentation: "",
      businessDocumentation: "",
    },
  });

  function onSubmit(values: z.infer<typeof userJourneySchema>) {
    setResult(null);
    startTransition(async () => {
      const response = await generateUserJourneyAction(values);
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
          <CardTitle className="font-headline">Project Documentation</CardTitle>
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
                      <Textarea placeholder="e.g., A mobile app for booking fitness classes..." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>Provide a detailed description of the software project or building design.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="architectureDocumentation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Architecture Documentation (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste any relevant architecture docs here..." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>Provide insights into the system design.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessDocumentation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Documentation (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste any relevant business docs here..." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>Describe business processes and user interactions.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Map
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated User Journey Map</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {isPending && <div className="space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /><Skeleton className="h-4 w-full" /></div>}
            {result && <pre className="whitespace-pre-wrap font-code text-sm">{result.userJourneyMap}</pre>}
            {!isPending && !result && <p className="text-muted-foreground">Your generated user journey map will appear here.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
