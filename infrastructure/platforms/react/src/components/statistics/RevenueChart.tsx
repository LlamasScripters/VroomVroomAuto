import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, YAxis } from "recharts"

interface RevenueData {
  name: string;
  total: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Revenus mensuels</CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer className="h-[300px]" config={{}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => `${value}€`} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}€`} />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
)

