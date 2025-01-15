import { MetricCard } from "../components/dashboard/metricChart"
import { BarChartComponent } from "../components/dashboard/barChart"
import { PieChartComponent } from "../components/dashboard/pieChart"
import { AreaChartComponent } from "../components/dashboard/areaChart"
import { OrdersTable } from "../components/dashboard/orderTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const metriques = [
	{
	  title: "Revenu Total",
	  value: "45 231,89 €",
	  change: 20.1
	},
	{
	  title: "Abonnements",
	  value: "2350",
	  change: 180.1
	},
	{
	  title: "Ventes",
	  value: "12 234",
	  change: 19
	}
  ];
  
  export default function TableauDeBord() {
	return (
	  <div className="flex flex-col gap-4 p-8">
		<div className="grid gap-4 md:grid-cols-3">
		  {metriques.map((metrique) => (
			<MetricCard key={metrique.title} {...metrique} />
		  ))}
		</div>
		
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		  <BarChartComponent />
		  <PieChartComponent />
		  <AreaChartComponent />
		</div>
  
		<Card>
		  <CardHeader>
			<CardTitle>Commandes Récentes</CardTitle>
		  </CardHeader>
		  <CardContent>
			<OrdersTable />
		  </CardContent>
		</Card>
	  </div>
	)
  }
  

