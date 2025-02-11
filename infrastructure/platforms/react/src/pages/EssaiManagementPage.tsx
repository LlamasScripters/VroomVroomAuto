"use client"

import { useState, useEffect } from "react"
import type { Essai } from "../types"
import { EssaiService } from "../services/essaiService"
import { EssaiTable } from "../components/essaiManagement/EssaiTable"
import { EssaiForm } from "../components/essaiManagement/EssaiForm"
import SearchAndFilters from "../components/shared/SearchAndFilters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "react-hot-toast"

export default function EssaiManagementPage() {
  const [essais, setEssais] = useState<Essai[]>([])
  const [filteredEssais, setFilteredEssais] = useState<Essai[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [currentEssai, setCurrentEssai] = useState<Essai | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const essaisPerPage = 10

  useEffect(() => {
    fetchEssais()
  }, [])

  const fetchEssais = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await EssaiService.getAllEssais()
      setEssais(data)
      setFilteredEssais(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue"
      setError(errorMessage)
      toast.error("Erreur lors de la récupération des essais")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddEssai = () => {
    setCurrentEssai(null)
    setIsFormVisible(true)
  }

  const handleEditEssai = (essai: Essai) => {
    setCurrentEssai(essai)
    setIsFormVisible(true)
  }

  const handleDeleteEssai = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet essai ?")) {
      return
    }

    try {
      await EssaiService.deleteEssai(id)
      setEssais(essais.filter((essai) => essai.essaiId !== id))
      setFilteredEssais(filteredEssais.filter((essai) => essai.essaiId !== id))
      toast.success("Essai supprimé avec succès")
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de la suppression de l'essai")
    }
  }

  const handleSubmitEssai = async (essaiData: Omit<Essai, "essaiId">) => {
    try {
      if (currentEssai?.essaiId) {
        await EssaiService.updateEssai({ ...essaiData, essaiId: currentEssai.essaiId })
        toast.success("Essai modifié avec succès")
      } else {
        await EssaiService.createEssai(essaiData)
        toast.success("Essai créé avec succès")
      }
      setIsFormVisible(false)
      fetchEssais()
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de l'enregistrement de l'essai")
    }
  }

  const handleSearch = (query: string) => {
    const filtered = essais.filter(
      (essai) =>
        essai.motoId.toLowerCase().includes(query.toLowerCase()) ||
        essai.conducteurId.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredEssais(filtered)
    setCurrentPage(1)
  }

  const handleFilter = (dateDebut: string) => {
    if (dateDebut === "") {
      setFilteredEssais(essais)
    } else {
      const filtered = essais.filter((essai) => essai.dateDebut.startsWith(dateDebut))
      setFilteredEssais(filtered)
    }
    setCurrentPage(1)
  }

  // Pagination
  const indexOfLastEssai = currentPage * essaisPerPage
  const indexOfFirstEssai = indexOfLastEssai - essaisPerPage
  const currentEssais = filteredEssais.slice(indexOfFirstEssai, indexOfLastEssai)
  const totalPages = Math.ceil(filteredEssais.length / essaisPerPage)

  return (
    <div className="container mx-auto p-4">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Essais</h1>
        <Button onClick={handleAddEssai} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajouter un essai
        </Button>
      </div>

      {error && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: "", label: "Tous" },
          { value: new Date().toISOString().split("T")[0], label: "Aujourd'hui" },
          { value: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], label: "Cette semaine" },
          { value: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], label: "Ce mois" },
        ]}
        placeholder="Rechercher un essai..."
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <EssaiTable essais={currentEssais} onEditEssai={handleEditEssai} onDeleteEssai={handleDeleteEssai} />
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            variant={currentPage === index + 1 ? "default" : "outline"}
            className="mx-1"
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <EssaiForm
            onSubmit={handleSubmitEssai}
            onCancel={() => setIsFormVisible(false)}
            initialData={currentEssai || undefined}
          />
        </div>
      )}
    </div>
  )
}

