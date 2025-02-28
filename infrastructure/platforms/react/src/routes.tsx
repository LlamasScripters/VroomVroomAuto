import { RouteObject } from 'react-router-dom';
import MotoManagementPage from './pages/MotoManagementPage';
import DashboardPage from './pages/DashboardPage';
import EntretienManagementPage from './pages/EntretienManagementPage';
import PanneManagementPage from './pages/PanneManagementPage';
import ReparationManagementPage from './pages/ReparationManagementPage';
import PieceManagementPage from './pages/PieceManagementPage';
import GarantieManagementPage from './pages/GarantieManagementPage';
import ClientManagementPage from './pages/ClientManagementPage';
import EmployeManagementPage from './pages/EmployeManagementPage';
import MaintenanceRuleManagementPage from './pages/MaintenanceRuleManagementPage';
import StatisticsPage from './pages/StatisticsPage';
import EntretienPlanificationPage from './pages/EntretienPlanificationPage';
import EntretienHistoriquePage from './pages/EntretienHistoriquePage';
import ClientEntretiensPage from './pages/ClientEntretiensPage';
import ClientEntretiensHistoriquePage from './pages/ClientEntretiensHistoriquePage';
import MiseAJourKilometrage from './pages/MisAJourKilometrage';
import CommandeManagementPage from './pages/CommandeManagementPage';
import AdminPieceFournisseurPage from './pages/AdminPieceFournisseurPage';
import SuiviCommandesPage from './pages/SuiviCommandesPage';
import HistoriqueCommandesPage from './pages/HistoriqueCommandesPage';
import CataloguePiecesFournisseurPage from './pages/CataloguePiecesFournisseurPage';
import ConducteurManagementPage from './pages/ConducteurManagementPage';

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
    path: '/entretiens',
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
  {
    path: '/employes',
    element: <EmployeManagementPage />,
  },
  {
    path: '/statistiques',
    element: <StatisticsPage />,
  },
  {
    path: '/maintenance-rules',
    element: <MaintenanceRuleManagementPage />,
  },
  {
    path: '/entretiens/planification',
    element: <EntretienPlanificationPage />,
  },
  {
    path: '/entretiens/historique',
    element: <EntretienHistoriquePage />,
  },
  {
    path: '/entretiens/mes-entretiens',
    element: <ClientEntretiensPage />,
  },
  {
    path: '/mise-a-jour-km',
    element: <MiseAJourKilometrage />,
  },
  {
    path: '/entretiens/mes-entretiens/historique',
    element: <ClientEntretiensHistoriquePage />,
  },
  {
    path: '/admin/commandes',
    element: <CommandeManagementPage />,
  },
  {
    path: '/admin/pieces',
    element: <AdminPieceFournisseurPage />,
  },
  {
    path: '/commandes/suivi-commandes',
    element: <SuiviCommandesPage />,
  },
  {
    path: '/commandes/historique',
    element: <HistoriqueCommandesPage />,
  },
  {
    path: '/commandes/catalogue-pieces',
    element: <CataloguePiecesFournisseurPage />,
  },
  {
    path: '/conducteurs',
    element: <ConducteurManagementPage />,
  },

];

export default routes;