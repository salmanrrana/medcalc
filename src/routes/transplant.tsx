import { createFileRoute } from '@tanstack/react-router'
import DateCalculator from '../components/DateCalculator'
import { transplantDaysSince } from '../utils/dateCalculations'

export const Route = createFileRoute('/transplant')({
  component: TransplantPage,
})

function TransplantPage() {
  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <DateCalculator
          title="Transplant Day Calculator"
          description="Calculate the number of days since your transplant procedure."
          startDateLabel="Transplant Date"
          targetDateLabel="Target Date (defaults to today)"
          resultLabel="Days Since Transplant"
          calculateDay={transplantDaysSince}
        />
      </div>
    </div>
  )
}
