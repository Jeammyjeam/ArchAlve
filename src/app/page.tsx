import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Building2, CodeXml, Search, Send } from "lucide-react";
import Link from "next/link";

const exampleQueries = [
  {
    title: "How was Stripe built?",
    description: "Get the tech stack, API flow, revenue model, and scaling steps.",
    icon: CodeXml,
    link: "/code",
  },
  {
    title: "Blueprint of Burj Khalifa",
    description: "Explore its structural design, materials, cost breakdown, and timeline.",
    icon: Building2,
    link: "/blueprints",
  },
  {
    title: "Build a hospital SaaS platform",
    description: "Generate a custom roadmap with stack, compliance, and budget.",
    icon: Send,
    link: "/tools/strategic-roadmap",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full max-w-4xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl">
          Codex of Civilization
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          The ultimate unified archive of how everything is built — from AI startups to skyscrapers, from SaaS platforms to smart cities.
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
    </div>
  );
}
