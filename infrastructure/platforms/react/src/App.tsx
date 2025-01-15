import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import MotoManagementPage from "./pages/MotoManagementPage";
import EntretienManagementPage from "./pages/EntretienManagementPage";
import PanneManagementPage from "./pages/PanneManagementPage";
import GarantieManagementPage from "./pages/GarantieManagementPage";
import ReparationManagementPage from "./pages/ReparationManagementPage";
import PieceManagementPage from "./pages/PieceManagementPage";
import ClientManagementPage from "./pages/ClientManagementPage";
import EmployeManagementPage from "./pages/EmployeManagementPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { AppSidebar } from "../src/components/sideBar/appSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const ProtectedLayout = ({ children }) => {
  
  // const isAuthenticated = localStorage.getItem('token'); 

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 h-fit">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques sans sidebar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Routes protégées avec sidebar */}
        <Route path="/" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
        <Route path="/moto-management" element={<ProtectedLayout><MotoManagementPage /></ProtectedLayout>} />
        <Route path="/entretien" element={<ProtectedLayout><EntretienManagementPage /></ProtectedLayout>} />
        <Route path="/pannes" element={<ProtectedLayout><PanneManagementPage /></ProtectedLayout>} />
        <Route path="/garanties" element={<ProtectedLayout><GarantieManagementPage /></ProtectedLayout>} />
        <Route path="/reparations" element={<ProtectedLayout><ReparationManagementPage /></ProtectedLayout>} />
        <Route path="/pieces" element={<ProtectedLayout><PieceManagementPage /></ProtectedLayout>} />
        <Route path="/clients" element={<ProtectedLayout><ClientManagementPage /></ProtectedLayout>} />
        <Route path="/employes" element={<ProtectedLayout><EmployeManagementPage /></ProtectedLayout>} />
      </Routes>
    </Router>
  );
}

export default App;