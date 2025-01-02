import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar/sideBar";

export default function Layout() {
  return (
    <div className="flex">
      {/* Sidebar persistante */}
      <Sidebar />
      {/* Contenu principal */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
