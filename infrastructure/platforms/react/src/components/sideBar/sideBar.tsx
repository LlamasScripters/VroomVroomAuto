import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button"


export default function Component() {
  return (
    <div className="grid bg-gray-100/40 lg:grid-cols-[280px_1fr] dark:bg-gray-800/40">
      <Sheet>
        <div className="hidden border-r border-gray-200 bg-gray-100/40 lg:block dark:border-gray-800 dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b border-gray-200 px-6 dark:border-gray-800">
              <NavLink className="flex items-center gap-2 font-semibold" to="#">
              <i className="bi-car-front h-6 w-6"></i>
                <span className="">VroomVroomAuto</span>
              </NavLink>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="/"
                >
                  <i className="bi bi-house"></i>
                  Home
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  to="/moto-management"
                >
                  <i className="bi bi-graph-up-arrow"></i>
                  Gestion des motos
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="/entretien"
                >
                  <i className="bi bi-cart2"></i>
                  Entretien des motos
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="/pannes"
                >
                  <i className="bi bi-box-seam"></i>
                  Gestion des pannes
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="/garanties"
                >
                  <i className="bi bi-people"></i>
                  Gestion des garanties
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <i className="bi bi-bank"></i>
                  Finances
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
        <SheetTrigger asChild>
          <Button className="lg:hidden" variant="outline">
            <i className="bi bi-list"></i>
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b border-gray-200 px-6 dark:border-gray-800">
              <NavLink className="flex items-center gap-2 font-semibold" to="#">
                <i className="bi-car-front h-6 w-6"></i>
                <span className="">VroomVroomAuto</span>
              </NavLink>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="/"
                >
                  <i className="bi bi-house"></i>
                  Home
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  to="/moto-management"
                >
                 <i className="bi bi-graph-up-arrow"></i>
                  Analytics
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <i className="bi bi-cart2"></i>
                  Orders
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <i className="bi bi-box-seam"></i>
                  Products
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <i className="bi bi-people"></i>
                  Customers
                </NavLink>
                <NavLink
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <i className="bi bi-bank"></i>
                  Finances
                </NavLink>
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}