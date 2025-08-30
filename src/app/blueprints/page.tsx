import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const blueprintData = [
  {
    title: "Burj Khalifa",
    description: "The world's tallest skyscraper, an icon of modern engineering and architecture in Dubai.",
    imageUrl: "https://picsum.photos/600/400?random=1",
    aiHint: "skyscraper city"
  },
  {
    title: "Sydney Opera House",
    description: "A multi-venue performing arts centre at Sydney Harbour, known for its unique shell-like design.",
    imageUrl: "https://picsum.photos/600/400?random=2",
    aiHint: "modern architecture"
  },
  {
    title: "The Shard",
    description: "A 95-storey supertall skyscraper in London, offering panoramic views of the city.",
    imageUrl: "https://picsum.photos/600/400?random=3",
    aiHint: "glass building"
  },
  {
    title: "Neom's The Line",
    description: "A futuristic linear smart city under construction in Saudi Arabia, designed for sustainability.",
    imageUrl: "https://picsum.photos/600/400?random=4",
    aiHint: "futuristic city"
  },
  {
    title: "Apple Park",
    description: "The corporate headquarters of Apple Inc. in Cupertino, California, famed for its circular design.",
    imageUrl: "https://picsum.photos/600/400?random=5",
    aiHint: "modern campus"
  },
  {
    title: "Gardens by the Bay",
    description: "A nature park spanning 101 hectares in central Singapore, featuring iconic Supertree structures.",
    imageUrl: "https://picsum.photos/600/400?random=6",
    aiHint: "futuristic park"
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
          <Card key={blueprint.title} className="flex flex-col overflow-hidden">
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
              <Button className="w-full">View Blueprint</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
