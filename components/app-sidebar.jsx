'use client'

import {
  Heading1,
  Text,
  Bold,
  Italic,
  AlignJustify,
  List,
  ImagePlus,
  ListTree,
  ListOrdered,
  FileText,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useEffect, useState } from 'react'
const tools = [
  { title: "clauses", icon: FileText },
  { title: "items", icon: ListOrdered },
  { title: "text", icon: ListTree },
  // { title: "Tytuł", icon: Heading1 },
  // { title: "Tekst", icon: Text },
  // { title: "Pogrub", icon: Bold },
  // { title: "Kursywa", icon: Italic },
  // { title: "Justuj", icon: AlignJustify },
  // { title: "Lista", icon: List },
  // { title: "Obrazek", icon: ImagePlus },
]
const tool = [

  { title: "Tytuł", icon: Heading1 },
  { title: "Tekst", icon: Text },
  { title: "Pogrub", icon: Bold },
  { title: "Kursywa", icon: Italic },
  { title: "Justuj", icon: AlignJustify },
  { title: "Lista", icon: List },
  { title: "Obrazek", icon: ImagePlus },
]

export function AppSidebar({ activeTool, setActiveTool }) {
 

  return (

    <Sidebar className="h-full z-0">
      <SidebarContent >
        <SidebarGroup className="top-30 ">
          <SidebarGroupLabel>Narzędzia</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tool.map((tool) => (
                <SidebarMenuItem key={tool.title}>
                  <SidebarMenuButton asChild>
                    <button type="button" className="flex items-center gap-2 w-full text-left">
                      <tool.icon className="w-4 h-4" />
                      <span>{tool.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarGroupLabel>Tryby</SidebarGroupLabel>
            <SidebarMenu>
              {tools.map((tool) => (
                <SidebarMenuItem key={tool.title} className={activeTool === tool.title ? "bg-muted" : ""}>
                  <SidebarMenuButton asChild>
                    <button
                      type="button"
                      onClick={() => {setActiveTool(tool.title)
                          localStorage.setItem("activeTool", tool.title)
                      }}
                      className="flex items-center gap-2 w-full text-left"
                    >
                      <tool.icon className="w-4 h-4" />
                      <span>{tool.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>



  )
}
