import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateQueryResponse, type GenerateQueryResponseOutput } from "@/ai/flows/generate-query-response";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Building, FileText, HardHat, Link as LinkIcon, Terminal } from "lucide-react";

const blueprintData = [
  {
    title: "Burj Khalifa",
    slug: "burj-khalifa",
    description: "The world's tallest skyscraper, an icon of modern engineering and architecture in Dubai. This page contains detailed information about its construction, materials, and architectural plans.",
    imageUrl: "https://picsum.photos/1200/800?random=1",
    aiHint: "skyscraper city",
    query: "Blueprint of Burj Khalifa"
  },
  {
    title: "Sydney Opera House",
    slug: "sydney-opera-house",
    description: "A multi-venue performing arts centre at Sydney Harbour, known for its unique shell-like design. This page explores its complex geometry, construction challenges, and cultural impact.",
    imageUrl: "https://picsum.photos/1200/800?random=2",
    aiHint: "modern architecture",
    query: "Blueprint of Sydney Opera House"
  },
  {
    title: "The Shard",
    slug: "the-shard",
    description: "A 95-storey supertall skyscraper in London, offering panoramic views of the city. This page details its unique glass-shard design and structural engineering.",
    imageUrl: "https://picsum.photos/1200/800?random=3",
    aiHint: "glass building",
    query: "Blueprint of The Shard"
  },
  {
    title: "Neom's The Line",
    slug: "neoms-the-line",
    description: "A futuristic linear smart city under construction in Saudi Arabia, designed for sustainability. This page covers its ambitious design, technological integrations, and urban planning concepts.",
    imageUrl: "https://picsum.photos/1200/800?random=4",
    aiHint: "futuristic city",
    query: "Blueprint of Neom's The Line"
  },
  {
    title: "Apple Park",
    slug: "apple-park",
    description: "The corporate headquarters of Apple Inc. in Cupertino, California, famed for its circular design. This page delves into its sustainable features, landscape design, and innovative workspace.",
    imageUrl: "https://picsum.photos/1200/800?random=5",
    aiHint: "modern campus",
    query: "Blueprint of Apple Park"
  },
  {
    title: "Gardens by the Bay",
    slug: "gardens-by-the-bay",
    description: "A nature park spanning 101 hectares in central Singapore, featuring iconic Supertree structures. This page explores its horticultural wonders, sustainable energy cycles, and architectural landmarks.",
    imageUrl: "https://picsum.photos/1200/800?random=6",
    aiHint: "futuristic park",
    query: "Blueprint of Gardens by the Bay"
  },
];

export function generateStaticParams() {
  return blueprintData.map((p) => ({
    slug: p.slug,
  }));
}

function RenderPhysicalBlueprint({ blueprint }: { blueprint: NonNullable<GenerateQueryResponseOutput['physicalBlueprint']> }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-8">
        {blueprint.materials && blueprint.materials.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><HardHat className="h-5 w-5" /> Materials</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {blueprint.materials.map(material => <Badge key={material} variant="secondary">{material}</Badge>)}
            </CardContent>
          </Card>
        )}
         {blueprint.engineering_firm && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Building className="h-5 w-5" /> Engineering Firm</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{blueprint.engineering_firm}</p>
              </CardContent>
            </Card>
         )}
      </div>
      <div className="space-y-8">
         {blueprint.construction_steps && blueprint.construction_steps.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><FileText className="h-5 w-5" /> Construction Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {blueprint.construction_steps.map(step => <li key={step}>{step}</li>)}
              </ol>
            </CardContent>
          </Card>
         )}
         {blueprint.sources && blueprint.sources.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><LinkIcon className="h-5 w-5" /> Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {blueprint.sources.map(source => (
                <Link href={source} key={source} target="_blank" rel="noopener noreferrer" className="block truncate text-primary hover:underline">{source}</Link>
              ))}
            </CardContent>
          </Card>
         )}
      </div>
    </div>
  );
}


export default async function BlueprintDetailPage({ params }: { params: { slug: string } }) {
  const staticBlueprint = blueprintData.find((p) => p.slug === params.slug);

  if (!staticBlueprint) {
    return (
      <div>
        <PageHeader
          title="Blueprint not found"
          description="The requested blueprint does not exist."
        />
        <Link href="/blueprints">
          <Button variant="outline">Back to Blueprints</Button>
        </Link>
      </div>
    );
  }

  let result;
  try {
    result = await generateQueryResponse({ query: staticBlueprint.query });
  } catch (error: any) {
    console.error("Error generating query response:", error.message || error);
    if (error.stack) {
      console.error(error.stack);
    }
    return (
       <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Service Unavailable</AlertTitle>
        <AlertDescription>
          The AI model seems to be overloaded at the moment. Please try your search again in a few minutes.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      <PageHeader
        title={staticBlueprint.title}
        description={result.summary || staticBlueprint.description}
      />
      {result.physicalBlueprint ? (
        <RenderPhysicalBlueprint blueprint={result.physicalBlueprint} />
      ) : (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>No Details Available</AlertTitle>
          <AlertDescription>
            The AI could not generate detailed information for this blueprint at the moment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}