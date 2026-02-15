import { useId, useState, useRef, useEffect } from 'react'
import { parseISO, isValid, format, addDays } from 'date-fns'

interface DateCalculatorProps {
  title: string
  description: string
  startDateLabel: string
  targetDateLabel: string
  resultLabel: string
  calculateDay: (startDate: Date, targetDate: Date) => number | null
}

const DATE_INPUT_CLASS = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition-all focus:ring-offset-2'
const QUICK_SET_BUTTON_CLASS = 'flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'

function formatDateForInput(date: Date): string {
  if (!(date instanceof Date)) {
    throw new TypeError('formatDateForInput expects a Date object')
  }
  if (!isValid(date)) {
    throw new Error('formatDateForInput expects a valid Date')
  }
  return format(date, 'yyyy-MM-dd')
}

function parseDate(dateString: string): Date | null {
  if (!dateString) return null
  try {
    const date = parseISO(dateString)
    return isValid(date) ? date : null
  } catch (error) {
    if (error instanceof RangeError || error instanceof TypeError) {
      // Expected parsing errors from invalid input
      return null
    }
    // Log unexpected errors for debugging
    console.error('Unexpected error parsing date:', {
      input: dateString,
      error: error instanceof Error ? error.message : String(error),
    })
    return null
  }
}

export default function DateCalculator({
  title,
  description,
  startDateLabel,
  targetDateLabel,
  resultLabel,
  calculateDay,
}: DateCalculatorProps) {
  const id = useId()
  const [startDateInput, setStartDateInput] = useState('')
  const [targetDateInput, setTargetDateInput] = useState(() => formatDateForInput(new Date()))
  const [buttonError, setButtonError] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const startDate = parseDate(startDateInput)
  const targetDate = parseDate(targetDateInput)

  let resultError: string | null = null

  if (startDateInput && !startDate) {
    resultError = 'Start date is invalid. Please use the date picker or enter a valid date in YYYY-MM-DD format.'
  } else if (targetDateInput && !targetDate) {
    resultError = 'Target date is invalid. Please use the date picker or enter a valid date in YYYY-MM-DD format.'
  }

  let result: number | null = null
  if (!resultError && startDate && targetDate) {
    result = calculateDay(startDate, targetDate)
    if (result === null) {
      resultError = 'Unable to calculate days. Both dates must be valid. Please verify your entries.'
    }
  }

  // Announce result changes to screen readers
  useEffect(() => {
    if (result !== null && !resultError && resultRef.current) {
      resultRef.current.focus()
    }
  }, [result, resultError])

  const handleSetToday = () => {
    try {
      const today = new Date()
      setTargetDateInput(formatDateForInput(today))
      setButtonError(null)
    } catch (error) {
      const message = 'Failed to set date to today. Please use the date picker instead.'
      console.error('Failed to set date to today:', error)
      setButtonError(message)
    }
  }

  const handleSetTomorrow = () => {
    try {
      const tomorrow = addDays(new Date(), 1)
      setTargetDateInput(formatDateForInput(tomorrow))
      setButtonError(null)
    } catch (error) {
      const message = 'Failed to set date to tomorrow. Please use the date picker instead.'
      console.error('Failed to set date to tomorrow:', error)
      setButtonError(message)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{description}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor={`${id}-start-date`} className="block text-sm font-medium text-gray-700 mb-2">
            {startDateLabel}
          </label>
          <input
            id={`${id}-start-date`}
            type="date"
            value={startDateInput}
            onChange={(e) => setStartDateInput(e.target.value)}
            className={DATE_INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor={`${id}-target-date`} className="block text-sm font-medium text-gray-700 mb-2">
            {targetDateLabel}
          </label>
          <div className="space-y-2">
            <input
              id={`${id}-target-date`}
              type="date"
              value={targetDateInput}
              onChange={(e) => setTargetDateInput(e.target.value)}
              className={DATE_INPUT_CLASS}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSetToday}
                className={QUICK_SET_BUTTON_CLASS}
                aria-label="Set target date to today"
              >
                Today
              </button>
              <button
                onClick={handleSetTomorrow}
                className={QUICK_SET_BUTTON_CLASS}
                aria-label="Set target date to tomorrow"
              >
                Tomorrow
              </button>
            </div>
            {buttonError && (
              <p className="text-red-600 text-sm font-medium" role="alert">{buttonError}</p>
            )}
          </div>
        </div>
      </div>

      {resultError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
          <p className="text-red-800 font-medium">{resultError}</p>
        </div>
      )}

      {result !== null && !resultError && (
        <div
          ref={resultRef}
          tabIndex={-1}
          className="p-8 bg-gray-50 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          role="region"
          aria-live="polite"
          aria-label={`${resultLabel}: ${result} ${result === 1 ? 'day' : 'days'}`}
        >
          <p className="text-sm font-medium text-gray-600 mb-3">{resultLabel}</p>
          <p className="text-6xl md:text-7xl font-bold text-gray-900">
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
