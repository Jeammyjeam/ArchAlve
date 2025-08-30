import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const codeData = [
  {
    title: "Stripe-like Payment Gateway",
    description: "A complete implementation of a payment processing system, including API flows and webhook handling.",
    tags: ["SaaS", "FinTech", "API"],
  },
  {
    title: "Real-time Chat Application",
    description: "Build a scalable, real-time messaging service using WebSockets and a distributed backend architecture.",
    tags: ["App", "WebSockets", "Real-time"],
  },
  {
    title: "AI-powered Recommendation Engine",
    description: "A machine learning model and API for generating personalized content or product recommendations.",
    tags: ["AI", "ML", "API"],
  },
  {
    title: "Multi-tenant SaaS boilerplate",
    description: "Foundation for a scalable multi-tenant application, including user authentication and data isolation.",
    tags: ["SaaS", "Boilerplate", "Architecture"],
  },
  {
    title: "Hospital Management SaaS",
    description: "A HIPAA-compliant platform for managing patient records, appointments, and billing.",
    tags: ["SaaS", "Healthcare", "Compliance"],
  },
  {
    title: "Smart City IoT Data Platform",
    description: "Codebase for ingesting, processing, and visualizing data from a network of IoT sensors in an urban environment.",
    tags: ["Smart City", "IoT", "Data"],
  },
];

export default function CodePage() {
  return (
    <div>
      <PageHeader
        title="Code Archive"
        description="Browse build steps, tech stacks, and code samples for AI, apps, and SaaS platforms."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {codeData.map((code) => (
          <Card key={code.title} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{code.title}</CardTitle>
              <CardDescription>{code.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {code.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Codebase</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
