"use client"

import { useState, useEffect } from "react"
import type { HistoriqueEssai } from "../../types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CalendarIcon, AlertTriangle } from "lucide-react"
import { EssaiService } from "../../services/essaiService"

interface ConducteurHistoriqueProps {
  conducteurId: string
  isOpen: boolean
  onClose: () => void
}

export function ConducteurHistorique({ conducteurId, isOpen, onClose }: ConducteurHistoriqueProps) {
  const [essais, setEssais] = useState<HistoriqueEssai[]>([])
  const [filtreType, setFiltreType] = useState<"TOUS" | "AVEC_INCIDENT" | "SANS_INCIDENT">("TOUS")
  const [selectedEssai, setSelectedEssai] = useState<HistoriqueEssai | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEssais = async () => {
      if (isOpen && conducteurId) {
        try {
          setIsLoading(true)
          const data = await EssaiService.getEssaisByConducteurId(conducteurId)
          setEssais(data)
        } catch (err) {
          console.error("Erreur lors de la récupération des essais:", err)
          setError("Erreur lors du chargement des essais")
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchEssais()
  }, [conducteurId, isOpen])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDuree = (dureeMinutes: number) => {
    const heures = Math.floor(dureeMinutes / 60)
    const minutes = dureeMinutes % 60
    return `${heures}h${minutes.toString().padStart(2, "0")}`
  }

  const essaisFiltres = essais.filter((essai) => {
    switch (filtreType) {
      case "AVEC_INCIDENT":
        return essai.incidents && essai.incidents.length > 0
      case "SANS_INCIDENT":
        return !essai.incidents || essai.incidents.length === 0
      default:
        return true
    }
  })

  if (isLoading) {
    return <div>Chargement des essais...</div>
  }

  if (error) {
    return <Alert variant="destructive">{error}</Alert>
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Historique de conduite</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <Select
            value={filtreType}
            onValueChange={(value: "TOUS" | "AVEC_INCIDENT" | "SANS_INCIDENT") => setFiltreType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrer les essais" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TOUS">Tous les essais</SelectItem>
              <SelectItem value="AVEC_INCIDENT">Essais avec incidents</SelectItem>
              <SelectItem value="SANS_INCIDENT">Essais sans incidents</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {essaisFiltres.length === 0 ? (
          <Alert>
            <CalendarIcon className="h-4 w-4" />
            <AlertTitle>Aucun essai</AlertTitle>
            <AlertDescription>Aucun essai ne correspond aux critères sélectionnés.</AlertDescription>
          </Alert>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Moto</TableHead>
                <TableHead>Durée</TableHead>
                <TableHead>Incidents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {essaisFiltres.map((essai) => (
                <TableRow key={essai.essaiId}>
                  <TableCell>{formatDate(essai.dateDebut)}</TableCell>
                  <TableCell>
                    {essai.motoDetails
                      ? `${essai.motoDetails.marque} ${essai.motoDetails.model}`
                      : "Moto non disponible"}
                  </TableCell>
                  <TableCell>{formatDuree(essai.duree)}</TableCell>
                  <TableCell>
                    {essai.incidents && essai.incidents.length > 0 && (
                      <span className="flex items-center text-amber-600">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        {essai.incidents.length}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <button onClick={() => setSelectedEssai(essai)} className="text-blue-600 hover:text-blue-800">
                      Détails
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {selectedEssai && (
          <Dialog open={!!selectedEssai} onOpenChange={() => setSelectedEssai(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Détails de l'essai</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="font-medium">Début</dt>
                        <dd>{formatDate(selectedEssai.dateDebut)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium">Fin</dt>
                        <dd>{formatDate(selectedEssai.dateFin)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium">Durée</dt>
                        <dd>{formatDuree(selectedEssai.duree)}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                {selectedEssai.incidents && selectedEssai.incidents.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Incidents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedEssai.incidents.map((incident, index) => (
                        <div key={incident.incidentId} className={index > 0 ? "mt-4 pt-4 border-t" : ""}>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="font-medium">Type</dt>
                              <dd
                                className={
                                  incident.gravite === "CRITIQUE"
                                    ? "text-red-600"
                                    : incident.gravite === "MAJEUR"
                                      ? "text-amber-600"
                                      : "text-yellow-600"
                                }
                              >
                                {incident.type}
                              </dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="font-medium">Date</dt>
                              <dd>{formatDate(incident.dateIncident)}</dd>
                            </div>
                            <div>
                              <dt className="font-medium mb-1">Description</dt>
                              <dd className="text-gray-600">{incident.description}</dd>
                            </div>
                          </dl>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  )
}

