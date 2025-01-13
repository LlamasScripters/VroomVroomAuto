import { useState } from 'react';
import { Client } from '../types';
import ClientForm from '../components/clientManagement/ClientForm';
import ClientTable from '../components/clientManagement/ClientTable';
import SearchAndFilters from '../components/shared/SearchAndFilters';

const mockClients: Client[] = [
  {
    id: '1',
    nom: 'Doe',
    prenom: 'John',
    mail: 'jd@gmail.com',
    telephone: '123456789'
  },
  {
    id: '2',
    nom: 'Doe',
    prenom: 'Jane',
    mail: 'dj@gmail.com',
    telephone: '987654321'
  },
  {
    id: '3',
    nom: 'Malam',
    prenom: 'David',
    mail: 'dav@yahoo.fr',
    telephone: '123456789'
  },
  {
    id: '4',
    nom: 'Flintstone',
    prenom: 'Wilma',
    mail: 'fili@yahoo.fr',
    telephone: '987654321'
  },
  {
    id: '5',
    nom: 'Simpson',
    prenom: 'Homer',
    mail: 'hp@outlook.fr',
    telephone: '126456789'
  },
  {
    id: '6',
    nom: 'Simpson',
    prenom: 'Marge',
    mail: 'marge@outlook.fr',
    telephone: '123457689'
  },
  {
    id: '7',
    nom: 'Simpson',
    prenom: 'Bart',
    mail: 'elbarto@gmail.com',
    telephone: '123456719'
  },
];

function ClientManagementPage() {
    const [clients, setClients] = useState<Client[]>(mockClients);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentClient, setCurrentClient] = useState<Client | null>(null);
  
    const handleAddClient = () => {
      setCurrentClient(null);
      setIsFormVisible(true);
    };
  
    const handleEditClient = (client: Client) => {
      setCurrentClient(client);
      setIsFormVisible(true);
    };
  
    const handleDeleteClient = (id: string) => {
      setClients(clients.filter((client) => client.id !== id));
      alert("Client supprimée avec succès !");
    };
  
    const handleSubmitClient = (client: Client) => {
      if (client.id) {
        setClients(
          clients.map((r) => (r.id === client.id ? { ...client } : r))
        );
        alert("Client modifiée avec succès !");
      } else {
        setClients([
          ...clients,
          { ...client, id: `${Date.now()}` },
        ]);
        alert("Client ajoutée avec succès !");
      }
      setIsFormVisible(false);
    };
  
    const handleCancelForm = () => {
      setIsFormVisible(false);
    };
  
    const handleSearch = (query: string) => {
      setClients(
        mockClients.filter((client) =>
          client.nom.toLowerCase().includes(query.toLowerCase())
        )
      );
    };
  
    const handleFilter = (filter: string) => {
      if (filter === '') {
      setClients(mockClients);
      } else {
      setClients(
        mockClients.filter((client) =>
        client.nom.toLowerCase().includes(filter.toLowerCase())
        )
      );
      }
    };
    
    return (
      <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestion des Clients</h1>
      <SearchAndFilters
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={[
          { value: '', label: ' Tout' },
          { value: 'Doe', label: 'Doe' },
          { value: 'Malam', label: 'Malam' },
          { value: 'Flintstone', label: 'Flintstone' },
          { value: 'Simpson', label: 'Simpson' }
        ]
        }
        placeholder="Rechercher un client..."
      />
      <button
        onClick={handleAddClient}
        className="bg-blue-500 text-white py-2 px-4 rounded my-4"
      >
        Ajouter un client
      </button>
      <ClientTable
        clients={clients}
        onEditClient={handleEditClient}
        onDeleteClient={handleDeleteClient}
      />
    
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <ClientForm
          onSubmit={handleSubmitClient}
          onCancel={handleCancelForm}
          initialData={currentClient || undefined}
        />
        </div>
      )}
      </div>
    );
  }
  

export default ClientManagementPage;
