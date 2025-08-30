"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Building2, CodeXml, Home, Milestone, Rocket, UserCog } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blueprints", label: "Blueprint Archive", icon: Building2 },
  { href: "/code", label: "Code Archive", icon: CodeXml },
];

const aiTools = [
  { href: "/tools/investor-pitch", label: "Investor Pitch", icon: Rocket },
  { href: "/tools/strategic-roadmap", label: "Strategic Roadmap", icon: Milestone },
  { href: "/tools/user-journey", label: "User Journey Map", icon: UserCog },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col p-2">
      <SidebarMenu>
        {links.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton asChild isActive={pathname === link.href}>
              <Link href={link.href}>
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <Accordion type="multiple" className="w-full" defaultValue={['ai-tools']}>
        <AccordionItem value="ai-tools" className="border-none">
          <AccordionTrigger className="p-2 text-sm hover:no-underline hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md [&[data-state=open]]:bg-sidebar-accent">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>AI Tools</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 pl-4">
            <SidebarMenu>
              {aiTools.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild isActive={pathname === link.href}>
                    <Link href={link.href}>
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}
