import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function MiseAJourKilometrage() {
  const [searchParams] = useSearchParams();
  const [entretienId, setEntretienId] = useState('');
  const [kilometrage, setKilometrage] = useState('');

  useEffect(() => {

    const entretienId = searchParams.get('entretienId');
    if (entretienId) setEntretienId(entretienId);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     
      const response = await fetch(`http://localhost:3000/api/entretien/${entretienId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
         
          kilometrageEntretien: Number(kilometrage)
        })
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }
      alert('Kilométrage mis à jour !');
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue');
    }
  };

  return (
    <div>
      <h2>Mettre à jour le kilométrage</h2>
      {entretienId ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nouveau kilométrage :</label>
            <input
              type="number"
              value={kilometrage}
              onChange={(e) => setKilometrage(e.target.value)}
            />
          </div>
          <button type="submit">Valider</button>
        </form>
      ) : (
        <p>Identifiant d'entretien invalide ou manquant.</p>
      )}
    </div>
  );
}

export default MiseAJourKilometrage;
