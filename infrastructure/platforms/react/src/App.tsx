import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Sidebar from "../src/components/sideBar/sideBar";
import DashboardPage from "./pages/DashboardPage";
import MotoManagementPage from "./pages/MotoManagementPage";
import EntretienManagementPage from "./pages/EntretienManagementPage";
import PanneManagementPage from "./pages/PanneManagementPage";
import GarantieManagementPage from "./pages/GarantieManagementPage";
import ReparationManagementPage from "./pages/ReparationManagementPage";
import PieceManagementPage from "./pages/PieceManagementPage";
import ClientManagementPage from "./pages/ClientManagementPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <Router>
      {/* Main grid container - creates the sidebar and main content columns */}
      <div className="grid min-h-screen bg-gray-100/40 lg:grid-cols-[280px_1fr] dark:bg-gray-800/40">
        {/* Sidebar component stays the same */}
        <Sidebar />
        {/* Main content area - uses flex column to stack header and content */}
        <div className="flex flex-col min-h-screen">
          {/* Header - now spans full width of the main content area */}
          <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            {/* HEADER*/}
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
              <DropdownMenuItem><Link to="/login">Se connecter</Link></DropdownMenuItem>
              <DropdownMenuItem><Link to="/register">S'inscrire</Link></DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </header>

          {/* Main content area - fills remaining space and enables scrolling */}
          <main className="flex-1 overflow-auto p-4 h-fit">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/moto-management" element={<MotoManagementPage />} />
              <Route path="/entretien" element={<EntretienManagementPage />} />
              <Route path="/pannes" element={<PanneManagementPage />} />
              <Route path="/garanties" element={<GarantieManagementPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reparations" element={<ReparationManagementPage />} />
              <Route path="/pieces" element={<PieceManagementPage />} />
              <Route path="/clients" element={<ClientManagementPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;