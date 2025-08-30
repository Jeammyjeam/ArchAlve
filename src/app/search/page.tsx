import { Suspense } from 'react';
import { PageHeader } from "@/components/page-header";
import { generateQueryResponse } from "@/ai/flows/generate-query-response";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Building, Code, CodeXml, DollarSign, FileText, FolderGit2, HardHat, Link as LinkIcon, Terminal } from 'lucide-react';
import Link from 'next/link';

async function SearchResult({ query }: { query: string }) {
  let result;
  try {
    result = await generateQueryResponse({ query });
  } catch (error: any) {
    console.error("Error generating query response:", error.message || error);
    if (error.stack) {
      console.error(error.stack);
    }
    return (
       <Alert variant="destructive">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Service Unavailable</AlertTitle>
        <AlertDescription>
          The AI model seems to be overloaded at the moment. Please try your search again in a few minutes.
        </AlertDescription>
      </Alert>
    )
  }

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

  const renderDigitalBlueprint = () => {
    const blueprint = result.digitalBlueprint;
    if (!blueprint) return null;

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><CodeXml className="h-5 w-5" /> Tech Stack</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {blueprint.tech_stack.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><DollarSign className="h-5 w-5" /> Business Model</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{blueprint.business_model}</p>
            </CardContent>
          </Card>
          {blueprint.github_files && blueprint.github_files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><FolderGit2 className="h-5 w-5" /> GitHub Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blueprint.github_files.map(file => (
                  <div key={file.path} className="flex items-start gap-4">
                    <div className="text-muted-foreground">{file.type === 'repo' ? <FolderGit2 className="h-5 w-5" /> : <FileText className="h-5 w-5" />}</div>
                    <div>
                      <a href={`https://github.com/${file.path}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">{file.path}</a>
                      <p className="text-sm text-muted-foreground">{file.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
           {blueprint.code_example && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Code className="h-5 w-5" /> Code Example</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 font-code text-xs text-muted-foreground">{blueprint.code_example}</pre>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="space-y-8">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><FileText className="h-5 w-5" /> Build Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {blueprint.step_by_step_build.map(step => <li key={step}>{step}</li>)}
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><LinkIcon className="h-5 w-5" /> Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {blueprint.sources.map(source => (
                <Link href={source} key={source} target="_blank" rel="noopener noreferrer" className="block truncate text-primary hover:underline">{source}</Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const renderPhysicalBlueprint = () => {
    const blueprint = result.physicalBlueprint;
    if (!blueprint) return null;

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><HardHat className="h-5 w-5" /> Materials</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {blueprint.materials.map(material => <Badge key={material} variant="secondary">{material}</Badge>)}
            </CardContent>
          </Card>
           {blueprint.engineering_firm && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><Building className="h-5 w-5" /> Engineering Firm</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{blueprint.engineering_firm}</p>
                </CardContent>
              </Card>
           )}
        </div>
        <div className="space-y-8">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><FileText className="h-5 w-5" /> Construction Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {blueprint.construction_steps.map(step => <li key={step}>{step}</li>)}
              </ol>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><LinkIcon className="h-5 w-5" /> Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {blueprint.sources.map(source => (
                <Link href={source} key={source} target="_blank" rel="noopener noreferrer" className="block truncate text-primary hover:underline">{source}</Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Summary</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p>{result.summary}</p>
        </CardContent>
      </Card>

      {result.isDigital ? renderDigitalBlueprint() : renderPhysicalBlueprint()}
    </div>
  );
}

function SearchResultSkeleton() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="space-y-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
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
