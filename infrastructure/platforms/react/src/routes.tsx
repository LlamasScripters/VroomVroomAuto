import { RouteObject } from 'react-router-dom';
import MotoManagementPage from './pages/MotoManagementPage';
import DashboardPage from './pages/DashboardPage';
import EntretienManagementPage from './pages/EntretienManagementPage';
import PanneManagementPage from './pages/PanneManagementPage';
import ReparationManagementPage from './pages/ReparationManagementPage';
import PieceManagementPage from './pages/PieceManagementPage';
import GarantieManagementPage from './pages/GarantieManagementPage';
import ClientManagementPage from './pages/ClientManagementPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/moto-management',
    element: <MotoManagementPage />,
  },
  {
    path: '/entretien',
    element: <EntretienManagementPage />,
  },
  {
    path: '/pannes',
    element: <PanneManagementPage />,
  },
  {
    path: '/garanties',
    element: <GarantieManagementPage />,
  },
  { 
    path: '/reparations',
    element: <ReparationManagementPage />,
  },
  {
    path: '/pieces',
    element: <PieceManagementPage />,
  },
  {
    path: '/clients',
    element: <ClientManagementPage />,
  },
];

export default routes;
