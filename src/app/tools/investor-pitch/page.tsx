import { PageHeader } from "@/components/page-header";
import { InvestorPitchForm } from "./form";

export default function InvestorPitchPage() {
  return (
    <div>
      <PageHeader
        title="Investor Pitch Generator"
        description="Generate compelling investor pitch decks and business models based on your project."
      />
      <InvestorPitchForm />
    </div>
  );
}
