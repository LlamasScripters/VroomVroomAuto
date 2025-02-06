// infrastructure/platforms/react/src/components/conducteurManagement/UserMotos.tsx
import { Moto } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UserMotosProps {
  motos: Moto[];
}

export function UserMotos({ motos }: UserMotosProps) {
  if (motos.length === 0) {
    return <p className="text-sm text-gray-500 italic">Aucune moto associée à cet utilisateur</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Marque</TableHead>
          <TableHead>Modèle</TableHead>
          <TableHead>N° Série</TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {motos.map((moto) => (
          <TableRow key={moto.motoId}>
            <TableCell>{moto.marque}</TableCell>
            <TableCell>{moto.model}</TableCell>
            <TableCell>{moto.serialNumber}</TableCell>
            <TableCell>{moto.statut}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}