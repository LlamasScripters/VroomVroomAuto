// infrastructure/platforms/react/src/components/maintenanceRules/MaintenanceRuleTable.tsx
import React from 'react';
import { MaintenanceRule } from '../../types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'

interface MaintenanceRuleTableProps {
  rules: MaintenanceRule[];
  onEditRule: (rule: MaintenanceRule) => void;
  onDeleteRule: (id: string) => void;
}

const MaintenanceRuleTable: React.FC<MaintenanceRuleTableProps> = ({
  rules,
  onEditRule,
  onDeleteRule,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Modèle moto</TableHead>
          <TableHead>Intervalle KM</TableHead>
          <TableHead>Intervalle Temps</TableHead>
          <TableHead>Type d'entretien</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rules.map((rule) => (
          <TableRow key={rule.id}>
            <TableCell>{rule.modele}</TableCell>
            <TableCell>{rule.intervalleKilometrage} km</TableCell>
            <TableCell>{rule.intervalleTemps} jours</TableCell>
            <TableCell>{rule.typeEntretien}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => onEditRule(rule)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Modifier</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onDeleteRule(rule.id!)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Supprimer</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MaintenanceRuleTable;