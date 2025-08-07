import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

type Cocktail = {
  id: string;
  name: string;
  description: string;
  music_style: string | null;
  ingredients: string[];
};

export default function GlassDesc() {
  const { cocktailId } = useParams<{ cocktailId: string }>();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5001/api/cocktails/${cocktailId}`)
      .then(res => {
        setCocktail(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Cocktail introuvable' + err);
        setLoading(false);
      });
  }, [cocktailId]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!cocktail) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-4">{cocktail.name}</h1>
      <p className="text-gray-700 italic mb-4">{cocktail.description}</p>

      {cocktail.music_style && (
        <p className="mb-2">
          <span className="font-semibold">Style musical :</span> {cocktail.music_style}
        </p>
      )}

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Ingrédients :</h2>
        <ul className="list-disc list-inside">
          {cocktail.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>

      <Link
        to="/glass"
        className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Retour à la liste
      </Link>
    </div>
  );
}
