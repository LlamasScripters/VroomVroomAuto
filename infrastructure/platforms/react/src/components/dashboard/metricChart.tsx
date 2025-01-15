import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from 'lucide-react'

interface Metric {
  title: string;
  value: string;
  change: number;
}

const metrics: Metric[] = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: 20.1
    },
    {
      title: "Subscriptions",
      value: "2350",
      change: 180.1
    },
    {
      title: "Sales",
      value: "12,234",
      change: 19
    }
  ];
  

export function MetricCard({ title, value, change }: Metric) {
  const isPositive = change >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
          {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          {Math.abs(change)}% par rapport au mois dernier
        </p>
      </CardContent>
    </Card>
  )
}

