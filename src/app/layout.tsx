import type { Metadata } from 'next';
import './globals.css';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/main-nav';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ArchAIve',
  description: 'The ultimate unified archive of how everything is built — from AI startups to skyscrapers, from SaaS platforms to smart cities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarContent className="p-0">
              <div className="flex h-16 items-center justify-between p-4">
                <Button variant="ghost" className="h-auto p-0 hover:bg-transparent" asChild>
                  <Link href="/">
                    <Logo className="h-8 w-auto text-primary" />
                    <span className="ml-2 font-headline text-lg font-semibold text-foreground">
                      ArchAIve
                    </span>
                  </Link>
                </Button>
              </div>
              <MainNav />
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:justify-end">
              <SidebarTrigger className="md:hidden" />
              {/* Future header content can go here */}
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-8">
              {children}
            </main>
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
