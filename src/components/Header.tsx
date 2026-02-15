import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Home, Menu, X, Calendar, Pill, Link as LinkIcon, LucideIcon } from 'lucide-react'

const NAV_LINK_CLASS = 'flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2'
const NAV_LINK_ACTIVE_CLASS = 'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2'

interface NavItem {
  to: string
  icon: LucideIcon
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/transplant', icon: Calendar, label: 'Transplant' },
  { to: '/chemo', icon: Pill, label: 'Chemotherapy' },
  { to: '/links', icon: LinkIcon, label: 'Resources' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/" className="text-white">
            MedCalc
          </Link>
        </h1>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={closeMenu}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={NAV_LINK_CLASS}
              activeProps={{ className: NAV_LINK_ACTIVE_CLASS }}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
