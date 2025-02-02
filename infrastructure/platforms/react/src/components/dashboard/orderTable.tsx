import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { MoveRight } from 'lucide-react'

  interface Order {
    id: string;
    customer: string;
    channel: string;
    date: string;
    total: number;
    status: 'Expédié' | 'Payé' | 'Non traité';
  }
  
  const orders: Order[] = [
    {
      id: "#3210",
      customer: "Olivia Martin",
      channel: "Boutique en ligne",
      date: "20 février 2022",
      total: 42.25,
      status: "Expédié"
    },
    {
      id: "#3209",
      customer: "Ava Johnson",
      channel: "Magasin",
      date: "5 janvier 2022",
      total: 74.99,
      status: "Payé"
    },
    {
      id: "#3204",
      customer: "Michael Johnson",
      channel: "Magasin",
      date: "3 août 2021",
      total: 64.75,
      status: "Non traité"
    }
  ] as const;
  
  export function OrdersTable() {
    return (
        <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commande</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Canal</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.channel}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total.toFixed(2)} €</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    order.status === "Expédié" ? "bg-green-50 text-green-700" :
                    order.status === "Payé" ? "bg-blue-50 text-blue-700" :
                    "bg-yellow-50 text-yellow-700"
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <button className="hover:opacity-75">
                    <MoveRight className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  
  