// infrastructure/platforms/react/src/components/conducteurManagement/ConducteurForm.tsx
import { useAuthStore } from '@/stores/authStore';
import React, { useState, useEffect } from 'react';
import { User, Moto } from '../../types';
import { ConducteurService } from '@/services/conducteurService';
import { UserMotos } from './UserMotos';

interface ConducteurFormProps {
    onSubmit: (conducteur: {
      conducteurId?: string;
      nom: string;
      prenom: string;
      dateNaissance: string;
      numeroPermis: string;
      categoriePermis: string;
      dateObtentionPermis: string;
      dateValiditePermis: string;
      anneeExperience: number;
      telephone: string;
      email: string;
      disponibilite: 'SEMAINE' | 'WEEKEND' | 'TEMPS_PLEIN';
      statut: 'ACTIF' | 'INACTIF' | 'SUSPENDU';
      userId: string;
    }) => void;
    onCancel: () => void;
    initialData?: {
      conducteurId?: string;
      nom: string;
      prenom: string;
      dateNaissance: string;
      numeroPermis: string;
      categoriePermis: string;
      dateObtentionPermis: string;
      dateValiditePermis: string;
      anneeExperience: number;
      telephone: string;
      email: string;
      disponibilite: 'SEMAINE' | 'WEEKEND' | 'TEMPS_PLEIN';
      statut: 'ACTIF' | 'INACTIF' | 'SUSPENDU';
      userId: string;
    };
  }
  
  function ConducteurForm({ onSubmit, onCancel, initialData }: ConducteurFormProps) {
    const [users, setUsers] = useState<User[]>([]);
  
    const formatDateForInput = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };
  
    const [formData, setFormData] = useState({
        conducteurId: initialData?.conducteurId || '',
        nom: initialData?.nom || '',
        prenom: initialData?.prenom || '',
        dateNaissance: initialData?.dateNaissance ? formatDateForInput(initialData.dateNaissance) : '',
        numeroPermis: initialData?.numeroPermis || '',
        categoriePermis: initialData?.categoriePermis || 'A',
        dateObtentionPermis: initialData?.dateObtentionPermis ? formatDateForInput(initialData.dateObtentionPermis) : '',
        dateValiditePermis: initialData?.dateValiditePermis ? formatDateForInput(initialData.dateValiditePermis) : '',
        anneeExperience: initialData?.anneeExperience || 0,
        telephone: initialData?.telephone || '',
        email: initialData?.email || '',
        disponibilite: initialData?.disponibilite || 'SEMAINE',
        statut: initialData?.statut || 'ACTIF',
        userId: initialData?.userId || '',
    });

    const [userMotos, setUserMotos] = useState<Moto[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/user', {
              headers: {
                'Authorization': `Bearer ${useAuthStore.getState().token}`
              }
            });
            if (!response.ok) {
              throw new Error('Erreur lors du chargement des utilisateurs');
            }
            const data = await response.json();
            setUsers(data);
          } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
          }
        };
    
        loadUsers();
      }, []);
  
      const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
          const newData = { ...prev, [name]: value };
          
          if (name === 'userId') {
            const selectedUser = users.find(u => u.userId === value);
            if (selectedUser) {
              newData.email = selectedUser.email;
              // chargement des motos de l'utilisateur
              ConducteurService.getMotosByUserId(value)
                .then(motos => setUserMotos(motos))
                .catch(error => console.error('Erreur lors du chargement des motos:', error));
            } else {
              setUserMotos([]);
            }
          }
          
          return newData;
        });
      };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.anneeExperience < 0) {
          alert("Les années d'expérience ne peuvent pas être négatives.");
          return;
        }
        
        if (!formData.userId) {
          alert("Veuillez sélectionner un utilisateur.");
          return;
        }
        
        if (formData.numeroPermis.length !== 12 || !/^\d{12}$/.test(formData.numeroPermis)) {
          alert("Le numéro NEPH doit contenir exactement 12 chiffres.");
          return;
        }
        
        onSubmit(formData);
      };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Modifier le conducteur' : 'Ajouter un conducteur'}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Ajout du sélecteur d'utilisateur */}
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sélectionnez un utilisateur</option>
            {users.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
        </div>
      </div>

      {formData.userId && (
        <div className="col-span-2 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Motos associées</h3>
            <UserMotos motos={userMotos} />
        </div>
        )}

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">
            Date de naissance
          </label>
          <input
            type="date"
            id="dateNaissance"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
            <label htmlFor="numeroPermis" className="block text-sm font-medium text-gray-700">
            Numéro de permis (NEPH)
            </label>
            <input
            type="text"
            id="numeroPermis"
            name="numeroPermis"
            value={formData.numeroPermis}
            onChange={(e) => {
                const newValue = e.target.value;
                if (/^\d*$/.test(newValue) && newValue.length <= 12) {
                handleChange(e);
                }
            }}
            maxLength={12}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            placeholder={formData.numeroPermis ? "" : "123456789012"}
            />
            <p className="mt-1 text-sm text-gray-500">
            Le numéro NEPH doit contenir exactement 12 chiffres
            </p>
        </div>

        <div className="mb-4">
          <label htmlFor="categoriePermis" className="block text-sm font-medium text-gray-700">
            Catégorie de permis
          </label>
          <select
            id="categoriePermis"
            name="categoriePermis"
            value={formData.categoriePermis}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="AM">AM</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A">A</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="dateObtentionPermis" className="block text-sm font-medium text-gray-700">
            Date d'obtention du permis
          </label>
          <input
            type="date"
            id="dateObtentionPermis"
            name="dateObtentionPermis"
            value={formData.dateObtentionPermis}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dateValiditePermis" className="block text-sm font-medium text-gray-700">
            Date de validité du permis
          </label>
          <input
            type="date"
            id="dateValiditePermis"
            name="dateValiditePermis"
            value={formData.dateValiditePermis}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="anneeExperience" className="block text-sm font-medium text-gray-700">
            Années d'expérience
          </label>
          <input
            type="number"
            id="anneeExperience"
            name="anneeExperience"
            value={formData.anneeExperience}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
            Téléphone
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="disponibilite" className="block text-sm font-medium text-gray-700">
            Disponibilité
          </label>
          <select
            id="disponibilite"
            name="disponibilite"
            value={formData.disponibilite}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="SEMAINE">Semaine</option>
            <option value="WEEKEND">Weekend</option>
            <option value="TEMPS_PLEIN">Temps plein</option>
          </select>
        </div>

        {initialData && (
          <div className="mb-4">
            <label htmlFor="statut" className="block text-sm font-medium text-gray-700">
              Statut
            </label>
            <select
              id="statut"
              name="statut"
              value={formData.statut}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="ACTIF">Actif</option>
              <option value="INACTIF">Inactif</option>
              <option value="SUSPENDU">Suspendu</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          {initialData ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}

export default ConducteurForm;