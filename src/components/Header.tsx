import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Home, Menu, X, Calendar, Pill, Link as LinkIcon } from 'lucide-react'

const FOCUS_RING = 'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
const NAV_LINK_CLASS = `flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors mb-2 ${FOCUS_RING}`
const NAV_LINK_ACTIVE_CLASS = `flex items-center gap-3 p-3 rounded-lg bg-gray-200 text-gray-900 font-medium transition-colors mb-2 ${FOCUS_RING}`
const DESKTOP_NAV_LINK_CLASS = `flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${FOCUS_RING}`
const DESKTOP_NAV_LINK_ACTIVE_CLASS = `flex items-center gap-2 px-4 py-2 text-gray-900 bg-gray-100 font-medium rounded-lg transition-colors ${FOCUS_RING}`

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
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="flex items-center px-4 py-4 md:py-5">
          <button
            onClick={() => setIsOpen(true)}
            className={`p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors md:hidden ${FOCUS_RING}`}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-3 md:ml-0 text-2xl font-bold text-gray-900">
            <Link to="/" className={`text-gray-900 hover:text-gray-700 transition-colors rounded-lg px-2 py-1 ${FOCUS_RING}`}>
              MedCalc
            </Link>
          </h1>

          {/* Desktop navigation */}
          <nav className="hidden md:flex ml-8 gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={DESKTOP_NAV_LINK_CLASS}
                activeProps={{ className: DESKTOP_NAV_LINK_ACTIVE_CLASS }}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
          <button
            onClick={closeMenu}
            className={`p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${FOCUS_RING}`}
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto" aria-label="Mobile navigation">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={NAV_LINK_CLASS}
              activeProps={{ className: NAV_LINK_ACTIVE_CLASS }}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeMenu}
          role="presentation"
          aria-hidden="true"
        />
      )}
    </>
  )
}
