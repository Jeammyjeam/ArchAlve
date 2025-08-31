import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blueprintData = [
  {
    title: "Burj Khalifa",
    slug: "burj-khalifa",
    description: "The world's tallest skyscraper, an icon of modern engineering and architecture in Dubai.",
    imageUrl: "https://picsum.photos/600/400?random=1",
    aiHint: "skyscraper city",
    query: "Blueprint of Burj Khalifa"
  },
  {
    title: "Sydney Opera House",
    slug: "sydney-opera-house",
    description: "A multi-venue performing arts centre at Sydney Harbour, known for its unique shell-like design.",
    imageUrl: "https://picsum.photos/600/400?random=2",
    aiHint: "modern architecture",
    query: "Blueprint of Sydney Opera House"
  },
  {
    title: "The Shard",
    slug: "the-shard",
    description: "A 95-storey supertall skyscraper in London, offering panoramic views of the city.",
    imageUrl: "https://picsum.photos/600/400?random=3",
    aiHint: "glass building",
    query: "Blueprint of The Shard"
  },
  {
    title: "Neom's The Line",
    slug: "neoms-the-line",
    description: "A futuristic linear smart city under construction in Saudi Arabia, designed for sustainability.",
    imageUrl: "https://picsum.photos/600/400?random=4",
    aiHint: "futuristic city",
    query: "Blueprint of Neom's The Line"
  },
  {
    title: "Apple Park",
    slug: "apple-park",
    description: "The corporate headquarters of Apple Inc. in Cupertino, California, famed for its circular design.",
    imageUrl: "https://picsum.photos/600/400?random=5",
    aiHint: "modern campus",
    query: "Blueprint of Apple Park"
  },
  {
    title: "Gardens by the Bay",
    slug: "gardens-by-the-bay",
    description: "A nature park spanning 101 hectares in central Singapore, featuring iconic Supertree structures.",
    imageUrl: "https://picsum.photos/600/400?random=6",
    aiHint: "futuristic park",
    query: "Blueprint of Gardens by the Bay"
  },
];

export default function BlueprintsPage() {
  return (
    <div>
      <PageHeader
        title="Blueprint Archive"
        description="Explore structural breakdowns, materials, and timelines for iconic architecture and city blueprints."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blueprintData.map((blueprint) => (
          <Link href={`/blueprints/${blueprint.slug}`} key={blueprint.title} className="flex">
            <Card className="flex w-full transform-gpu flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
              <div className="relative h-48 w-full">
                <Image
                  src={blueprint.imageUrl}
                  alt={blueprint.title}
                  fill
                  className="object-cover"
                  data-ai-hint={blueprint.aiHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{blueprint.title}</CardTitle>
                <CardDescription className="line-clamp-2">{blueprint.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardFooter>
                <Button variant="ghost" className="w-full justify-end">
                  View Blueprint <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}