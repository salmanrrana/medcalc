import { createFileRoute } from '@tanstack/react-router'
import DateCalculator from '../components/DateCalculator'
import { chemoDaysSince } from '../utils/dateCalculations'

export const Route = createFileRoute('/chemo')({
  component: ChemoPage,
})

function ChemoPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <DateCalculator
          title="Chemotherapy Day Calculator"
          description="Calculate the current day of your chemotherapy treatment cycle."
          startDateLabel="First Chemo Date"
          targetDateLabel="Target Date (defaults to today)"
          resultLabel="Current Chemo Day"
          calculateDay={chemoDaysSince}
        />
      </div>
    </div>
  )
}
