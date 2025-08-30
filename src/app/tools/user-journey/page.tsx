import { PageHeader } from "@/components/page-header";
import { UserJourneyForm } from "./form";

export default function UserJourneyPage() {
  return (
    <div>
      <PageHeader
        title="User Journey Map Generator"
        description="Automatically generate user journey maps from project documentation."
      />
      <UserJourneyForm />
    </div>
  );
}
