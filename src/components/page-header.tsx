import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="font-headline text-3xl font-bold md:text-4xl">{title}</h1>
      {description && <p className="mt-2 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
