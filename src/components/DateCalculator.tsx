'use client'

import { useState } from 'react'

interface DateCalculatorProps {
  title: string
  description: string
  startDateLabel: string
  targetDateLabel: string
  resultLabel: string
  calculateDay: (startDate: Date, targetDate: Date) => number | null
}

function formatDateForInput(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDate(dateString: string): Date | null {
  if (!dateString) return null
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

export default function DateCalculator({
  title,
  description,
  startDateLabel,
  targetDateLabel,
  resultLabel,
  calculateDay,
}: DateCalculatorProps) {
  const today = new Date()
  const [startDateInput, setStartDateInput] = useState('')
  const [targetDateInput, setTargetDateInput] = useState(formatDateForInput(today))
  const [error, setError] = useState<string | null>(null)

  const startDate = parseDate(startDateInput)
  const targetDate = parseDate(targetDateInput)
  let result: number | null = null
  let resultError: string | null = null

  if (startDate && targetDate) {
    result = calculateDay(startDate, targetDate)
    if (result === null) {
      resultError = 'Invalid dates provided. Please check your input.'
    }
  }

  const handleSetToday = () => {
    setTargetDateInput(formatDateForInput(today))
  }

  const handleSetTomorrow = () => {
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    setTargetDateInput(formatDateForInput(tomorrow))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-lg text-gray-600">{description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
            {startDateLabel}
          </label>
          <input
            id="start-date"
            type="date"
            value={startDateInput}
            onChange={(e) => {
              setStartDateInput(e.target.value)
              setError(null)
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
            aria-label={startDateLabel}
          />
        </div>

        <div>
          <label htmlFor="target-date" className="block text-sm font-medium text-gray-700 mb-2">
            {targetDateLabel}
          </label>
          <div className="space-y-2">
            <input
              id="target-date"
              type="date"
              value={targetDateInput}
              onChange={(e) => {
                setTargetDateInput(e.target.value)
                setError(null)
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
              aria-label={targetDateLabel}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSetToday}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors"
                aria-label="Set target date to today"
              >
                Today
              </button>
              <button
                onClick={handleSetTomorrow}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors"
                aria-label="Set target date to tomorrow"
              >
                Tomorrow
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {resultError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
          <p className="text-red-800 font-medium">{resultError}</p>
        </div>
      )}

      {result !== null && !resultError && (
        <div className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-lg">
          <p className="text-sm font-medium text-gray-600 mb-2">{resultLabel}</p>
          <p className="text-6xl font-bold text-cyan-600">
            {result}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {result === 1 ? 'Day' : 'Days'}
          </p>
        </div>
      )}

      {!startDate && (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">Enter a date to see the result</p>
        </div>
      )}
    </div>
  )
}
