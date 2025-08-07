import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Cocktail = {
  id: string;
  name: string;
  description: string;
};

const Glass: React.FC = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  const fetchCocktails = (pageNumber: number) => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:5001/api/cocktails?page=${pageNumber}&per_page=10`)
      .then((res) => {
        if (res.data && Array.isArray(res.data.cocktails)) {
          setCocktails(res.data.cocktails);
          setPagesCount(res.data.pages || 1);
          setPage(res.data.page || pageNumber);
        } else {
          setError('Réponse inattendue du serveur.');
          setCocktails([]);
        }
      })
      .catch(() => {
        setError('Impossible de récupérer les cocktails.');
        setCocktails([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCocktails(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < pagesCount) setPage(page + 1);
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* Background gradient top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl py-10 sm:py-16 lg:py-20 text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Liste des cocktails
        </h1>
        <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl/8">
          Découvre nos cocktails classiques et originaux.
        </p>

        <div className="mt-10 text-left">
          {loading && (
            <p className="text-center text-gray-600 text-lg font-medium">Chargement...</p>
          )}
          {error && (
            <p className="text-center text-red-600 font-medium mt-4">{error}</p>
          )}
          {!loading && !error && cocktails.length === 0 && (
            <p className="text-center text-gray-600 text-lg font-medium">Aucun cocktail trouvé.</p>
          )}

          <ul className="space-y-6">
            {cocktails.map((cocktail) => (
              <li
                key={cocktail.id}
                className="rounded-lg bg-gray-100 p-6 shadow-inner hover:shadow-md transition-shadow"
              >
                <Link
                  to={`/glass/${cocktail.id}`}
                  className="text-2xl font-semibold text-green-700 hover:text-orange-500"
                >
                  {cocktail.name}
                </Link>
                <p className="mt-2 text-gray-700 italic">{cocktail.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={page <= 1 || loading}
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={handleNext}
            disabled={page >= pagesCount || loading}
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Background gradient bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
        />
      </div>
    </div>
  );
};

export default Glass;
