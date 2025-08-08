import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

type CocktailResponse = {
  cocktail_name?: string;
  description?: string;
  ingredients?: string[];
  is_cocktail: boolean;
  message: string;
  music_style?: string;
  reply: string;
};

const Mixer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [cocktailResult, setCocktailResult] = useState<CocktailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Nouveaux états pour le timer et l'affichage image
  const [showImage, setShowImage] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const timerRef = useRef<number | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setShowImage(false);
    setCountdown(120);

    try {
      const response = await axios.post<CocktailResponse>(
        'http://127.0.0.1:5001/api/cocktails/',
        { message: inputText }
      );
      console.log("Données reçues :", response.data);
      setCocktailResult(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          'Erreur lors de la requête : ' +
          (err.response?.data?.message || err.message)
        );
      } else {
        setError('Une erreur inconnue est survenue.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fonction qui lance le timer
  const startCountdown = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setShowImage(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Nettoyage du timer au démontage du composant
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-2xl py-10 sm:py-16 lg:py-20 text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Crée ton cocktail avec l’IA
        </h1>
        <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl/8">
          Décris ton mood, un ingrédient ou une ambiance, et laisse l’IA te surprendre !
        </p>

        <div className="mt-10">
          <textarea
            className="w-full rounded-md border border-gray-300 p-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:text-lg"
            rows={4}
            placeholder="Parle de ton humeur, ton ingrédient favori, ta playlist..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !inputText.trim()}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:opacity-50"
          >
            {loading ? 'Création en cours...' : 'Créer mon cocktail'}
          </button>
        </div>

        {error && (
          <p className="mt-6 text-red-600 font-medium">{error}</p>
        )}

        {cocktailResult && (
          <div className="mt-8 rounded-lg bg-gray-100 p-6 text-left text-gray-800 shadow-inner">
            {cocktailResult.is_cocktail ? (
              <>
                <h2 className="text-2xl font-bold mb-2">🍸 {cocktailResult.cocktail_name}</h2>
                <p className="italic text-gray-600 mb-4">{cocktailResult.description}</p>
                <p className="mb-2">
                  <strong>Ingrédients :</strong>
                </p>
                <ul className="list-disc list-inside mb-4">
                  {cocktailResult.ingredients?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className="mb-2">
                  <strong>Ambiance musicale suggérée :</strong> 🎶 {cocktailResult.music_style}
                </p>
                <p className="mt-4 text-green-700 font-medium">{cocktailResult.reply}</p>

                {!showImage && (
                  <button
                    onClick={startCountdown}
                    className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Afficher l'image dans {countdown} secondes
                  </button>
                )}

                {showImage && (
                  <div className="mt-6">
                    <img
                      src="http://127.0.0.1:5001/api/cocktail-image"
                      alt="Cocktail généré"
                      className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-lg text-gray-700 font-medium">{cocktailResult.reply}</p>
            )}
          </div>
        )}
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
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
        />
      </div>
    </div>
  );
};

export default Mixer;
