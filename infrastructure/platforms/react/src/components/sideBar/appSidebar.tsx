// infrastructure/platforms/react/src/components/sideBar/appSidebar.tsx

import * as React from "react";
import {
  GalleryVerticalEnd,
  CarFront,
  Wrench,
  ShieldAlert,
  ShoppingCart,
  Cog,
  ChartArea,
  ScrollText,
  History,
  ClipboardCheck,
  Shield,
  Settings,
  Users,
  Package,
  User,
  Car,
  Calendar,
  AlertCircle,
  Receipt,
  BoxesIcon,
  List
} from "lucide-react";

import { NavMain } from "./navMain";
import { NavUser } from "./navUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useAuthStore } from '@/stores/authStore';

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

const userData: UserData = {
  name: "VroomVroomAuto",
  email: "contact@vroomvroom.fr",
  avatar: "/avatars/default.jpg",
};

const getNavigationItems = (role: string) => {
  // Items communs à tous les utilisateurs
  const commonItems = [
    {
      title: "Mes Entretiens",
      url: "#",
      icon: ScrollText,
      items: [
        {
          title: "Entretiens planifiés",
          url: "/entretiens/mes-entretiens",
          icon: Calendar,
        },
        {
          title: "Historique",
          url: "/entretiens/mes-entretiens/historique",
          icon: History,
        },
      ],
    },
  ];

  // Items pour les gestionnaires
  const gestionnaireItems = [
    {
      title: "Gestion Moto",
      url: "#",
      icon: CarFront,
      items: [
        {
          title: "Motos",
          url: "/moto-management",
          icon: Car,
        },
        {
          title: "Conducteurs",
          url: "/conducteurs",
          icon: User,
        },
        {
          title: "Essais",
          url: "/essais",
          icon: ClipboardCheck,
        },
      ],
    },
    {
      title: "Maintenance",
      url: "#",
      icon: Wrench,
      items: [
        {
          title: "Entretiens",
          url: "/entretiens",
          icon: Calendar,
        },
        {
          title: "Planification",
          url: "/entretiens/planification",
          icon: Calendar,
        },
        {
          title: "Historique",
          url: "/entretiens/historique",
          icon: History,
        },
        {
          title: "Règles maintenance",
          url: "/maintenance-rules",
          icon: Settings,
        },
      ],
    },
    {
      title: "Interventions",
      url: "#",
      icon: ShieldAlert,
      items: [
        {
          title: "Pannes",
          url: "/pannes",
          icon: AlertCircle,
        },
        {
          title: "Garanties",
          url: "/garanties",
          icon: Shield,
        },
        {
          title: "Réparations",
          url: "/reparations",
          icon: Shield,
        },
      ],
    },
    {
      title: "Commandes",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Catalogue pièces",
          url: "/commandes/catalogue-pieces",
          icon: Package,
        },
        {
          title: "Suivi commandes",
          url: "/commandes/suivi-commandes",
          icon: List,
        },
        {
          title: "Historique",
          url: "/commandes/historique",
          icon: History,
        },
      ],
    },
  ];

  // Items pour les administrateurs (inclut tous les items des gestionnaires plus les items spécifiques admin)
  const adminItems = [
    ...gestionnaireItems,
    {
      title: "Administration",
      url: "#",
      icon: Cog,
      items: [
        {
          title: "Gestion pièces",
          url: "/admin/pieces",
          icon: BoxesIcon,
        },
        {
          title: "Gestion commandes",
          url: "/admin/commandes",
          icon: Receipt,
        },
        {
          title: "Gestion utilisateurs",
          url: "/employes",
          icon: Users,
        },
      ],
    },
    {
      title: "Statistiques",
      url: "/statistiques",
      icon: ChartArea,
      items: [],
    },
  ];

  // Retourne les items en fonction du rôle
  switch (role) {
    case 'admin':
      return adminItems;
    case 'gestionnaire':
      return gestionnaireItems;
    default:
      return commonItems;
  }
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  const navigationItems = getNavigationItems(user?.role || 'user');

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
        <NavMain items={navigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}