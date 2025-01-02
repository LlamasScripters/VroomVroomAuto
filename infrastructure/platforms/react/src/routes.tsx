import { RouteObject } from "react-router-dom";
import Layout from "./components/Layout";
import MotoManagementPage from "./pages/MotoManagementPage";
import DashboardPage from "./pages/DashboardPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/moto-management", element: <MotoManagementPage /> },
    ],
  },
];

export default routes;
