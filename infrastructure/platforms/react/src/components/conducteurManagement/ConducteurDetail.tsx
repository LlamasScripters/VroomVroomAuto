"use client"

import { useState } from "react"
import type { Conducteur, Moto } from "../../types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ConducteurHistorique } from "./ConducteurHistorique"
import { History } from "lucide-react"

interface ConducteurDetailProps {
  conducteur: Conducteur
  motos: Moto[]
  isOpen: boolean
  onClose: () => void
}

export function ConducteurDetail({ conducteur, motos, isOpen, onClose }: ConducteurDetailProps) {
  const [showHistorique, setShowHistorique] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Détails du conducteur</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Nom complet</dt>
                  <dd>
                    {conducteur.nom} {conducteur.prenom}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Date de naissance</dt>
                  <dd>{formatDate(conducteur.dateNaissance)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Email</dt>
                  <dd>{conducteur.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Téléphone</dt>
                  <dd>{conducteur.telephone}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations permis</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Numéro NEPH</dt>
                  <dd>{conducteur.numeroPermis}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Catégorie</dt>
                  <dd>{conducteur.categoriePermis}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Date d'obtention</dt>
                  <dd>{formatDate(conducteur.dateObtentionPermis)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Date de validité</dt>
                  <dd className={conducteur.permisValide ? "text-green-600" : "text-red-600"}>
                    {formatDate(conducteur.dateValiditePermis)}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Motos associées</CardTitle>
          </CardHeader>
          <CardContent>
            {motos.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marque</TableHead>
                    <TableHead>Modèle</TableHead>
                    <TableHead>N° Série</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Kilométrage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {motos.map((moto) => (
                    <TableRow key={moto.motoId}>
                      <TableCell>{moto.marque}</TableCell>
                      <TableCell>{moto.model}</TableCell>
                      <TableCell>{moto.serialNumber}</TableCell>
                      <TableCell>{moto.statut}</TableCell>
                      <TableCell>{moto.kilometrage} km</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-gray-500 italic">Aucune moto associée</p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button onClick={() => setShowHistorique(true)} className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Voir l'historique de conduite
          </Button>
        </div>

        {showHistorique && (
          <ConducteurHistorique
            conducteurId={conducteur.conducteurId!}
            isOpen={showHistorique}
            onClose={() => setShowHistorique(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

