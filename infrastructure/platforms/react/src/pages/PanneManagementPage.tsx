import { useState, useEffect } from "react"
import type { Panne } from "../types"
import { PanneService } from "../services/panneService"
import { PanneTable } from "../components/panneManagement/PanneTable"
import { PanneForm } from "../components/panneManagement/PanneForm"
import SearchAndFilters from "../components/shared/SearchAndFilters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "react-hot-toast"

export default function PanneManagementPage() {
  const [pannes, setPannes] = useState<Panne[]>([])
  const [filteredPannes, setFilteredPannes] = useState<Panne[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [currentPanne, setCurrentPanne] = useState<Panne | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pannesPerPage = 10

  useEffect(() => {
    fetchPannes()
  }, [])

  const fetchPannes = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await PanneService.getAllPannes()
      setPannes(data)
      setFilteredPannes(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue"
      setError(errorMessage)
      toast.error("Erreur lors de la récupération des pannes")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPanne = () => {
    setCurrentPanne(null)
    setIsFormVisible(true)
  }

  const handleEditPanne = (panne: Panne) => {
    setCurrentPanne(panne)
    setIsFormVisible(true)
  }

  const handleDeletePanne = async (panneId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette panne ?")) {
      return
    }

    try {
      await PanneService.deletePanne(panneId)
      setPannes(pannes.filter((panne) => panne.panneId !== panneId))
      setFilteredPannes(filteredPannes.filter((panne) => panne.panneId !== panneId))
      toast.success("Panne supprimée avec succès")
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de la suppression de la panne")
    }
  }

  const handleSubmitPanne = async (panneData: Omit<Panne, "panneId">) => {
    try {
      if (currentPanne?.panneId) {
        await PanneService.updatePanne({ ...panneData, panneId: currentPanne.panneId })
        toast.success("Panne modifiée avec succès")
      } else {
        await PanneService.createPanne(panneData)
        toast.success("Panne créée avec succès")
      }
      setIsFormVisible(false)
      fetchPannes()
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de l'enregistrement de la panne")
    }
  }

  const handleSearch = (query: string) => {
    const filtered = pannes.filter(
      (panne) =>
        panne.description.toLowerCase().includes(query.toLowerCase()) ||
        panne.motoId.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredPannes(filtered)
    setCurrentPage(1)
  }

  const handleFilter = (status: string) => {
    if (status === "") {
      setFilteredPannes(pannes)
    } else {
      const filtered = pannes.filter((panne) => panne.status === status)
      setFilteredPannes(filtered)
    }
    setCurrentPage(1)
  }

  // Pagination
  const indexOfLastPanne = currentPage * pannesPerPage
  const indexOfFirstPanne = indexOfLastPanne - pannesPerPage
  const currentPannes = filteredPannes.slice(indexOfFirstPanne, indexOfLastPanne)
  const totalPages = Math.ceil(filteredPannes.length / pannesPerPage)

  return (
    <div className="container mx-auto p-4">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Pannes</h1>
        <Button onClick={handleAddPanne} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajouter une panne
        </Button>
      </div>

      {error && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: "à traiter", label: "À traiter" },
          { value: "en cours de traitement", label: "En cours de traitement" },
          { value: "traitée", label: "Traitée" },
        ]}
        placeholder="Rechercher une panne..."
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <PanneTable pannes={currentPannes} onEditPanne={handleEditPanne} onDeletePanne={handleDeletePanne} />
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
          <PanneForm
            onSubmit={handleSubmitPanne}
            onCancel={() => setIsFormVisible(false)}
            initialData={currentPanne || undefined}
          />
        </div>
      )}
    </div>
  )
}

