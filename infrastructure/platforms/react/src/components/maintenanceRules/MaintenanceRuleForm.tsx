import React, { useState, useEffect } from 'react';
import { MaintenanceRule, Moto } from '../../types';
import { MotoService } from '../../services/motoService';

interface MaintenanceRuleFormProps {
 onSubmit: (rule: MaintenanceRule) => void;
 onCancel: () => void;
 initialData?: MaintenanceRule;
}

const MaintenanceRuleForm: React.FC<MaintenanceRuleFormProps> = ({
 onSubmit,
 onCancel,
 initialData,
}) => {
 const [motos, setMotos] = useState<Moto[]>([]);
 const [formData, setFormData] = useState<MaintenanceRule>(
   initialData || {
     modele: '',
     intervalleKilometrage: 10000,
     intervalleTemps: 365,
     typeEntretien: 'Préventif',
   }
 );

 useEffect(() => {
   const fetchMotos = async () => {
     try {
       const motosData = await MotoService.getAllMotos();
       setMotos(motosData);
     } catch (error) {
       console.error('Erreur lors de la récupération des motos:', error);
     }
   };
   fetchMotos();
 }, []);

 const handleChange = (
   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
   const { name, value } = e.target;
   setFormData((prev) => ({
     ...prev,
     [name]: name.includes('intervalle') ? parseInt(value, 10) : value,
   }));
 };

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   onSubmit(formData);
 };

 // Get unique models from motos
 const uniqueModels = Array.from(new Set(motos.map(moto => moto.model)));

 return (
   <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
     <h2 className="text-xl font-bold mb-4">
       {initialData ? 'Modifier' : 'Créer'} une règle de maintenance
     </h2>

     <div className="space-y-4">
       <div>
         <label className="block text-sm font-medium text-gray-700">
           Modèle de moto
         </label>
         <select
           name="modele"
           value={formData.modele}
           onChange={handleChange}
           className="mt-1 block w-full rounded-md border border-gray-300 p-2"
           required
         >
           <option value="">Sélectionnez un modèle</option>
           {uniqueModels.map((model) => (
             <option key={model} value={model}>
               {model}
             </option>
           ))}
         </select>
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700">
           Intervalle kilométrique
         </label>
         <input
           type="number"
           name="intervalleKilometrage"
           value={formData.intervalleKilometrage}
           onChange={handleChange}
           min="0"
           className="mt-1 block w-full rounded-md border border-gray-300 p-2"
           required
         />
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700">
           Intervalle temps (jours)
         </label>
         <input
           type="number"
           name="intervalleTemps"
           value={formData.intervalleTemps}
           onChange={handleChange}
           min="0"
           className="mt-1 block w-full rounded-md border border-gray-300 p-2"
           required
         />
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700">
           Type d'entretien
         </label>
         <select
           name="typeEntretien"
           value={formData.typeEntretien}
           onChange={handleChange}
           className="mt-1 block w-full rounded-md border border-gray-300 p-2"
           required
         >
           <option value="Préventif">Préventif</option>
           <option value="Curatif">Curatif</option>
         </select>
       </div>
     </div>

     <div className="mt-6 flex justify-end space-x-4">
       <button
         type="button"
         onClick={onCancel}
         className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
       >
         Annuler
       </button>
       <button
         type="submit"
         className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
       >
         {initialData ? 'Modifier' : 'Créer'}
       </button>
     </div>
   </form>
 );
};

export default MaintenanceRuleForm;