import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ClientGrowthData {
  name: string;
  total: number;
}

interface ClientGrowthChartProps {
  data: ClientGrowthData[];
}

export const ClientGrowthChart: React.FC<ClientGrowthChartProps> = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Croissance des clients</CardTitle>
    </CardHeader>
    <CardContent className="pl-2">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Line type="monotone" dataKey="total" stroke="#adfa1d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

