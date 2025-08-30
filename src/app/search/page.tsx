import { Suspense } from 'react';
import { PageHeader } from "@/components/page-header";
import { generateQueryResponse } from "@/ai/flows/generate-query-response";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

async function SearchResult({ query }: { query: string }) {
  const result = await generateQueryResponse({ query });

  if (!result) {
    return (
       <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to get a response from the AI. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Summary</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: result.summary.replace(/\n/g, '<br />') }} />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Technologies</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {result.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Key Concepts</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
             {result.keyConcepts.map(concept => <Badge key={concept} variant="outline">{concept}</Badge>)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SearchResultSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-48 w-full" />
      </div>
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-1/2 mb-4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-1/2 mb-4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;

  if (!query) {
    return (
      <PageHeader
        title="No query"
        description="Please provide a search query."
      />
    )
  }

  return (
    <div>
      <PageHeader
        title="Search Results"
        description={`Showing results for: "${query}"`}
      />
      <Suspense fallback={<SearchResultSkeleton />}>
        <SearchResult query={query} />
      </Suspense>
    </div>
  );
}
