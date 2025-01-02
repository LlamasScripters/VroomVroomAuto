import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Link } from "react-router";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function Component() {
  return (
    <div key="1" className="grid min-h-screen bg-gray-100/40 lg:grid-cols-[280px_1fr] dark:bg-gray-800/40">
      <Sheet>
        <div className="hidden border-r border-gray-200 bg-gray-100/40 lg:block dark:border-gray-800 dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b border-gray-200 px-6 dark:border-gray-800">
              <Link className="flex items-center gap-2 font-semibold" to="#">
              <i className="bi-car-front h-6 w-6"></i>
                <span className="">VroomVroomAuto</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-house"></i>
                  Home
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-graph-up-arrow"></i>
                  Analytics
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                >
                  <i className="bi bi-cart2"></i>
                  Orders
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-box-seam"></i>
                  Products
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-people"></i>
                  Customers
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-bank"></i>
                  Finances
                </Link>
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
              <Link className="flex items-center gap-2 font-semibold" to="#">
                <i className="bi-car-front h-6 w-6"></i>
                <span className="">VroomVroomAuto</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-house"></i>
                  Home
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  to="#"
                
                >
                 <i className="bi bi-graph-up-arrow"></i>
                  Analytics
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-cart2"></i>
                  Orders
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-box-seam"></i>
                  Products
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-people"></i>
                  Customers
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  to="#"
                
                >
                  <i className="bi bi-bank"></i>
                  Finances
                </Link>
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" to="#">
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <i className="bi bi-search absolute left-2.5 top-1.5 h-4 w-4 text-gray-600 dark:text-gray-400"></i>
                <Input
                  className="w-full bg-gray-100/50 appearance-none shadow-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-800/50 dark:placeholder-gray-800"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{ aspectRatio: "32/32", objectFit: "cover" }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      </div>
    </div>
  )
}