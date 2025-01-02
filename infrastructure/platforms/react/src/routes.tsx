import { RouteObject } from 'react-router-dom';
import MotoManagementPage from './pages/MotoManagementPage';
import DashboardPage from './pages/DashboardPage';

const routes: RouteObject[] = [
  {
    path: '/moto-management',
    element: <MotoManagementPage />,
  },
  {
    path: '/',
    element: <DashboardPage />,
  },
  // Autres pages à ajouter
  // {
  //   path: '/login',
  //   element: <LoginPage />,
  // },
];

export default routes;
