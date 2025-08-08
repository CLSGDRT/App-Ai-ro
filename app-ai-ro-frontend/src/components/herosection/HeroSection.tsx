import { Link } from 'react-router-dom';

export default function HeroSection() {
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
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-28">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Une solution en cours de développement pour vos sandwiches !{' '}
            <Link to="/sandwich" className="font-semibold text-green-600">
              <span aria-hidden="true" className="absolute inset-0" />
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            L'inspiration cocktail, signée par l'IA.
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Laisse l'IA mixer ton prochain cocktail selon ton mood, ta playlist ou ton ingrédient fétiche.
            Une expérience créative, surprenante et savoureuse à chaque génération.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
                to="/mixer"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                C'est parti !
            </Link>
          </div>
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
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
        />
      </div>
    </div>
  )
}