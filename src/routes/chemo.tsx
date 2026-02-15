import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chemo')({
  component: ChemoPage,
})

function ChemoPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Chemotherapy Day Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track your chemotherapy cycle day.
        </p>
        {/* DateCalculator component will be integrated here */}
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          <p>Chemotherapy Calculator Component</p>
        </div>
      </div>
    </div>
  )
}
