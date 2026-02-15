import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transplant')({
  component: TransplantPage,
})

function TransplantPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Transplant Day Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Calculate the number of days since your transplant procedure.
        </p>
        {/* DateCalculator component will be integrated here */}
        <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
          <p>Transplant Calculator Component</p>
        </div>
      </div>
    </div>
  )
}
