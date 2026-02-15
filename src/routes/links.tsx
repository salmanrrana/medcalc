import { createFileRoute } from '@tanstack/react-router'
import LinksSection from '../components/LinksSection'

export const Route = createFileRoute('/links')({
  component: LinksPage,
})

function LinksPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Helpful Resources
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          A collection of useful links and resources for transplant, chemotherapy, and medical information.
        </p>
        <LinksSection />
      </div>
    </div>
  )
}
