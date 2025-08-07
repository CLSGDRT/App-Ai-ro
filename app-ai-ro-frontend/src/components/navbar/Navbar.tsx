'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Outlet, Link } from 'react-router-dom'

const navigation = [
  { name: 'Le mixeur', to: '/mixer' },
  { name: 'Les cocktails', to: '/glass' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <><header className="absolute inset-x-0 top-0 z-50">
          <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">app-AI-ro</span>
                    <Link to="/">
                        <img
                        alt=""
                        src="/assets/logo-appairo.png"
                        className="max-h-12 sm:max-h-16 md:max-h-20 w-auto border border-green-500 rounded-tl-xl rounded-br-xl"
                        />
                    </Link>
                </a>
              </div>
              <div className="flex lg:hidden">
                  <button
                      type="button"
                      onClick={() => setMobileMenuOpen(true)}
                      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  >
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon aria-hidden="true" className="size-6" />
                  </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.to} className="text-sm/6 font-semibold text-gray-900 hover:text-green-600">
                            {item.name}
                        </Link>
                    ))}
              </div>
          </nav>

          {/* Mobile menu dialog */}
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
              <div className="fixed inset-0 z-50" />
              <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="flex items-center justify-between">
                      <a href="#" className="-m-1.5 p-1.5">
                          <span className="sr-only">app-AI-ro</span>
                          <img
                              alt=""
                              src="/src/assets/logo-appairo.png"
                              className="h-8 w-auto" />
                      </a>
                      <button
                          type="button"
                          onClick={() => setMobileMenuOpen(false)}
                          className="-m-2.5 rounded-md p-2.5 text-gray-700"
                      >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                  </div>
                  <div className="mt-6 flow-root">
                      <div className="-my-6 divide-y divide-gray-500/10">
                          <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                <Link key={item.name} to={item.to} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                    {item.name}
                                </Link>
                              ))}
                          </div>
                      </div>
                  </div>
              </DialogPanel>
          </Dialog>
      </header>
    <Outlet />

    <footer className="mt-16 border-t border-gray-200 py-6 text-center text-xs text-gray-500">
    <p>app-AI-ro peut commettre des erreurs. Il est recommandé de vérifier les informations importantes.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[0.7rem]">
            <span>© {new Date().getFullYear()} app-AI-ro</span>
            <span>·</span>
            <a href="#" className="hover:underline">Mentions légales</a>
            <span>·</span>
            <a href="#" className="hover:underline">Conditions d’utilisation</a>
            <span>·</span>
            <a href="#" className="hover:underline">Politique de confidentialité</a>
            <span>·</span>
            <a href="#" className="hover:underline">Contact</a>
        </div>
    </footer>
    </>
  )
}