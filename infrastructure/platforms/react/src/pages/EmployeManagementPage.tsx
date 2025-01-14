import { useState } from 'react';
import { Employe } from '../types';
import EmployeForm from '../components/employeManagement/EmployeForm';
import EmployeTable from '../components/employeManagement/EmployeTable';
import SearchAndFilters from '../components/shared/SearchAndFilters';

const mockEmployes: Employe[] = [
    {
        id: '1',
        nom: 'Doe',
        prenom: 'Alain',
        mail: 'ad@gmail.com',
        telephone: '123456789',
        dateCreation: new Date(),
        derniereConnexion: new Date(),
        role: 'Mecanicien'
    },
    {
        id: '2',
        nom: 'Doe',
        prenom: 'Samantha',
        mail: 'ds@gmail.com',
        telephone: '987654321',
        dateCreation: new Date(),
        derniereConnexion: new Date(),
        role: 'Mecanicienne'
    },
    {
        id: '3',
        nom: 'Malam',
        prenom: 'Derrick',
        mail: 'md@yahoo.fr',
        telephone: '123456789',
        dateCreation: new Date(),
        derniereConnexion: new Date(),
        role: 'Commercial'
    },
    {
        id: '4',
        nom: 'Flintstone',
        prenom: 'William',
        mail: 'fw@yahoo.fr',
        telephone: '987654321',
        dateCreation: new Date(),
        derniereConnexion: new Date(),
        role: 'Stagiaire'
    }
];

function EmployeManagementPage() {
        const [employes, setEmployes] = useState<Employe[]>(mockEmployes);
        const [isFormVisible, setIsFormVisible] = useState(false);
        const [currentEmploye, setCurrentEmploye] = useState<Employe | null>(null);
    
        const handleAddEmploye = () => {
            setCurrentEmploye(null);
            setIsFormVisible(true);
        };
    
        const handleEditEmploye = (employe: Employe) => {
            setCurrentEmploye(employe);
            setIsFormVisible(true);
        };
    
        const handleDeleteEmploye = (id: string) => {
            setEmployes(employes.filter((employe) => employe.id !== id));
            alert("Employé supprimé avec succès !");
        };
    
        const handleSubmitEmploye = (employe: Employe) => {
            if (employe.id) {
                setEmployes(
                    employes.map((r) => (r.id === employe.id ? { ...employe } : r))
                );
                alert("Employé modifié avec succès !");
            } else {
                setEmployes([
                    ...employes,
                    { ...employe, id: `${Date.now()}` },
                ]);
                alert("Employé ajouté avec succès !");
            }
            setIsFormVisible(false);
        };
    
        const handleCancelForm = () => {
            setIsFormVisible(false);
        };
    
        const handleSearch = (query: string) => {
            setEmployes(
                mockEmployes.filter((employe) =>
                    employe.nom.toLowerCase().includes(query.toLowerCase())
                )
            );
        };
    
        const handleFilter = (filter: string) => {
            if (filter === '') {
            setEmployes(mockEmployes);
            } else {
            setEmployes(
                mockEmployes.filter((employe) =>
                employe.nom.toLowerCase().includes(filter.toLowerCase())
                )
            );
            }
        };
        
        return (
            <div className="">
            <h1 className="text-2xl font-bold mb-4">Gestion des Employés</h1>
            <SearchAndFilters
                onSearch={handleSearch}
                onFilter={handleFilter}
                filterOptions={[
                    { value: 'Doe', label: 'Doe' },
                    { value: 'Malam', label: 'Malam' },
                    { value: 'Flintstone', label: 'Flintstone' }
                ]}
                placeholder="Rechercher un employé..."
            />
            <button
                onClick={handleAddEmploye}
                className="bg-blue-500 text-white py-2 px-4 rounded my-4"
            >
                Ajouter un employé
            </button>
            <EmployeTable
                employes={employes}
                onEditEmploye={handleEditEmploye}
                onDeleteEmploye={handleDeleteEmploye}
            />
        
            {isFormVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <EmployeForm
                    onSubmit={handleSubmitEmploye}
                    onCancel={handleCancelForm}
                    initialData={currentEmploye || undefined}
                />
                </div>
            )}
            </div>
        );
    }
    

export default EmployeManagementPage;
