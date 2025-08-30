import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Building2, CodeXml, Database, FileText, Layers, Search, Send, Share2 } from "lucide-react";
import Link from "next/link";

const exampleQueries = [
  {
    title: "How was Stripe built?",
    description: "Get the tech stack, API flow, revenue model, and scaling steps.",
    icon: CodeXml,
    link: "/code/stripe-like-payment-gateway",
  },
  {
    title: "Blueprint of Burj Khalifa",
    description: "Explore its structural design, materials, cost breakdown, and timeline.",
    icon: Building2,
    link: "/blueprints/burj-khalifa",
  },
  {
    title: "Build a hospital SaaS platform",
    description: "Generate a custom roadmap with stack, compliance, and budget.",
    icon: Send,
    link: "/tools/strategic-roadmap",
  },
];

const howItWorksSources = [
    {
        title: "Knowledge Synthesis",
        description: "We scrape and synthesize data from millions of sources, including GitHub repos, patent databases, architectural plans, and financial reports.",
        icon: Database
    },
    {
        title: "Knowledge Graph",
        description: "Information is structured into a vast knowledge graph, connecting entities like codebases, materials, and companies with their complex relationships.",
        icon: Share2
    },
    {
        title: "AI Reasoning Layer",
        description: "Our AI layer, featuring advanced language and simulation models, reasons over this graph to generate novel, buildable insights and blueprints.",
        icon: Layers
    },
];

const howItWorksOutputs = [
    {
        title: "Step-by-Step Build Guides",
        description: "Detailed, actionable instructions for constructing complex systems."
    },
    {
        title: "Code Snippets & Repositories",
        description: "Ready-to-use code for apps, AI, and SaaS platforms."
    },
    {
        title: "Blueprint Diagrams",
        description: "Architectural, mechanical, and electrical schematics."
    },
    {
        title: "Business Model Breakdowns",
        description: "Complete analysis of revenue, costs, and market strategy."
    },
    {
        title: "Cost & Timeline Estimates",
        description: "AI-driven simulations for project planning and budgeting."
    },
    {
        title: "Investor Pitch Decks",
        description: "Automatically generated presentations to secure funding."
    }
]


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full max-w-4xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
          The Operating System for Creation
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          ArchAIve is the eternal codex of civilization. We unify the world&apos;s digital and physical knowledge into buildable blueprints for every app, building, and system.
        </p>
        <div className="relative mx-auto mt-8 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search digital blueprints, codebases, and playbooks..."
            className="h-12 rounded-full pl-10 pr-28"
          />
          <Button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full">
            Search
          </Button>
        </div>
      </section>

      <section className="mt-16 w-full max-w-6xl md:mt-24">
        <h2 className="mb-8 text-center font-headline text-2xl font-semibold md:text-3xl">
          Explore the Archive
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exampleQueries.map((query) => (
            <Card key={query.title} className="flex transform-gpu flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="flex-row items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <query.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-headline text-lg">{query.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{query.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="w-full justify-end">
                  <Link href={query.link}>
                    Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 w-full max-w-6xl md:mt-24">
         <h2 className="mb-8 text-center font-headline text-2xl font-semibold md:text-3xl">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {howItWorksSources.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-lg bg-primary/10 p-3">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-lg border bg-card p-8 shadow-sm">
            <h3 className="mb-6 text-center font-headline text-xl font-semibold">Generated Outputs</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
                {howItWorksOutputs.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                       <FileText className="h-5 w-5 shrink-0 text-primary" />
                       <div>
                           <p className="font-semibold">{item.title}</p>
                           <p className="text-sm text-muted-foreground">{item.description}</p>
                       </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
