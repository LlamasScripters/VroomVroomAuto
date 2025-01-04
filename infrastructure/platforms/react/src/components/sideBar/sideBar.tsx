import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button"

export default function Component() {
  const navItems = [
    { to: "/", icon: "bi-house-door", text: "Accueil" },
    { to: "/moto-management", icon: "bi-bicycle", text: "Gestion des motos" },
    { to: "/entretien", icon: "bi-tools", text: "Entretien des motos" },
    { to: "/pannes", icon: "bi-exclamation-triangle", text: "Gestion des pannes" },
    { to: "/garanties", icon: "bi-shield-check", text: "Gestion des garanties" },
    { to: "/reparations", icon: "bi-wrench", text: "Réparations" },
    { to: "/pieces", icon: "bi-gear", text: "Pièces détachées" },
    { to: "/clients", icon: "bi-people", text: "Gestion des clients" },
    { to: "/employes", icon: "bi-person-badge", text: "Gestion des employés" },
    { to: "/statistiques", icon: "bi-graph-up", text: "Statistiques" },
    { to: "/factures", icon: "bi-receipt", text: "Factures" },
    { to: "/parametres", icon: "bi-gear-fill", text: "Paramètres" },
  ];

  const NavContent = () => (
    <>
      <div className="flex h-14 items-center border-b border-gray-200 px-6 dark:border-gray-800">
        <NavLink className="flex items-center gap-2 font-semibold" to="#">
          <i className="bi-car-front h-6 w-6"></i>
          <span className="">VroomVroomAuto</span>
        </NavLink>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              to={item.to}
            >
              <i className={`bi ${item.icon}`}></i>
              {item.text}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );

  return (
    <div className="grid bg-gray-100/40 lg:grid-cols-[280px_1fr] dark:bg-gray-800/40">
      <Sheet>
        <div className="hidden border-r border-gray-200 bg-gray-100/40 lg:block dark:border-gray-800 dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <NavContent />
          </div>
        </div>
        <SheetTrigger asChild>
          <Button className="lg:hidden" variant="outline">
            <i className="bi bi-list"></i>
            <span className="sr-only">Ouvrir le menu de navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <NavContent />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

