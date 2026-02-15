import { differenceInDays, isValid } from 'date-fns'

/**
 * Calculate the number of days since a transplant date.
 * Day 0 = transplant day, Day 1 = next day, etc.
 *
 * @param transplantDate - The date of the transplant procedure
 * @param targetDate - The target date to calculate from (defaults to today)
 * @returns The number of days since transplant, or null if dates are invalid
 */
export function transplantDaysSince(
  transplantDate: Date,
  targetDate: Date = new Date()
): number | null {
  // Validate both dates
  if (!isValid(transplantDate) || !isValid(targetDate)) {
    return null
  }

  // Calculate the difference in days
  const days = differenceInDays(targetDate, transplantDate)

  return days
}

/**
 * Calculate the current chemotherapy day.
 * Day 1 = first chemo, Day 2 = second chemo, etc.
 *
 * @param firstChemoDate - The date of the first chemotherapy treatment
 * @param targetDate - The target date to calculate from (defaults to today)
 * @returns The current chemo day number, or null if dates are invalid
 */
export function chemoDaysSince(
  firstChemoDate: Date,
  targetDate: Date = new Date()
): number | null {
  // Validate both dates
  if (!isValid(firstChemoDate) || !isValid(targetDate)) {
    return null
  }

  // Calculate the difference in days
  const days = differenceInDays(targetDate, firstChemoDate)

  // Add 1 so first chemo day = day 1
  return days + 1
}
