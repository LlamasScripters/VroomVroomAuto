import { RouteObject } from 'react-router-dom';
import MotoManagementPage from './pages/MotoManagementPage';
import DashboardPage from './pages/DashboardPage';
import EntretienManagementPage from './pages/EntretienManagementPage';
import PanneManagementPage from './pages/PanneManagementPage';

const routes: RouteObject[] = [
  {
    path: '/moto-management',
    element: <MotoManagementPage />,
  },
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/entretien',
    element: <EntretienManagementPage />,
  },
  {
    path: '/pannes',
    element: <PanneManagementPage />,
  },
  // Autres pages à ajouter
  // {
  //   path: '/login',
  //   element: <LoginPage />,
  // },
];

export default routes;
