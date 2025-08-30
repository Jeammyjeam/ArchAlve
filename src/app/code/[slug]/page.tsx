import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const codeData = [
  {
    title: "Stripe-like Payment Gateway",
    slug: "stripe-like-payment-gateway",
    description: "A complete implementation of a payment processing system, including API flows and webhook handling.",
    tags: ["SaaS", "FinTech", "API"],
    details: {
      techStack: ["Next.js", "TypeScript", "Stripe API", "Vercel"],
      features: ["Payment processing", "Subscription management", "Webhook handling", "Secure checkout"],
      github: "https://github.com/example/stripe-gateway"
    }
  },
  {
    title: "Real-time Chat Application",
    slug: "real-time-chat-application",
    description: "Build a scalable, real-time messaging service using WebSockets and a distributed backend architecture.",
    tags: ["App", "WebSockets", "Real-time"],
    details: {
      techStack: ["React", "Node.js", "Socket.IO", "Redis"],
      features: ["Real-time messaging", "User presence", "Typing indicators", "Scalable architecture"],
      github: "https://github.com/example/chat-app"
    }
  },
  {
    title: "AI-powered Recommendation Engine",
    slug: "ai-powered-recommendation-engine",
    description: "A machine learning model and API for generating personalized content or product recommendations.",
    tags: ["AI", "ML", "API"],
    details: {
      techStack: ["Python", "Flask", "TensorFlow", "Pandas"],
      features: ["Personalized recommendations", "Collaborative filtering", "Content-based filtering", "REST API"],
      github: "https://github.com/example/recommendation-engine"
    }
  },
  {
    title: "Multi-tenant SaaS boilerplate",
    slug: "multi-tenant-saas-boilerplate",
    description: "Foundation for a scalable multi-tenant application, including user authentication and data isolation.",
    tags: ["SaaS", "Boilerplate", "Architecture"],
    details: {
      techStack: ["Next.js", "Supabase", "Prisma", "Tailwind CSS"],
      features: ["Multi-tenancy", "User authentication", "Row-level security", "Customizable theme"],
      github: "https://github.com/example/saas-boilerplate"
    }
  },
  {
    title: "Hospital Management SaaS",
    slug: "hospital-management-saas",
    description: "A HIPAA-compliant platform for managing patient records, appointments, and billing.",
    tags: ["SaaS", "Healthcare", "Compliance"],
    details: {
      techStack: ["React", "Firebase", "Node.js", "HL7/FHIR"],
      features: ["HIPAA compliance", "Patient record management", "Appointment scheduling", "Medical billing"],
      github: "https://github.com/example/hospital-saas"
    }
  },
  {
    title: "Smart City IoT Data Platform",
    slug: "smart-city-iot-data-platform",
    description: "Codebase for ingesting, processing, and visualizing data from a network of IoT sensors in an urban environment.",
    tags: ["Smart City", "IoT", "Data"],
    details: {
      techStack: ["Python", "MQTT", "InfluxDB", "Grafana"],
      features: ["Real-time data ingestion", "Time-series database", "Data visualization dashboards", "Scalable data processing"],
      github: "https://github.com/example/iot-platform"
    }
  },
];


export function generateStaticParams() {
  return codeData.map((p) => ({
    slug: p.slug,
  }));
}

export default function CodeDetailPage({ params }: { params: { slug: string } }) {
  const code = codeData.find((p) => p.slug === params.slug);

  if (!code) {
    return (
      <div>
        <PageHeader
          title="Codebase not found"
          description="The requested codebase does not exist."
        />
        <Link href="/code">
          <Button variant="outline">Back to Code Archive</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={code.title}
        description={code.description}
      />
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {code.details.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Key Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside text-muted-foreground">
              {code.details.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Source Code</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Explore the complete codebase and documentation on GitHub.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href={code.details.github} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
