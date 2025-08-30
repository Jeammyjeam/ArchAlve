import { PageHeader } from "@/components/page-header";
import { StrategicRoadmapForm } from "./form";

export default function StrategicRoadmapPage() {
  return (
    <div>
      <PageHeader
        title="Strategic Roadmap Generator"
        description="Create strategic roadmaps with integrated code templates and architecture diagrams."
      />
      <StrategicRoadmapForm />
    </div>
  );
}
