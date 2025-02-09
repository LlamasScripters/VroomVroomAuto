import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Wrench, AlertTriangle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const DashboardComponent = () => {
  const { user } = useAuthStore();

  const getUserMetrics = (): DashboardMetric[] => {
    return [
      {
        title: "Mes Motos",
        value: "3",
        change: 0,
        icon: <Wrench className="h-4 w-4" />
      },
      {
        title: "Entretiens Prévus",
        value: "2",
        change: 0,
        icon: <Wrench className="h-4 w-4" />
      },
      {
        title: "Entretiens en Retard",
        value: "1",
        change: 50,
        icon: <AlertTriangle className="h-4 w-4" />
      }
    ];
  };

  const getGestionnaireMetrics = (): DashboardMetric[] => {
    return [
      {
        title: "Motos Gérées",
        value: "45",
        change: 12.5,
        icon: <Wrench className="h-4 w-4" />
      },
      {
        title: "Entretiens à Planifier",
        value: "8",
        change: -15.3,
        icon: <Clock className="h-4 w-4" />
      },
      {
        title: "Pièces en Stock Critique",
        value: "5",
        change: 20,
        icon: <AlertTriangle className="h-4 w-4" />
      }
    ];
  };

  const getAdminMetrics = (): DashboardMetric[] => {
    return [
      {
        title: "Total Motos",
        value: "156",
        change: 8.2,
        icon: <Wrench className="h-4 w-4" />
      },
      {
        title: "Entretiens ce Mois",
        value: "45",
        change: 12.3,
        icon: <Wrench className="h-4 w-4" />
      },
      {
        title: "Alertes Système",
        value: "3",
        change: -40,
        icon: <AlertTriangle className="h-4 w-4" />
      }
    ];
  };

  const getMetricsByRole = () => {
    switch (user?.role) {
      case 'user':
        return getUserMetrics();
      case 'gestionnaire':
        return getGestionnaireMetrics();
      case 'admin':
        return getAdminMetrics();
      default:
        return [];
    }
  };

  const MetricCard = ({ title, value, change, icon }: DashboardMetric) => {
    const isPositive = change >= 0;
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            {Math.abs(change)}% par rapport au mois dernier
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold mb-4">
        Tableau de Bord - {user?.role === 'user' ? 'Client' : 
                          user?.role === 'gestionnaire' ? 'Gestionnaire' : 
                          'Administrateur'}
      </h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {getMetricsByRole().map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Vue d'ensemble des {user?.role === 'user' ? 'Entretiens' : 'Activités'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Jan', value: 40 },
                { name: 'Fév', value: 30 },
                { name: 'Mar', value: 45 },
                { name: 'Avr', value: 50 },
                { name: 'Mai', value: 35 },
                { name: 'Jun', value: 45 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardComponent;