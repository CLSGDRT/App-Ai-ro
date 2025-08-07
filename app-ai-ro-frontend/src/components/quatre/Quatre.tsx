import { Link } from 'react-router-dom'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Quatre() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-400 flex flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8 text-center">
      <ExclamationTriangleIcon className="h-16 w-16 text-orange-600 mb-4" aria-hidden="true" />
      <p className="text-base font-semibold text-orange-800">Erreur 404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page introuvable
      </h1>
      <p className="mt-4 text-base text-gray-700">
        Désolé, nous n’avons pas trouvé la page que vous cherchez.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  )
}
