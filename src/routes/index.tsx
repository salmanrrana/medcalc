import { createFileRoute, Link } from '@tanstack/react-router'
import { Calendar, Pill, Link as LinkIcon } from 'lucide-react'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            MedCalc
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Medical date calculators for tracking transplant and chemotherapy progress
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Quickly calculate the number of days since your transplant or chemotherapy procedure
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/transplant"
            className="block p-8 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <Calendar className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Transplant Day Calculator
                </h2>
                <p className="text-gray-600">
                  Calculate the number of days since your transplant procedure
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/chemo"
            className="block p-8 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4">
              <Pill className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Chemotherapy Day Calculator
                </h2>
                <p className="text-gray-600">
                  Track which day of your chemotherapy cycle you're on
                </p>
              </div>
            </div>
          </Link>
        </div>

        <Link
          to="/links"
          className="block p-8 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <div className="flex items-start gap-4">
            <LinkIcon className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div className="text-left">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Helpful Resources
              </h2>
              <p className="text-gray-600">
                Links to helpful medical resources and references
              </p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  )
}
