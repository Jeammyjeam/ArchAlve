import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const codeData = [
  {
    title: "Stripe-like Payment Gateway",
    slug: "stripe-like-payment-gateway",
    description: "A complete implementation of a payment processing system, including API flows and webhook handling.",
    tags: ["SaaS", "FinTech", "API"],
  },
  {
    title: "Real-time Chat Application",
    slug: "real-time-chat-application",
    description: "Build a scalable, real-time messaging service using WebSockets and a distributed backend architecture.",
    tags: ["App", "WebSockets", "Real-time"],
  },
  {
    title: "AI-powered Recommendation Engine",
    slug: "ai-powered-recommendation-engine",
    description: "A machine learning model and API for generating personalized content or product recommendations.",
    tags: ["AI", "ML", "API"],
  },
  {
    title: "Multi-tenant SaaS boilerplate",
    slug: "multi-tenant-saas-boilerplate",
    description: "Foundation for a scalable multi-tenant application, including user authentication and data isolation.",
    tags: ["SaaS", "Boilerplate", "Architecture"],
  },
  {
    title: "Hospital Management SaaS",
    slug: "hospital-management-saas",
    description: "A HIPAA-compliant platform for managing patient records, appointments, and billing.",
    tags: ["SaaS", "Healthcare", "Compliance"],
  },
  {
    title: "Smart City IoT Data Platform",
    slug: "smart-city-iot-data-platform",
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
          <Link href={`/code/${code.slug}`} key={code.title} className="flex">
            <Card className="flex w-full transform-gpu flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
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
                <Button variant="ghost" className="w-full justify-end">
                  View Codebase <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}