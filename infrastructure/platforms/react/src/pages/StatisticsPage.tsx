import React from 'react';
import { StatCard } from '../components/statistics/StatCard';
import { RevenueChart } from '../components/statistics/RevenueChart';
import { ClientGrowthChart } from '../components/statistics/ClientGrowthChart';

const StatisticsPage: React.FC = () => {
  // Données factices pour les graphiques
  const monthlyRevenue = [
    { name: "Jan", total: 1200 },
    { name: "Fév", total: 1800 },
    { name: "Mar", total: 2200 },
    { name: "Avr", total: 2600 },
    { name: "Mai", total: 3200 },
    { name: "Jun", total: 3800 },
  ];

  const clientGrowth = [
    { name: "Jan", total: 100 },
    { name: "Fév", total: 150 },
    { name: "Mar", total: 200 },
    { name: "Avr", total: 300 },
    { name: "Mai", total: 400 },
    { name: "Jun", total: 500 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Statistiques</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenus totaux"
          value="15 000 €"
          description="+20.1% par rapport au mois dernier"
        />
        <StatCard
          title="Clients actifs"
          value="500"
          description="+15% par rapport au mois dernier"
        />
        <StatCard
          title="Réparations en cours"
          value="25"
          description="+5 par rapport à la semaine dernière"
        />
        <StatCard
          title="Taux de satisfaction"
          value="98%"
          description="+2% par rapport au mois dernier"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <RevenueChart data={monthlyRevenue} />
        <ClientGrowthChart data={clientGrowth} />
      </div>
    </div>
  );
};

export default StatisticsPage;

