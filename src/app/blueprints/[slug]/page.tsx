import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const blueprintData = [
  {
    title: "Burj Khalifa",
    slug: "burj-khalifa",
    description: "The world's tallest skyscraper, an icon of modern engineering and architecture in Dubai. This page would contain detailed information about its construction, materials, and architectural plans.",
    imageUrl: "https://picsum.photos/1200/800?random=1",
    aiHint: "skyscraper city",
    details: {
      location: "Dubai, UAE",
      height: "828m",
      floors: "163",
      architect: "Adrian Smith",
      materials: ["Reinforced Concrete", "Steel", "Glass"]
    }
  },
  {
    title: "Sydney Opera House",
    slug: "sydney-opera-house",
    description: "A multi-venue performing arts centre at Sydney Harbour, known for its unique shell-like design. This page would explore its complex geometry, construction challenges, and cultural impact.",
    imageUrl: "https://picsum.photos/1200/800?random=2",
    aiHint: "modern architecture",
    details: {
      location: "Sydney, Australia",
      architect: "Jørn Utzon",
      opened: "1973",
      materials: ["Precast Concrete", "Ceramic Tiles", "Glass"]
    }
  },
  {
    title: "The Shard",
    slug: "the-shard",
    description: "A 95-storey supertall skyscraper in London, offering panoramic views of the city. This page would detail its unique glass-shard design and structural engineering.",
    imageUrl: "https://picsum.photos/1200/800?random=3",
    aiHint: "glass building",
     details: {
      location: "London, UK",
      height: "310m",
      floors: "95",
      architect: "Renzo Piano",
       materials: ["Glass", "Steel", "Concrete"]
    }
  },
  {
    title: "Neom's The Line",
    slug: "neoms-the-line",
    description: "A futuristic linear smart city under construction in Saudi Arabia, designed for sustainability. This page would cover its ambitious design, technological integrations, and urban planning concepts.",
    imageUrl: "https://picsum.photos/1200/800?random=4",
    aiHint: "futuristic city",
     details: {
      location: "Tabuk Province, Saudi Arabia",
      length: "170km",
      concept: "Linear City",
      status: "Under Construction",
       materials: ["Mirrored Glass", "Advanced Composites", "Sustainable Materials"]
    }
  },
  {
    title: "Apple Park",
    slug: "apple-park",
    description: "The corporate headquarters of Apple Inc. in Cupertino, California, famed for its circular design. This page would delve into its sustainable features, landscape design, and innovative workspace.",
    imageUrl: "https://picsum.photos/1200/800?random=5",
    aiHint: "modern campus",
    details: {
      location: "Cupertino, USA",
      architect: "Norman Foster",
      cost: "$5 billion",
      features: ["100% renewable energy", "Natural ventilation", "Worlds largest curved glass panels"]
    }
  },
  {
    title: "Gardens by the Bay",
    slug: "gardens-by-the-bay",
    description: "A nature park spanning 101 hectares in central Singapore, featuring iconic Supertree structures. This page would explore its horticultural wonders, sustainable energy cycles, and architectural landmarks.",
    imageUrl: "https://picsum.photos/1200/800?random=6",
    aiHint: "futuristic park",
    details: {
      location: "Singapore",
      area: "101 hectares",
      features: ["Supertrees", "Cloud Forest", "Flower Dome"],
      architect: "Grant Associates, WilkinsonEyre"
    }
  },
];

export function generateStaticParams() {
  return blueprintData.map((p) => ({
    slug: p.slug,
  }));
}

export default function BlueprintDetailPage({ params }: { params: { slug: string } }) {
  const blueprint = blueprintData.find((p) => p.slug === params.slug);

  if (!blueprint) {
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

  return (
    <div>
      <PageHeader
        title={blueprint.title}
        description={blueprint.description}
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative h-[450px] w-full">
              <Image
                src={blueprint.imageUrl}
                alt={blueprint.title}
                fill
                className="object-cover"
                data-ai-hint={blueprint.aiHint}
              />
            </div>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(blueprint.details).map(([key, value]) => (
                <div key={key}>
                  <p className="font-semibold capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</p>
                  {Array.isArray(value) ? (
                     <div className="flex flex-wrap gap-2 pt-2">
                        {value.map(item => <Badge key={item} variant="secondary">{item}</Badge>)}
                     </div>
                  ) : (
                    <p className="text-lg">{value}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}