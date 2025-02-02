import * as React from "react"
import {

  BookOpen,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  ChartArea

} from "lucide-react"

import { NavMain } from "./navMain"
import { NavProjects } from "../sideBar/navProjects"
import { NavUser } from "../sideBar/navUser"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenuButton,
    SidebarHeader,
    SidebarRail,
  } from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"
  
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Moto",
        url: "#",
        isActive: true,
        icon: BookOpen,
        items: [
          {
            title: "Moto management",
            url: "/moto-management",
          },
          {
            title: "Entretien",
            url: "/entretiens",
          },
          {
            title: "Pannes",
            url: "/pannes",
          },
          {
            title: "Garanties",
            url: "/garanties",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Statistics",
        url: "/statistiques",
        icon: ChartArea,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  }
  
  export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">VroomVroomAuto</span>
                  <span className="">v1.0.0</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )
  }

