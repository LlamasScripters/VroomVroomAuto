import { useState, useEffect } from "react"
import type { Garantie } from "../types"
import { GarantieService } from "../services/garantieService"
import { GarantieTable } from "../components/garantieManagement/GarantieTable"
import { GarantieForm } from "../components/garantieManagement/GarantieForm"
import SearchAndFilters from "../components/shared/SearchAndFilters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "react-hot-toast"

export default function GarantieManagementPage() {
  const [garanties, setGaranties] = useState<Garantie[]>([])
  const [filteredGaranties, setFilteredGaranties] = useState<Garantie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [currentGarantie, setCurrentGarantie] = useState<Garantie | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const garantiesPerPage = 10

  useEffect(() => {
    fetchGaranties()
  }, [])

  const fetchGaranties = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await GarantieService.getAllGaranties()
      setGaranties(data)
      setFilteredGaranties(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue"
      setError(errorMessage)
      toast.error("Erreur lors de la récupération des garanties")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddGarantie = () => {
    setCurrentGarantie(null)
    setIsFormVisible(true)
  }

  const handleEditGarantie = (garantie: Garantie) => {
    setCurrentGarantie(garantie)
    setIsFormVisible(true)
  }

  const handleDeleteGarantie = async (garantieId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette garantie ?")) {
      return
    }

    try {
      await GarantieService.deleteGarantie(garantieId)
      setGaranties(garanties.filter((garantie) => garantie.garantieId !== garantieId))
      setFilteredGaranties(filteredGaranties.filter((garantie) => garantie.garantieId !== garantieId))
      toast.success("Garantie supprimée avec succès")
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de la suppression de la garantie")
    }
  }

  const handleSubmitGarantie = async (garantieData: Omit<Garantie, "garantieId">) => {
    try {
      if (currentGarantie?.garantieId) {
        await GarantieService.updateGarantie({ ...garantieData, garantieId: currentGarantie.garantieId })
        toast.success("Garantie modifiée avec succès")
      } else {
        await GarantieService.createGarantie(garantieData)
        toast.success("Garantie créée avec succès")
      }
      setIsFormVisible(false)
      fetchGaranties()
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de l'enregistrement de la garantie")
    }
  }

  const handleSearch = (query: string) => {
    const filtered = garanties.filter(
      (garantie) =>
        garantie.couverture.toLowerCase().includes(query.toLowerCase()) ||
        garantie.type.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredGaranties(filtered)
    setCurrentPage(1)
  }

  const handleFilter = (statut: string) => {
    if (statut === "") {
      setFilteredGaranties(garanties)
    } else {
      const filtered = garanties.filter((garantie) => garantie.statut === statut)
      setFilteredGaranties(filtered)
    }
    setCurrentPage(1)
  }

  // Pagination
  const indexOfLastGarantie = currentPage * garantiesPerPage
  const indexOfFirstGarantie = indexOfLastGarantie - garantiesPerPage
  const currentGaranties = filteredGaranties.slice(indexOfFirstGarantie, indexOfLastGarantie)
  const totalPages = Math.ceil(filteredGaranties.length / garantiesPerPage)

  return (
    <div className="container mx-auto p-4">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Garanties</h1>
        <Button onClick={handleAddGarantie} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajouter une garantie
        </Button>
      </div>

      {error && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: "", label: "Tous" },
          { value: "Active", label: "Active" },
          { value: "Expirée", label: "Expirée" },
          { value: "En attente", label: "En attente" },
        ]}
        placeholder="Rechercher une garantie..."
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <GarantieTable
          garanties={currentGaranties}
          onEditGarantie={handleEditGarantie}
          onDeleteGarantie={handleDeleteGarantie}
        />
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
          <GarantieForm
            onSubmit={handleSubmitGarantie}
            onCancel={() => setIsFormVisible(false)}
            initialData={currentGarantie || undefined}
          />
        </div>
      )}
    </div>
  )
}

